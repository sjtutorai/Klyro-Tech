import React, { useState } from 'react';
import { User, Mail, Shield, CheckCircle2, Phone, Key } from 'lucide-react';
import { UserSession } from '../../types';

export const ProfileModule: React.FC<{ session: UserSession }> = ({ session }) => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg">
          {session.userName.substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-black">{session.userName}</h1>
          <p className="text-xs text-indigo-300 font-bold capitalize">{session.role.replace('_', ' ')} • {session.schoolName}</p>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-2xl">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Personal Profile & Credentials</h3>

        <div className="space-y-3 text-xs font-medium">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <span className="text-slate-500">Email Address:</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">{session.email}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <span className="text-slate-500">Access Role:</span>
            <span className="font-bold text-indigo-600 uppercase">{session.role}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <span className="text-slate-500">Two-Factor Authentication:</span>
            <span className="font-extrabold text-emerald-600">Enabled (SMS OTP)</span>
          </div>

          <button
            onClick={() => triggerNotification('Password reset link dispatched to user email.')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
