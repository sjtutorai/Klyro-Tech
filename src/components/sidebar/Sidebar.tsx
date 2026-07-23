import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Globe,
  Sun,
  Moon,
  Laptop,
  Menu,
  X,
  School as SchoolIcon,
  Sparkles,
  LogOut,
  User,
  Shield,
  HelpCircle,
  MessageSquare,
  Settings
} from 'lucide-react';
import { UserSession } from '../../types';
import { ROLE_NAVIGATION, Language } from '../../data/navigationData';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SearchModal } from './SearchModal';
import { UserProfileDropdown } from './UserProfileDropdown';
import { NexusLogo } from '../NexusLogo';

interface SidebarProps {
  session: UserSession;
  activeItem: string;
  activeSubItem?: string;
  onSelectItem: (itemId: string, subItemId?: string) => void;
  onLogout: () => void;
  onOpenSettings?: () => void;
  onOpenProfile?: () => void;
  theme: 'light' | 'dark' | 'system';
  onToggleTheme: (theme: 'light' | 'dark' | 'system') => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  session,
  activeItem,
  activeSubItem,
  onSelectItem,
  onLogout,
  onOpenSettings,
  onOpenProfile,
  theme,
  onToggleTheme,
  language,
  onChangeLanguage,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse,
}) => {
  // Collapsed state persisted in localStorage
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('klyro_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed((prev) => !prev);
    }
  };

  // Mobile drawer state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Profile dropdown state
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Language selector menu state
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Save collapse state
  useEffect(() => {
    try {
      localStorage.setItem('klyro_sidebar_collapsed', JSON.stringify(isCollapsed));
    } catch (e) {
      console.error(e);
    }
  }, [isCollapsed]);

  // Global Ctrl + K search handler
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const navItems = ROLE_NAVIGATION[session.role] || [];

  const handleProfileDropdownAction = (action: 'profile' | 'settings' | 'help' | 'feedback') => {
    if (action === 'profile') {
      onSelectItem('my_profile');
      if (onOpenProfile) onOpenProfile();
    } else if (action === 'settings') {
      onSelectItem('settings');
      if (onOpenSettings) onOpenSettings();
    } else if (action === 'help') {
      onSelectItem('announcements');
    } else if (action === 'feedback') {
      onSelectItem('messages');
    }
  };

  const roleColorMap = {
    super_admin: 'bg-amber-500 text-slate-950 font-bold',
    principal: 'bg-purple-600 text-white font-bold',
    teacher: 'bg-indigo-600 text-white font-bold',
    student: 'bg-emerald-600 text-white font-bold',
  };

  return (
    <>
      {/* Mobile Bar Trigger Button (Visible on Small Screens) */}
      <div className="lg:hidden fixed top-3 left-3 z-30">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 shadow-md backdrop-blur-md text-slate-800 dark:text-slate-100 cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      {/* Main Responsive Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out flex flex-col bg-white/90 dark:bg-slate-900/90 border-r border-slate-200/80 dark:border-slate-800/80 shadow-xl backdrop-blur-xl ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          isMobileOpen
            ? 'translate-x-0 w-72'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header: Brand & Collapse Toggle */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <NexusLogo size={32} showText={false} className="flex-shrink-0" />
            {(!isCollapsed || isMobileOpen) && (
              <div className="min-w-0">
                <div className="font-black text-sm text-slate-900 dark:text-slate-100 tracking-tight truncate flex items-center gap-1.5">
                  <span>KLYRO TECH</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold">
                    v2.5
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  {session.schoolName}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={handleToggleCollapse}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Trigger Bar (Ctrl + K) */}
        <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex-shrink-0">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium transition border border-slate-200/60 dark:border-slate-700/60 cursor-pointer ${
              isCollapsed && !isMobileOpen ? 'justify-center' : ''
            }`}
            title="Search Menu (Ctrl + K)"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && (
                <span className="truncate">Search menus...</span>
              )}
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md">
                ⌘K
              </kbd>
            )}
          </button>
        </div>

        {/* Scrollable Navigation Menu List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {navItems.map((item) => (
            <SidebarMenuItem
              key={item.id}
              item={item}
              isCollapsed={isCollapsed && !isMobileOpen}
              language={language}
              activeItem={activeItem}
              activeSubItem={activeSubItem}
              onSelect={(itemId, subItemId) => {
                onSelectItem(itemId, subItemId);
                if (isMobileOpen) setIsMobileOpen(false);
              }}
            />
          ))}
        </div>

        {/* Sidebar Footer Controls: Theme, Language & User Profile */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 space-y-2 flex-shrink-0 relative">
          {/* Quick Utility Strip (Theme + Language Toggle) */}
          {(!isCollapsed || isMobileOpen) && (
            <div className="flex items-center justify-between gap-1.5">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
                  title="Switch Language"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="uppercase text-[11px] font-bold">{language}</span>
                </button>

                {showLangMenu && (
                  <div className="absolute left-0 bottom-10 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1 z-50 animate-in fade-in zoom-in-95">
                    <button
                      onClick={() => {
                        onChangeLanguage('en');
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        language === 'en'
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>English</span>
                      <span className="text-[10px] text-slate-400">EN</span>
                    </button>
                    <button
                      onClick={() => {
                        onChangeLanguage('kn');
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        language === 'kn'
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>ಕನ್ನಡ</span>
                      <span className="text-[10px] text-slate-400">KN</span>
                    </button>
                    <button
                      onClick={() => {
                        onChangeLanguage('hi');
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between cursor-pointer ${
                        language === 'hi'
                          ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>हिंदी</span>
                      <span className="text-[10px] text-slate-400">HI</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Selector Pill */}
              <div className="flex items-center p-0.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => onToggleTheme('light')}
                  className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="Light Mode"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onToggleTheme('dark')}
                  className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-indigo-600 text-white shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onToggleTheme('system')}
                  className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                    theme === 'system'
                      ? 'bg-slate-700 text-white shadow-xs font-bold'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title="System Theme"
                >
                  <Laptop className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* User Profile Card Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`w-full flex items-center gap-3 p-2 rounded-2xl bg-white dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition cursor-pointer ${
                isCollapsed && !isMobileOpen ? 'justify-center' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                {session.name ? session.name.charAt(0).toUpperCase() : 'U'}
              </div>

              {(!isCollapsed || isMobileOpen) && (
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {session.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1">
                    <span className={`px-1.5 py-0.2 rounded-md text-[9px] capitalize ${roleColorMap[session.role]}`}>
                      {session.role.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              )}
            </button>

            {/* Profile Dropdown Popup */}
            <UserProfileDropdown
              session={session}
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              onLogout={onLogout}
              onSelectAction={handleProfileDropdownAction}
            />
          </div>
        </div>
      </aside>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        role={session.role}
        language={language}
        onSelectItem={(itemId, subItemId) => {
          onSelectItem(itemId, subItemId);
          if (isMobileOpen) setIsMobileOpen(false);
        }}
      />
    </>
  );
};
