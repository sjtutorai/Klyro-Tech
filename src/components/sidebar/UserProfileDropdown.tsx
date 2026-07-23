import React from 'react';
import {
  User,
  Settings,
  HelpCircle,
  MessageSquare,
  LogOut,
  Shield,
  School,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserSession } from '../../types';

interface UserProfileDropdownProps {
  session: UserSession;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onSelectAction: (action: 'profile' | 'settings' | 'help' | 'feedback') => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  session,
  isOpen,
  onClose,
  onLogout,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  const roleColorMap = {
    super_admin: 'bg-amber-500 text-slate-950',
    principal: 'bg-purple-600 text-white',
    teacher: 'bg-indigo-600 text-white',
    student: 'bg-emerald-600 text-white',
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute left-0 bottom-16 sm:bottom-16 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
        {/* Header Info */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-1.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
              {session.name}
            </span>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full capitalize ${
                roleColorMap[session.role]
              }`}
            >
              {session.role.replace('_', ' ')}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
            {session.email || session.studentId || session.schoolName}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
            <School className="w-3 h-3" />
            <span className="truncate">{session.schoolName}</span>
          </div>
        </div>

        {/* Menu Options */}
        <div className="space-y-0.5 text-xs font-semibold">
          <button
            onClick={() => {
              onSelectAction('profile');
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <User className="w-4 h-4 text-indigo-500" />
            <span>My Profile</span>
          </button>

          <button
            onClick={() => {
              onSelectAction('settings');
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </button>

          <button
            onClick={() => {
              onSelectAction('help');
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-emerald-500" />
            <span>Help & Support</span>
          </button>

          <button
            onClick={() => {
              onSelectAction('feedback');
              onClose();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>Feedback</span>
          </button>
        </div>

        <div className="my-1.5 border-t border-slate-100 dark:border-slate-800" />

        {/* Logout */}
        <button
          onClick={() => {
            onClose();
            onLogout();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition font-bold text-xs cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};
