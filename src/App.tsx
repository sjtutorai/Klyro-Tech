import React, { useState } from 'react';
import { UserSession, School, UserRole } from './types';
import { SaasLandingPage } from './components/SaasLandingPage';
import { AuthScreen } from './components/AuthScreen';
import { Header } from './components/Header';
import { SchoolRegistrationModal } from './components/SchoolRegistrationModal';
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { PrincipalDashboard } from './components/dashboards/PrincipalDashboard';
import { TeacherDashboard } from './components/dashboards/TeacherDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';

export default function App() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [viewMode, setViewMode] = useState<'landing' | 'auth'>('landing');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Registration result modal credentials helper
  const [newSchoolCredentials, setNewSchoolCredentials] = useState<{
    school: School;
    udiseCode: string;
  } | null>(null);

  const handleSchoolRegistered = (school: School, udiseCode: string) => {
    setNewSchoolCredentials({ school, udiseCode });
  };

  const handleRoleSelectDemo = (role: UserRole) => {
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

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white">
      {!session ? (
        viewMode === 'landing' ? (
          <SaasLandingPage
            onOpenLogin={() => setViewMode('auth')}
            onOpenRegisterModal={() => setShowRegisterModal(true)}
            onSelectRoleDemo={handleRoleSelectDemo}
          />
        ) : (
          <AuthScreen
            onLoginSuccess={(newSession) => setSession(newSession)}
            onOpenRegisterModal={() => setShowRegisterModal(true)}
            onGoToLanding={() => setViewMode('landing')}
            initialRegNumber={newSchoolCredentials?.school.registerNumber}
            initialPassword={newSchoolCredentials?.udiseCode}
          />
        )
      ) : (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
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
            {session.role === 'super_admin' && <SuperAdminDashboard session={session} />}
            {session.role === 'principal' && <PrincipalDashboard session={session} />}
            {session.role === 'teacher' && <TeacherDashboard session={session} />}
            {session.role === 'student' && <StudentDashboard session={session} />}
          </main>
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
          <div className="w-full max-w-md rounded-2xl bg-white border border-emerald-200 p-6 space-y-4 text-slate-900 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-lg">
              🎉 School Registration Successful!
            </div>
            <p className="text-xs text-slate-600">
              Please note down your official Klyro Tech School Credentials for Principal Login:
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
              <div>
                <span className="text-slate-500">School Name:</span>{' '}
                <span className="text-slate-900 font-bold">{newSchoolCredentials.school.name}</span>
              </div>
              <div>
                <span className="text-slate-500">Register Number:</span>{' '}
                <span className="text-indigo-600 font-bold">{newSchoolCredentials.school.registerNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">UDISE Code (Password):</span>{' '}
                <span className="text-amber-600 font-bold">{newSchoolCredentials.udiseCode}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setNewSchoolCredentials(null);
                setViewMode('auth');
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
            >
              Continue to Principal Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

