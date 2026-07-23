import React, { useState } from 'react';
import { Building2, CheckCircle2, Wrench, Shield, AlertTriangle, Plus } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const InfrastructureModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const assets = [
    { name: 'Room 201 Smartboard', location: 'Building A', status: 'Operational', lastInspected: '10-Jul-2026' },
    { name: 'Science Physics Lab 1 Projector', location: 'Science Block', status: 'Under Maintenance', lastInspected: '22-Jul-2026' },
    { name: 'Computer Lab 3 AC Unit', location: 'IT Wing', status: 'Operational', lastInspected: '15-Jul-2026' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">Campus Infrastructure & Maintenance</h1>
        <p className="text-xs text-slate-300">Classrooms, laboratories, IT hardware assets, and facility repair requests.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Classrooms" value="32 Rooms" change="100% Utilized" isPositive={true} icon={Building2} />
        <StatsCard title="Active Smartboards" value="28 Units" change="Operational" isPositive={true} icon={CheckCircle2} />
        <StatsCard title="Open Maintenance Tickets" value="2 Requests" change="In Progress" isPositive={false} icon={Wrench} />
        <StatsCard title="Safety Audit Score" value="98 / 100" change="Fire & CCTV Verified" isPositive={true} icon={Shield} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Facility Hardware & Asset Status</h3>
          <button
            onClick={() => triggerNotification('Maintenance ticket #MT-804 logged for facility review.')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
          >
            + Report Maintenance Issue
          </button>
        </div>

        <div className="space-y-3 text-xs">
          {assets.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
                <p className="text-slate-500">{item.location} • Inspected: {item.lastInspected}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${item.status === 'Operational' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
