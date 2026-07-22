import React from 'react';

export const HeroDashboardMockup: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 mb-16 px-2 sm:px-4">
      {/* Outer Floating Glow Frame */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-3xl blur-xl opacity-30 animate-pulse" />

      {/* Main Glass Dashboard Shell */}
      <div className="relative rounded-3xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl overflow-hidden text-slate-200">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline-block">
              klyro.cloud.vascore.labs/live-campus-portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live Campus Sync • 99.99% Uptime
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-bold text-blue-400">
              Greenwood High School
            </span>
          </div>
        </div>

        {/* Floating Interactive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* COLUMN 1 */}
          <div className="space-y-4">
            {/* 1. Analytics Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/40 transition duration-300 shadow-lg group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Campus Analytics
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300">Today</span>
              </div>
              <div className="text-2xl font-black text-white tracking-tight">98.4% Attendance</div>
              <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400 font-semibold">
                <span>+2.3% vs last week</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">Fee Paid: ₹14.8L</span>
              </div>
            </div>

            {/* 2. Homework Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Physics • Class 8-A
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  High Priority
                </span>
              </div>
              <h4 className="font-bold text-white text-sm">Quantum Optics & Wave Motion</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">Complete lab worksheet #4 and review interference equations before 5:00 PM.</p>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>Due Today</span>
                <span className="text-emerald-400 font-medium">38/42 Submitted</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 */}
          <div className="space-y-4">
            {/* 3. SOS Alert Card (Floating Highlight) */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 to-slate-900/80 border border-rose-500/40 backdrop-blur-md shadow-lg shadow-rose-900/20 animate-pulse">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="text-xs font-black uppercase text-rose-400 tracking-wider">
                    Campus SOS Alert
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">Active</span>
              </div>
              <h4 className="font-bold text-white text-sm">Medical Assist Requested</h4>
              <p className="text-xs text-slate-300 mt-1">Science Laboratory 2, Block B • First Aid Responder Dispatched</p>
            </div>

            {/* 4. Notice Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-blue-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Official Circular
                </span>
                <span className="text-[10px] text-slate-500">Principal Office</span>
              </div>
              <h4 className="font-bold text-white text-sm">Annual Science & Tech Fair 2026</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">Exhibition registration opens tomorrow. Top projects receive VASCORE Tech Grant.</p>
            </div>

            {/* 5. Timetable Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-purple-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-purple-400">Period 3 • 10:30 AM</span>
                <span className="text-slate-400">Class 8-A</span>
              </div>
              <div className="text-sm font-extrabold text-white mt-1">Mathematics: Differential Calculus</div>
              <div className="text-xs text-slate-400 mt-0.5">Faculty: Prof. K. R. Nambiar (Room 204)</div>
            </div>
          </div>

          {/* COLUMN 3 */}
          <div className="space-y-4">
            {/* 6. Event Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-amber-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Upcoming Event
                </span>
                <span className="text-[10px] text-amber-400 font-semibold">Friday • 2 PM</span>
              </div>
              <h4 className="font-bold text-white text-sm">Inter-School Robotics Championship</h4>
              <p className="text-xs text-slate-400 mt-1">Main Auditorium • 12 Teams Competing</p>
            </div>

            {/* 7. Achievements Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-cyan-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Hall of Fame
                </span>
                <span className="text-[10px] text-slate-500">Awarded</span>
              </div>
              <h4 className="font-bold text-white text-sm">1st Rank State Science Olympiad</h4>
              <p className="text-xs text-cyan-300 font-medium mt-0.5">Winner: Ananya Deshmukh (Class 10-B)</p>
            </div>

            {/* 8. Complaint / Voice Desk Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/60 border border-slate-800/80 backdrop-blur-md hover:border-indigo-500/40 transition duration-300 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Encrypted Feedback
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Resolved</span>
              </div>
              <h4 className="font-bold text-white text-sm">Cafeteria Sanitation Enhancement</h4>
              <p className="text-xs text-slate-400 mt-0.5">Submitted Anonymously • Action Taken by Principal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
