import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Users,
  Building2,
  RefreshCw,
  Download,
  Share2,
  Zap,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

interface Period {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

const SCHEDULE_DATA: Record<string, Period[]> = {
  Monday: [
    { time: '09:00 - 09:45 AM', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 201' },
    { time: '09:45 - 10:30 AM', subject: 'Physics', teacher: 'Dr. Ramesh Kumar', room: 'Lab 1' },
    { time: '10:45 - 11:30 AM', subject: 'English Lit', teacher: 'Ms. Ananya Roy', room: 'Room 201' },
    { time: '11:30 - 12:15 PM', subject: 'Chemistry', teacher: 'Mrs. Deepa Patel', room: 'Lab 2' },
    { time: '01:00 - 01:45 PM', subject: 'Kannada Language', teacher: 'Mr. Suresh Hegde', room: 'Room 201' },
    { time: '01:45 - 02:30 PM', subject: 'Social Science', teacher: 'Mr. Vikram Singh', room: 'Room 201' },
  ],
  Tuesday: [
    { time: '09:00 - 09:45 AM', subject: 'Physics', teacher: 'Dr. Ramesh Kumar', room: 'Lab 1' },
    { time: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 201' },
    { time: '10:45 - 11:30 AM', subject: 'Computer Lab', teacher: 'Mr. Anil Mehta', room: 'Comp Lab 3' },
    { time: '11:30 - 12:15 PM', subject: 'Biology', teacher: 'Dr. Ramesh Kumar', room: 'Lab 2' },
    { time: '01:00 - 01:45 PM', subject: 'English Grammar', teacher: 'Ms. Ananya Roy', room: 'Room 201' },
    { time: '01:45 - 02:30 PM', subject: 'Sports / Physical Ed', teacher: 'Coach Raj', room: 'Playground' },
  ],
  Wednesday: [
    { time: '09:00 - 09:45 AM', subject: 'Chemistry', teacher: 'Mrs. Deepa Patel', room: 'Lab 2' },
    { time: '09:45 - 10:30 AM', subject: 'Mathematics', teacher: 'Mrs. Priya Sharma', room: 'Room 201' },
    { time: '10:45 - 11:30 AM', subject: 'History & Civics', teacher: 'Mr. Vikram Singh', room: 'Room 201' },
    { time: '11:30 - 12:15 PM', subject: 'English Lit', teacher: 'Ms. Ananya Roy', room: 'Room 201' },
    { time: '01:00 - 01:45 PM', subject: 'Kannada Language', teacher: 'Mr. Suresh Hegde', room: 'Room 201' },
    { time: '01:45 - 02:30 PM', subject: 'Library Hour', teacher: 'Mrs. Sunita Library', room: 'Central Library' },
  ],
};

export const TimetableModule: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10-A');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday'>('Monday');
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAiGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      triggerNotification('✨ AI Timetable Optimization Complete! 0 Conflicts, 100% Teacher Availability matched.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>AI Master Scheduler</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Academic Timetable & Substitute Allocation</h1>
          <p className="text-xs text-slate-300">
            Real-time conflict detection, room occupancy matrix, and automated substitute teacher assignment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAiGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-slate-950" />}
            <span>{isGenerating ? 'Optimizing AI Schedule...' : 'AI Auto-Generate Timetable'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Scheduled Classes"
          value="42 / Day"
          change="100% Filled"
          isPositive={true}
          subtext="across 14 Classrooms"
          icon={Calendar}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-600"
        />
        <StatsCard
          title="Schedule Conflicts"
          value="0 Conflicts"
          change="Clean"
          isPositive={true}
          subtext="AI verified no double-booking"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-600"
        />
        <StatsCard
          title="Free Labs Today"
          value="Lab 3 & Comp 2"
          change="Available"
          isPositive={true}
          subtext="Slot 4 & Slot 6 open"
          icon={Building2}
          iconBgColor="bg-purple-500/10"
          iconTextColor="text-purple-600"
        />
        <StatsCard
          title="Absence Substitute"
          value="1 Teacher"
          change="Assigned"
          isPositive={true}
          subtext="Mr. Suresh (Leave) → Mrs. Deepa"
          icon={Users}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-600"
        />
      </div>

      {/* Timetable Controls */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-bold text-slate-500">Select Class:</label>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
          >
            <option value="Grade 10-A">Grade 10 - Section A</option>
            <option value="Grade 10-B">Grade 10 - Section B</option>
            <option value="Grade 9-A">Grade 9 - Section A</option>
            <option value="Grade 8-A">Grade 8 - Section A</option>
          </select>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(['Monday', 'Tuesday', 'Wednesday'] as const).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={() => triggerNotification(`Downloaded PDF Timetable for ${selectedGrade}`)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Download className="w-4 h-4" />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Day Schedule Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">
              {selectedGrade} Schedule • {selectedDay}
            </h3>
          </div>
          <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
            Active Master Schedule
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHEDULE_DATA[selectedDay]?.map((period, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 hover:border-indigo-400 transition"
            >
              <div className="flex items-center justify-between text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                <span>Period {idx + 1}</span>
                <span>{period.time}</span>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{period.subject}</span>
                </h4>
                <p className="text-xs text-slate-500 font-medium">Faculty: {period.teacher}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {period.room}
                </span>
                <span className="text-emerald-600 text-[11px]">Confirmed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
