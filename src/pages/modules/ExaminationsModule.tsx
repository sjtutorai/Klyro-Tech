import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Calendar,
  FileText,
  Download,
  Plus,
  Users,
  Search
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const ExaminationsModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const upcomingExams = [
    { title: 'Class 10 Mid-Term Assessment', date: '01-Aug - 10-Aug 2026', status: 'Seating Allocated', hall: 'Halls 1 to 4' },
    { title: 'Class 8-9 Science Unit Test 2', date: '15-Aug 2026', status: 'Question Paper Approved', hall: 'Classrooms' },
    { title: 'Annual State Board Mock Examination', date: '15-Sep - 25-Sep 2026', status: 'Draft Schedule', hall: 'Main Auditorium' },
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

      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Examination Control Cell</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Examinations, Report Cards & Ranking</h1>
          <p className="text-xs text-slate-300">
            Publish exam schedules, record marks, generate student report cards, and analyze board mock scores.
          </p>
        </div>

        <button
          onClick={() => triggerNotification('Report Cards generated for Class 10 Students.')}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Bulk Report Cards</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Scheduled Exams" value="3 Active Exams" change="Aug-Sep 2026" isPositive={true} icon={Calendar} />
        <StatsCard title="Pass Rate (Last Term)" value="98.2%" change="+2.4%" isPositive={true} icon={Award} />
        <StatsCard title="Pending Grade Entry" value="0 Subjects" change="100% Entered" isPositive={true} icon={CheckCircle2} />
        <StatsCard title="Top Rank Holder" value="Aarav Sharma (98.6%)" change="Grade 10" isPositive={true} icon={Users} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Upcoming Examination Timetable</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingExams.map((exam, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase">{exam.status}</div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{exam.title}</h4>
              <p className="text-xs text-slate-500 font-medium">Dates: {exam.date}</p>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{exam.hall}</span>
                <button
                  onClick={() => triggerNotification(`Seating arrangement PDF downloaded for ${exam.title}`)}
                  className="text-indigo-600 hover:underline"
                >
                  Download Schedule →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
