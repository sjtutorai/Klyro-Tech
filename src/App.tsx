import React, { useState, useEffect } from 'react';
import { UserSession, School, UserRole } from './types';
import { Language } from './data/navigationData';
import { SaasLandingPage } from './components/SaasLandingPage';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { ModuleViewRenderer } from './components/views/ModuleViewRenderer';
import { SchoolRegistrationModal } from './components/SchoolRegistrationModal';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [viewMode, setViewMode] = useState<'landing' | 'auth'>('landing');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Active navigation state
  const [activeItem, setActiveItem] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState<string | undefined>(undefined);

  // Theme & Language state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [language, setLanguage] = useState<Language>('en');

  // Sidebar collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('klyro_sidebar_collapsed');
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('klyro_sidebar_collapsed', JSON.stringify(isSidebarCollapsed));
    } catch (e) {
      console.error(e);
    }
  }, [isSidebarCollapsed]);

  // Handle Theme application
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  // Registration result modal credentials helper
  const [newSchoolCredentials, setNewSchoolCredentials] = useState<{
    school: School;
    udiseCode: string;
  } | null>(null);

  const handleSchoolRegistered = (school: School, udiseCode: string) => {
    setNewSchoolCredentials({ school, udiseCode });
  };

  const handleRoleSelectDemo = (role: UserRole) => {
    setActiveItem('dashboard');
    setActiveSubItem(undefined);

    if (role === 'super_admin') {
      setSession({
        id: 'super_admin_01',
        role: 'super_admin',
        schoolId: 'ALL',
        schoolName: 'Klyro Tech Global Network',
        schoolRegisterNumber: 'NXS-GLOBAL',
        name: 'VASCORE Super Admin',
        email: 'sadanandj2011@gmail.com',
      });
    } else if (role === 'principal') {
      setSession({
        id: 'prn_sch_greenwood_001',
        role: 'principal',
        schoolId: 'sch_greenwood_001',
        schoolName: 'Greenwood International School',
        schoolRegisterNumber: 'NXS-2026-0001',
        name: 'Dr. Ramesh Sharma',
        email: 'principal@greenwood.edu.in',
      });
    } else if (role === 'teacher') {
      setSession({
        id: 'tch_01',
        role: 'teacher',
        schoolId: 'sch_greenwood_001',
        schoolName: 'Greenwood International School',
        schoolRegisterNumber: 'NXS-2026-0001',
        name: 'Mrs. Priya Sharma',
        email: 'priya.english@greenwood.edu.in',
        subject: 'English Literature',
        classesAssigned: ['6', '7', '8'],
        sectionsAssigned: ['A', 'B'],
      });
    } else if (role === 'student') {
      setSession({
        id: 'stu_01',
        role: 'student',
        schoolId: 'sch_greenwood_001',
        schoolName: 'Greenwood International School',
        schoolRegisterNumber: 'NXS-2026-0001',
        name: 'Aarav Patel',
        studentId: 'STU-1021',
        class: '8',
        section: 'A',
        rollNo: '12',
      });
    }
  };

  const handleSelectItem = (itemId: string, subItemId?: string) => {
    setActiveItem(itemId);
    setActiveSubItem(subItemId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      {!session ? (
        viewMode === 'landing' ? (
          <SaasLandingPage
            onOpenLogin={() => setViewMode('auth')}
            onOpenRegisterModal={() => setShowRegisterModal(true)}
            onSelectRoleDemo={handleRoleSelectDemo}
          />
        ) : (
          <AuthScreen
            onLoginSuccess={(newSession) => {
              setSession(newSession);
              setActiveItem('dashboard');
              setActiveSubItem(undefined);
            }}
            onOpenRegisterModal={() => setShowRegisterModal(true)}
            onGoToLanding={() => setViewMode('landing')}
            initialRegNumber={newSchoolCredentials?.school.registerNumber}
            initialPassword={newSchoolCredentials?.udiseCode}
          />
        )
      ) : (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
          {/* Role-Based Responsive Modern Sidebar */}
          <Sidebar
            session={session}
            activeItem={activeItem}
            activeSubItem={activeSubItem}
            onSelectItem={handleSelectItem}
            onLogout={() => {
              setSession(null);
              setViewMode('landing');
            }}
            onOpenSettings={() => {
              setActiveItem('settings');
              setActiveSubItem(undefined);
            }}
            onOpenProfile={() => {
              setActiveItem('my_profile');
              setActiveSubItem(undefined);
            }}
            theme={theme}
            onToggleTheme={(t) => setTheme(t)}
            language={language}
            onChangeLanguage={(l) => setLanguage(l)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          />

          {/* Main App Workspace */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
              isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
            }`}
          >
            <Header
              session={session}
              onLogout={() => {
                setSession(null);
                setViewMode('landing');
              }}
              onGoToLanding={() => setViewMode('landing')}
              onOpenRegisterModal={() => setShowRegisterModal(true)}
              onSelectRole={handleRoleSelectDemo}
            />

            <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
              <ModuleViewRenderer
                session={session}
                activeItem={activeItem}
                activeSubItem={activeSubItem}
              />
            </main>
          </div>
        </div>
      )}

      {/* School Registration Modal */}
      {showRegisterModal && (
        <SchoolRegistrationModal
          onClose={() => setShowRegisterModal(false)}
          onSuccess={handleSchoolRegistered}
        />
      )}

      {/* Success Credentials Popup after School Registration */}
      {newSchoolCredentials && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 p-6 space-y-4 text-slate-900 dark:text-slate-100 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-lg">
              🎉 School Registration Successful!
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Please note down your official Klyro Tech School Credentials for Principal Login:
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs font-mono">
              <div>
                <span className="text-slate-500">School Name:</span>{' '}
                <span className="text-slate-900 dark:text-slate-100 font-bold">{newSchoolCredentials.school.name}</span>
              </div>
              <div>
                <span className="text-slate-500">Register Number:</span>{' '}
                <span className="text-indigo-600 dark:text-indigo-400 font-bold">{newSchoolCredentials.school.registerNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">UDISE Code (Password):</span>{' '}
                <span className="text-amber-600 dark:text-amber-400 font-bold">{newSchoolCredentials.udiseCode}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setNewSchoolCredentials(null);
                setViewMode('auth');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
            >
              Continue to Principal Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


