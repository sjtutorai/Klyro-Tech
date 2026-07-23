import React, { useState } from 'react';
import { Bus, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const TransportModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const buses = [
    { id: 'BUS-01', route: 'Route 1: Indiranagar - Koramangala - School', driver: 'Mani Kumar (+91 98765 88811)', students: '42 Students', status: 'GPS Live - On Route' },
    { id: 'BUS-02', route: 'Route 2: Whitefield - ITPL - School', driver: 'Suresh Babu (+91 98765 88822)', students: '38 Students', status: 'GPS Live - At School' },
    { id: 'BUS-03', route: 'Route 3: Jayanagar - BTM Layout - School', driver: 'Ramesh Reddy (+91 98765 88833)', students: '45 Students', status: 'GPS Live - On Route' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">School Bus Fleet & Transport Management</h1>
        <p className="text-xs text-slate-300">Live GPS route tracking, driver contact details, student bus drop rosters, and vehicle fitness certificates.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Buses" value="12 Buses" change="100% Inspected" isPositive={true} icon={Bus} />
        <StatsCard title="Students Transported" value="480 Students" change="40% Coverage" isPositive={true} icon={Bus} />
        <StatsCard title="GPS Tracking" value="12 Active" change="Real-time" isPositive={true} icon={MapPin} />
        <StatsCard title="Safety Standard" value="RTO Verified" change="Speed Governor" isPositive={true} icon={ShieldCheck} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Active Bus Fleet & Driver Rosters</h3>
        <div className="space-y-3">
          {buses.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-mono text-indigo-600 font-bold">{b.id}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{b.route}</h4>
                <p className="text-slate-500">Driver: {b.driver} • {b.students}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  {b.status}
                </span>
                <button
                  onClick={() => triggerNotification(`Live GPS tracking map launched for ${b.id}`)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                >
                  Track GPS →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
