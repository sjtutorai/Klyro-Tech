import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Layers,
  Plus,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const AcademicModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const syllabusProgress = [
    { subject: 'Class 10 Mathematics', progress: 82, teacher: 'Mrs. Priya Sharma', status: 'On Schedule' },
    { subject: 'Class 10 Physics', progress: 75, teacher: 'Dr. Ramesh Kumar', status: 'On Schedule' },
    { subject: 'Class 10 Chemistry', progress: 68, teacher: 'Mrs. Deepa Patel', status: 'Slight Lag (1 Chapter)' },
    { subject: 'Class 10 English', progress: 90, teacher: 'Ms. Ananya Roy', status: 'Ahead of Schedule' },
    { subject: 'Class 10 Social Science', progress: 78, teacher: 'Mr. Vikram Singh', status: 'On Schedule' },
  ];

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
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Curriculum & Academic Progress</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Academic Management & Syllabus Progress</h1>
          <p className="text-xs text-slate-300">
            Syllabus completion metrics, lesson plan verification, board alignment, and subject allocations.
          </p>
        </div>

        <button
          onClick={() => triggerNotification('Curriculum Progress Audit report generated.')}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <BarChart2 className="w-4 h-4" />
          <span>Audit Syllabus Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Subjects" value="28 Subjects" change="CBSE Aligned" isPositive={true} icon={BookOpen} />
        <StatsCard title="Avg Syllabus Completion" value="78.6%" change="+4.2%" isPositive={true} icon={BarChart2} />
        <StatsCard title="Approved Lesson Plans" value="142 / 150" change="94.6%" isPositive={true} icon={FileText} />
        <StatsCard title="Academic Days Left" value="68 Days" change="Term 2" isPositive={true} icon={Clock} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Grade 10 Subject Syllabus Tracker</h3>
        <div className="space-y-4">
          {syllabusProgress.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-900 dark:text-slate-100 text-sm">{item.subject} ({item.teacher})</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{item.progress}% Completed</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Status: {item.status}</span>
                <button
                  onClick={() => triggerNotification(`Detailed lesson plan opened for ${item.subject}`)}
                  className="text-indigo-600 hover:underline font-bold"
                >
                  View Lesson Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
