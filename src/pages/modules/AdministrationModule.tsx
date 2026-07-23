import React, { useState } from 'react';
import { Shield, Lock, FileCode, CheckCircle2, RefreshCw } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const AdministrationModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const auditLogs = [
    { time: '10:14 AM', user: 'Dr. Rajesh Sharma (Principal)', action: 'Approved Teacher Leave Request #LR-101', ip: '192.168.1.12' },
    { time: '09:45 AM', user: 'Admin Staff (Super Admin)', action: 'Generated Monthly Fee Ledger CSV', ip: '192.168.1.04' },
    { time: '08:30 AM', user: 'Mrs. Priya Sharma (Teacher)', action: 'Logged Morning Attendance for Class 8-A', ip: '192.168.1.45' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">System Administration & Security Controls</h1>
        <p className="text-xs text-slate-300">User role permissions, live audit trails, automated database backups, and security policies.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="System Roles" value="4 Active Roles" change="Super Admin, Principal..." isPositive={true} icon={Shield} />
        <StatsCard title="Security Score" value="99.4%" change="2FA Enforced" isPositive={true} icon={Lock} />
        <StatsCard title="Last Backup" value="Today 03:00 AM" change="Automated Cloud Backup" isPositive={true} icon={FileCode} />
        <StatsCard title="Active User Sessions" value="28 Users" change="Encrypted SSL" isPositive={true} icon={CheckCircle2} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Real-Time System Audit Trail</h3>
          <button
            onClick={() => triggerNotification('Fresh database backup snapshot triggered.')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700"
          >
            Create Backup Snapshot
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {auditLogs.map((log, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{log.user}</span>
                <p className="text-slate-500 font-medium">{log.action}</p>
              </div>
              <div className="text-slate-400 font-mono text-[11px]">{log.time} • IP: {log.ip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
