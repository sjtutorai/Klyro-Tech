import React, { useState } from 'react';
import {
  Megaphone,
  Send,
  Bell,
  CheckCircle2,
  Users,
  MessageSquare,
  FileText,
  Mail
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const CommunicationModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [targetAudience, setTargetAudience] = useState('All Parents & Guardians');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText) return;
    triggerNotification(`Broadcast circular dispatched to ${targetAudience} via SMS & App Notification!`);
    setAnnouncementText('');
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

      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Megaphone className="w-4 h-4 text-amber-400" />
            <span>Campus Broadcast & Notifications</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Parent & Staff Communication Center</h1>
          <p className="text-xs text-slate-300">
            Dispatch urgent SMS alerts, school circulars, holiday announcements, and event invitations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Contacts" value="1,288 Parents" change="99.2% Active" isPositive={true} icon={Users} />
        <StatsCard title="SMS Delivered This Month" value="4,250 SMS" change="100% Success" isPositive={true} icon={Send} />
        <StatsCard title="Active Circulars" value="6 Circulars" change="Term 2" isPositive={true} icon={FileText} />
        <StatsCard title="Emergency Alert Channel" value="Ready" change="Instant" isPositive={true} icon={Bell} />
      </div>

      {/* Broadcast Form & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
            <Send className="w-5 h-5 text-indigo-600" />
            <span>Broadcast New Circular / SMS</span>
          </h3>

          <form onSubmit={handleBroadcast} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100"
              >
                <option value="All Parents & Guardians">All Parents & Guardians (1,240)</option>
                <option value="Class 10 Parents Only">Class 10 Parents Only (140)</option>
                <option value="Faculty & Staff">Faculty & Staff (48)</option>
                <option value="Bus Route 01 Parents">Bus Route 01 Parents (45)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Message Content / Circular Text</label>
              <textarea
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                rows={4}
                placeholder="Type circular details or emergency announcement..."
                required
                className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Circular Now</span>
            </button>
          </form>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4">
          <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span>Recent Circular History</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-amber-300 font-bold text-[10px] uppercase">Yesterday • All Parents</span>
              <p className="font-semibold text-slate-200">Parent-Teacher Meeting scheduled for Saturday 28th July at 09:30 AM.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-indigo-300 font-bold text-[10px] uppercase">20-Jul • Class 10</span>
              <p className="font-semibold text-slate-200">Mid-Term Board Mock Exam timetable published in student portal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
