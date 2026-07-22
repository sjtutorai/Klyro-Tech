import React, { useState } from 'react';
import { NexusLogo } from './NexusLogo';
import { ParticleNetworkBg } from './ParticleNetworkBg';
import { HeroDashboardMockup } from './HeroDashboardMockup';
import {
  BookOpen,
  Bell,
  Calendar,
  MessageSquare,
  Siren,
  Clock,
  Award,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  UserCheck,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Zap,
  Globe,
  Lock,
  Play,
  Github,
  Linkedin,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface SaasLandingPageProps {
  onOpenLogin: () => void;
  onOpenRegisterModal: () => void;
  onSelectRoleDemo: (role: 'super_admin' | 'principal' | 'teacher' | 'student') => void;
}

export const SaasLandingPage: React.FC<SaasLandingPageProps> = ({
  onOpenLogin,
  onOpenRegisterModal,
  onSelectRoleDemo,
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<'principal' | 'teacher' | 'student' | 'super_admin'>('principal');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black overflow-x-hidden relative">
      {/* Dynamic Animated Particle Network Background */}
      <ParticleNetworkBg />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <NexusLogo size={38} />
          </button>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('roles')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Role Portals
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              Trust & Impact
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-cyan-400 transition cursor-pointer"
            >
              About
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 border border-slate-800 transition cursor-pointer"
            >
              Portal Login
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 hover:shadow-cyan-500/40 transition active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>Register School</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center z-10">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-400 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Gen Digital Campus Infrastructure</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400">Powered by VASCORE Labs</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
          Klyro Tech
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          Connecting Every School, Seamlessly.
        </p>

        {/* Description */}
        <p className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Klyro Tech is a next-generation Digital Campus Platform that connects Principals, Teachers,
          Students and School Administrators through one secure cloud platform.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenRegisterModal}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base flex items-center gap-3 shadow-xl shadow-blue-600/40 hover:shadow-cyan-500/50 transition duration-300 active:scale-95 cursor-pointer"
          >
            <Building2 className="w-5 h-5" />
            <span>🏫 Register School</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLogin}
            className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-lg backdrop-blur-md transition duration-300 active:scale-95 cursor-pointer group"
          >
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <span>Portal Login</span>
          </button>
        </div>

        {/* Floating Dashboard Preview Mockup */}
        <HeroDashboardMockup />
      </section>

      {/* TRUST & STATS SECTION */}
      <section id="stats" className="py-16 bg-slate-950/60 border-y border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
            Institutional Trust & Impact
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Trusted by Modern Schools Nationwide
          </h2>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                250+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Schools Onboarded
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                12,000+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Faculty Members
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                180,000+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Active Students
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/30 transition">
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">
                1.5M+
              </div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-2">
                Assignments Processed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES PREVIEW SECTION */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            Comprehensive Suite
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Built for High-Performance Campuses
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Everything your educational ecosystem needs—from emergency response to homework submission—consolidated into a single sleek interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1: Homework */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-blue-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Homework Engine</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Faculty assign worksheets with attachments, priority tags, and due dates. Students submit work digitally with completion verification.
            </p>
          </div>

          {/* Feature 2: Notices */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition duration-300">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Instant Notice Board</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Principals broadcast circulars school-wide or targeted to specific classes, ensuring parents and students receive immediate updates.
            </p>
          </div>

          {/* Feature 3: Events */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-emerald-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition duration-300">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Events & Exhibition</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Manage sports meets, science fairs, and tech symposiums with rich poster graphics, venue details, and attendance tracking.
            </p>
          </div>

          {/* Feature 4: SOS Emergency */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-rose-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition duration-300">
              <Siren className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Campus Emergency SOS</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              One-touch alert trigger for faculty during medical, fire, or safety emergencies. Immediate dispatcher notification to Principal desk.
            </p>
          </div>

          {/* Feature 5: Complaints Desk */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Anonymous Voice Desk</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Encrypted channel allowing students to report grievances or bullying anonymously, with official Principal reply tracking.
            </p>
          </div>

          {/* Feature 6: Timetable */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-purple-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Smart Timetable</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Conflict-free schedule manager for teachers and students across periods, room allocations, and subject rotations.
            </p>
          </div>

          {/* Feature 7: Achievements */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-amber-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition duration-300">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">Student Hall of Fame</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Award academic, sports, and cultural badges. Build student confidence with state rank showcases and digital certificates.
            </p>
          </div>

          {/* Feature 8: Super Admin Directory */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-teal-500/50 hover:bg-slate-900/90 transition duration-300 group shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mt-5">UDISE Directory</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              VASCORE Super Admin network oversight with automated register numbers, UDISE code security, and multi-school provisioning.
            </p>
          </div>
        </div>
      </section>

      {/* ROLE MANAGEMENT / DEMO SECTION */}
      <section id="roles" className="py-20 bg-slate-950/80 border-t border-slate-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Tailored Experiences
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
              Experience Klyro Tech by Persona
            </h2>
            <p className="text-slate-400 text-sm mt-3">
              Click any role below to launch the live interactive portal directly.
            </p>

            {/* Role Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800/80 max-w-full overflow-x-auto">
              <button
                onClick={() => setActiveRoleTab('principal')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeRoleTab === 'principal'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" /> Principal Portal
              </button>

              <button
                onClick={() => setActiveRoleTab('teacher')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeRoleTab === 'teacher'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Faculty Portal
              </button>

              <button
                onClick={() => setActiveRoleTab('student')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeRoleTab === 'student'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Student Portal
              </button>

              <button
                onClick={() => setActiveRoleTab('super_admin')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeRoleTab === 'super_admin'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" /> Super Admin
              </button>
            </div>
          </div>

          {/* Persona Card Detail */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
            <div>
              {activeRoleTab === 'principal' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold">
                    <Building2 className="w-4 h-4" /> School Head Command Center
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Principal Executive Dashboard
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Provides total oversight of faculty assignments, emergency SOS alert monitoring, official notice broadcasting, grievance resolutions, and fee analytics.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-time SOS Incident Response Desk
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Broadcast School Notices & Circulars
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Review Encrypted Student Complaints
                    </li>
                  </ul>
                  <button
                    onClick={() => onSelectRoleDemo('principal')}
                    className="mt-4 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition cursor-pointer"
                  >
                    <span>Launch Principal Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeRoleTab === 'teacher' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                    <Briefcase className="w-4 h-4" /> Faculty Operations Suite
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Teacher Digital Portal
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Empowers faculty to post assignments, upload attachments, track homework submissions, trigger panic SOS alerts, and award student achievements.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Create & Grade Digital Homework
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Trigger Instant SOS Medical/Safety Alerts
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Award Honor Badges & Olympiad Certificates
                    </li>
                  </ul>
                  <button
                    onClick={() => onSelectRoleDemo('teacher')}
                    className="mt-4 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer"
                  >
                    <span>Launch Faculty Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeRoleTab === 'student' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    <GraduationCap className="w-4 h-4" /> Learner Hub
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Student Interactive Workspace
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Allows students to track subject assignments, view class timetables, submit anonymous feedback, and celebrate student achievements.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> View Due Homework & Worksheets
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Access Weekly Class Timetable & Rooms
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Submit Encrypted Anonymous Feedback
                    </li>
                  </ul>
                  <button
                    onClick={() => onSelectRoleDemo('student')}
                    className="mt-4 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition cursor-pointer"
                  >
                    <span>Launch Student Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeRoleTab === 'super_admin' && (
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
                    <Layers className="w-4 h-4" /> Global Platform Management
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    VASCORE Super Admin Portal
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Manages multi-school registrations, UDISE code generation, network security compliance, and platform analytics.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Provision & Approve New Registered Schools
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Manage UDISE Directories & Key Credentials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Monitor System Uptime & Security Logs
                    </li>
                  </ul>
                  <button
                    onClick={() => onSelectRoleDemo('super_admin')}
                    className="mt-4 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition cursor-pointer"
                  >
                    <span>Launch Super Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Persona Visual Preview Box */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-3 font-mono text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Klyro Tech Security Sandbox Active
                </span>
                <span>Role: {activeRoleTab.toUpperCase()}</span>
              </div>
              <p className="text-slate-400 font-sans">
                Try the live interactive prototype. No sign-up or credit card required. All data persists seamlessly during your session.
              </p>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-1">
                <div>• Instant multi-tenant isolation</div>
                <div>• Sub-second cloud execution</div>
                <div>• Responsive mobile & desktop layouts</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / ARCHITECTURE SECTION */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <Lock className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white">Bank-Grade Security</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Every school operates in an isolated encrypted environment with UDISE code validation and role-based token authentication.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white">Lightning Fast</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Engineered on Cloud Run containers with zero lag. Homework postings, SOS emergency triggers, and circular notices sync in milliseconds.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
            <Globe className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white">Zero Hardware Required</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Fully web-native platform accessible on smartphones, tablets, and desktop browsers without installing local servers.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (CTA) */}
      <section className="py-20 max-w-5xl mx-auto px-4 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 border border-blue-500/30 p-10 sm:p-16 text-center overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/30 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Transform Your School?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-300">
            Join modern educational institutions digitizing homework, emergency alerts, and circulars on Klyro Tech.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenRegisterModal}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition active:scale-95 cursor-pointer"
            >
              <Building2 className="w-5 h-5" />
              <span>Register Your School</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenLogin}
              className="px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm sm:text-base transition cursor-pointer"
            >
              Log In to Existing Portal
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 relative z-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <NexusLogo size={36} />
            <p className="text-slate-400 text-xs mt-2 leading-relaxed">
              Connecting Every School, Seamlessly.
            </p>
            <div className="text-[11px] text-cyan-400 font-bold">
              Powered by VASCORE Labs
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan-400">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('features')} className="hover:text-cyan-400">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('roles')} className="hover:text-cyan-400">
                  Role Portals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('stats')} className="hover:text-cyan-400">
                  Trust & Impact
                </button>
              </li>
            </ul>
          </div>

          {/* Role Demos */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-wider">
              Interactive Demos
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onSelectRoleDemo('principal')} className="hover:text-cyan-400">
                  Principal Executive Portal
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRoleDemo('teacher')} className="hover:text-cyan-400">
                  Teacher Workspace
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRoleDemo('student')} className="hover:text-cyan-400">
                  Student Digital Desk
                </button>
              </li>
              <li>
                <button onClick={() => onSelectRoleDemo('super_admin')} className="hover:text-cyan-400">
                  VASCORE Super Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-white font-bold mb-3 uppercase text-[10px] tracking-wider">
              Connect with Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@vascorelabs.io"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[10px] text-slate-500 mt-4">
              © {new Date().getFullYear()} Klyro Tech • VASCORE Labs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
