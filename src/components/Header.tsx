import React, { useState, useEffect } from 'react';
import {
  School,
  LogOut,
  Bell,
  ShieldCheck,
  User,
  GraduationCap,
  BookOpen,
  Sparkles,
  ChevronDown,
  RefreshCw,
  Sun,
  Moon,
  Home,
} from 'lucide-react';
import { UserSession, UserRole } from '../types';
import { dataService } from '../services/dataService';
import { NexusLogo } from './NexusLogo';

interface HeaderProps {
  session: UserSession;
  onLogout: () => void;
  onGoToLanding: () => void;
  onSelectRole: (role: UserRole) => void;
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  onLogout,
  onGoToLanding,
  onSelectRole,
  onOpenRegisterModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const notifications = dataService.getNotifications(session.schoolId, session.role);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', bg: 'bg-amber-50 text-amber-700 border-amber-200/80', icon: ShieldCheck };
      case 'principal':
        return { label: 'Principal', bg: 'bg-purple-50 text-purple-700 border-purple-200/80', icon: School };
      case 'teacher':
        return { label: 'Teacher', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80', icon: BookOpen };
      case 'student':
        return { label: 'Student', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80', icon: GraduationCap };
    }
  };

  const roleInfo = getRoleBadge(session.role);
  const RoleIcon = roleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button onClick={onGoToLanding} className="flex items-center gap-2 hover:opacity-90 transition cursor-pointer text-left">
            <NexusLogo size={34} />
          </button>
        </div>

        {/* Center: School Badge */}
        {session.role !== 'super_admin' && (
          <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
            <School className="w-4 h-4 text-indigo-600" />
            <div className="truncate max-w-xs">
              <span className="font-semibold text-slate-900">{session.schoolName}</span>
              <span className="ml-2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600 font-mono text-[10px]">
                {session.schoolRegisterNumber}
              </span>
            </div>
          </div>
        )}

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Landing Page Link */}
          <button
            onClick={onGoToLanding}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            title="Return to Klyro Tech SaaS Landing Page"
          >
            <Home className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>

          {/* Quick Demo Role Selector for Judges */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs transition cursor-pointer"
              title="Quick Switch Role"
            >
              <RoleIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">{roleInfo.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-2.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Switch Demo Portal
                </div>
                {(['super_admin', 'principal', 'teacher', 'student'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onSelectRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                      session.role === r
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="capitalize">{r.replace('_', ' ')}</span>
                    {session.role === r && <Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* School Registration Trigger */}
          <button
            onClick={onOpenRegisterModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs shadow-indigo-100 transition active:scale-95 cursor-pointer"
          >
            <School className="w-3.5 h-3.5" />
            Register School
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs transition cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-2xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-900">System Notifications</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {notifications.length} Total
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-xs text-slate-400">No new notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs transition ${
                          n.type === 'alert'
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : n.type === 'warning'
                            ? 'bg-amber-50 border-amber-200 text-amber-800'
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="font-semibold">{n.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">{n.message}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900 leading-tight">{session.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">
                {session.studentId || session.employeeId || session.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

