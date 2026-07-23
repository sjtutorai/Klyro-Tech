import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  School as SchoolIcon,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User,
  KeyRound,
  Building2,
  CheckCircle2,
  HelpCircle,
  Home,
} from 'lucide-react';
import { UserRole, UserSession } from '../types';
import { dataService } from '../services/dataService';
import { SUPER_ADMIN_EMAILS, DEMO_SCHOOL } from '../data/initialData';
import { NexusLogo } from './NexusLogo';

interface AuthScreenProps {
  onLoginSuccess: (session: UserSession) => void;
  onOpenRegisterModal: () => void;
  onGoToLanding?: () => void;
  initialRegNumber?: string;
  initialPassword?: string;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onOpenRegisterModal,
  onGoToLanding,
  initialRegNumber,
  initialPassword,
}) => {
  const [activePortal, setActivePortal] = useState<UserRole>('principal');

  // Form Fields - Start completely clean without autofilled credentials
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [studentId, setStudentId] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (activePortal === 'super_admin') {
      const inputEmail = email.trim().toLowerCase();
      if (!SUPER_ADMIN_EMAILS.includes(inputEmail)) {
        setErrorMessage('Unauthorized email address. Only authorized VASCORE Labs emails allowed.');
        return;
      }
      if (password !== 'nexus@2026' && password !== 'nexus@reset2026' && password !== 'klyro@2026') {
        setErrorMessage('Invalid password. Default password is klyro@2026 or nexus@2026');
        return;
      }

      onLoginSuccess({
        id: 'super_admin_01',
        role: 'super_admin',
        schoolId: 'ALL',
        schoolName: 'Klyro Tech Global Network',
        schoolRegisterNumber: 'NXS-GLOBAL',
        name: 'VASCORE Super Admin',
        email: inputEmail,
      });
      return;
    }

    // Principal, Teacher, Student lookups
    const school = dataService.getSchoolByRegisterNumber(registerNumber);
    if (!school) {
      setErrorMessage(`School Register Number '${registerNumber}' not found. Try NXS-2026-0001`);
      return;
    }

    if (activePortal === 'principal') {
      onLoginSuccess({
        id: `prn_${school.id}`,
        role: 'principal',
        schoolId: school.id,
        schoolName: school.name,
        schoolRegisterNumber: school.registerNumber,
        name: school.principalName,
        email: school.principalEmail,
      });
      return;
    }

    if (activePortal === 'teacher') {
      const teachers = dataService.getTeachers(school.id);
      const teacher = teachers.find((t) => t.email.toLowerCase() === teacherEmail.trim().toLowerCase());
      if (!teacher) {
        setErrorMessage(`Teacher with email '${teacherEmail}' not registered in ${school.name}.`);
        return;
      }

      onLoginSuccess({
        id: teacher.id,
        role: 'teacher',
        schoolId: school.id,
        schoolName: school.name,
        schoolRegisterNumber: school.registerNumber,
        name: teacher.name,
        email: teacher.email,
        employeeId: teacher.employeeId,
        subject: teacher.subject,
        qualification: teacher.qualification,
        classesAssigned: teacher.classesAssigned,
        sectionsAssigned: teacher.sectionsAssigned,
      });
      return;
    }

    if (activePortal === 'student') {
      const students = dataService.getStudents(school.id);
      const student = students.find((s) => s.studentId.toUpperCase() === studentId.trim().toUpperCase());
      if (!student) {
        setErrorMessage(`Student ID '${studentId}' not found in ${school.name}. Try STU-1021`);
        return;
      }

      onLoginSuccess({
        id: student.id,
        role: 'student',
        schoolId: school.id,
        schoolName: school.name,
        schoolRegisterNumber: school.registerNumber,
        name: student.name,
        studentId: student.studentId,
        class: student.class,
        section: student.section,
        rollNo: student.rollNo,
      });
      return;
    }
  };

  // Quick Demo Login Helper
  const handleQuickDemoLogin = (role: UserRole) => {
    if (role === 'super_admin') {
      onLoginSuccess({
        id: 'super_admin_01',
        role: 'super_admin',
        schoolId: 'ALL',
        schoolName: 'Klyro Tech Global Network',
        schoolRegisterNumber: 'NXS-GLOBAL',
        name: 'VASCORE Super Admin',
        email: 'sadanandj2011@gmail.com',
      });
    } else if (role === 'principal') {
      onLoginSuccess({
        id: 'prn_sch_greenwood_001',
        role: 'principal',
        schoolId: DEMO_SCHOOL.id,
        schoolName: DEMO_SCHOOL.name,
        schoolRegisterNumber: DEMO_SCHOOL.registerNumber,
        name: DEMO_SCHOOL.principalName,
        email: DEMO_SCHOOL.principalEmail,
      });
    } else if (role === 'teacher') {
      const t = dataService.getTeachers(DEMO_SCHOOL.id)[0];
      onLoginSuccess({
        id: t.id,
        role: 'teacher',
        schoolId: DEMO_SCHOOL.id,
        schoolName: DEMO_SCHOOL.name,
        schoolRegisterNumber: DEMO_SCHOOL.registerNumber,
        name: t.name,
        email: t.email,
        employeeId: t.employeeId,
        subject: t.subject,
        qualification: t.qualification,
        classesAssigned: t.classesAssigned,
        sectionsAssigned: t.sectionsAssigned,
      });
    } else if (role === 'student') {
      const s = dataService.getStudents(DEMO_SCHOOL.id)[0];
      onLoginSuccess({
        id: s.id,
        role: 'student',
        schoolId: DEMO_SCHOOL.id,
        schoolName: DEMO_SCHOOL.name,
        schoolRegisterNumber: DEMO_SCHOOL.registerNumber,
        name: s.name,
        studentId: s.studentId,
        class: s.class,
        section: s.section,
        rollNo: s.rollNo,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onGoToLanding}
          className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer text-left"
        >
          <NexusLogo size={36} />
        </button>

        <div className="flex items-center gap-3">
          {onGoToLanding && (
            <button
              onClick={onGoToLanding}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Home className="w-4 h-4 text-indigo-600" />
              <span>Back to SaaS Landing</span>
            </button>
          )}

          <button
            onClick={onOpenRegisterModal}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold text-white shadow-xs shadow-indigo-100 flex items-center gap-2 transition active:scale-95 cursor-pointer"
          >
            <Building2 className="w-4 h-4" />
            Register New School
          </button>
        </div>
      </div>


      {/* Main Authentication Card */}
      <div className="max-w-xl mx-auto w-full my-8 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 text-center">Digital Campus Authentication</h1>
          <p className="text-xs text-slate-500 text-center mt-1">
            Select your role portal to access your authorized school environment.
          </p>
        </div>

        {/* Overall Slide Navigation Bar for All Logins */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-inner">
          {[
            { id: 'super_admin', label: 'Super Admin', icon: ShieldCheck, colorClass: 'bg-amber-500 text-slate-950 font-bold shadow-xs' },
            { id: 'principal', label: 'Principal', icon: SchoolIcon, colorClass: 'bg-purple-600 text-white font-bold shadow-xs' },
            { id: 'teacher', label: 'Teacher', icon: BookOpen, colorClass: 'bg-indigo-600 text-white font-bold shadow-xs' },
            { id: 'student', label: 'Student', icon: GraduationCap, colorClass: 'bg-emerald-600 text-white font-bold shadow-xs' },
          ].map((portal) => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => {
                  setActivePortal(portal.id as UserRole);
                  setErrorMessage('');
                }}
                className={`relative py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors z-10 cursor-pointer ${
                  isActive ? portal.colorClass : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-current' : 'text-slate-500'}`} />
                <span>{portal.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="authLoginSlide"
                    className={`absolute inset-0 rounded-xl ${portal.colorClass} -z-10`}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {activePortal === 'super_admin' && (
            <>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Authorized Super Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Super Admin Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </>
          )}

          {activePortal === 'principal' && (
            <>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">School Register Number</label>
                <input
                  type="text"
                  required
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="e.g. SCH-2026-0001"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold font-mono">Principal Password (UDISE Code)</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password / UDISE code"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                />
              </div>
            </>
          )}

          {activePortal === 'teacher' && (
            <>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">School Register Number</label>
                <input
                  type="text"
                  required
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="e.g. SCH-2026-0001"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Registered Teacher Email</label>
                <input
                  type="email"
                  required
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="Enter teacher email address"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </>
          )}

          {activePortal === 'student' && (
            <>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">School Register Number</label>
                <input
                  type="text"
                  required
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  placeholder="e.g. SCH-2026-0001"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Student ID</label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter Student ID"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-mono placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-extrabold text-white text-xs shadow-xs shadow-indigo-100 flex items-center justify-center gap-2 transition transform active:scale-95"
          >
            Access {activePortal.replace('_', ' ').toUpperCase()} Portal
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400 py-4 border-t border-slate-200/60">
        Klyro Tech Digital Campus Platform • Powered by <span className="text-slate-700 font-semibold">VASCORE Labs</span>
      </div>
    </div>
  );
};
