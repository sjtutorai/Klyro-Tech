import React, { useState } from 'react';
import { Users, Phone, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const ParentModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const meetings = [
    { parent: 'Rajesh Sharma', student: 'Aarav Sharma (10-A)', teacher: 'Mrs. Priya Sharma', time: '28-Jul 10:00 AM', status: 'Confirmed' },
    { parent: 'Vikram Verma', student: 'Ananya Verma (10-A)', teacher: 'Dr. Ramesh Kumar', time: '28-Jul 10:30 AM', status: 'Confirmed' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">Parent-Teacher Association & Grievances</h1>
        <p className="text-xs text-slate-300">Parent meeting scheduling, complaint resolution portal, and PTA council notifications.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Parent Profiles" value="1,180 Registered" change="95% Mobile Verified" isPositive={true} icon={Users} />
        <StatsCard title="Scheduled PTM Meetings" value="48 Meetings" change="This Saturday" isPositive={true} icon={Calendar} />
        <StatsCard title="Resolved Complaints" value="100% Resolved" change="0 Pending" isPositive={true} icon={CheckCircle2} />
        <StatsCard title="PTA Council Members" value="12 Parents" change="Active" isPositive={true} icon={Users} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Upcoming Parent-Teacher Appointments</h3>
        <div className="space-y-3">
          {meetings.map((m, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{m.parent} (Parent of {m.student})</h4>
                <p className="text-slate-500">Meeting with: {m.teacher} • Scheduled Time: {m.time}</p>
              </div>
              <button
                onClick={() => triggerNotification(`Meeting reminder sent to ${m.parent}`)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 self-start md:self-center"
              >
                Send Meeting Link
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
