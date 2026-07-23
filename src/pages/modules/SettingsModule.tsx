import React, { useState } from 'react';
import { Settings, Building2, CheckCircle2, Lock, Sliders, Bell } from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState('Greenwood International Academy');
  const [academicYear, setAcademicYear] = useState('2026 - 2027');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification('School System Configuration updated successfully.');
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">School Profile & System Settings</h1>
        <p className="text-xs text-slate-300">Configure school branding, active academic year, notification gateways, and security credentials.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 max-w-3xl">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">General School Preferences</h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="text-slate-700 dark:text-slate-300">School / Institution Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            />
          </div>

          <div>
            <label className="text-slate-700 dark:text-slate-300">Active Academic Session</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
            />
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 space-y-2">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200">API Credentials & External Integrations</h4>
            <p className="text-slate-500 text-[11px]">Gemini AI Engine: Connected • SMS Gateway (Twilio/Gupshup): Active • Payment Gateway (Razorpay/Stripe): Active</p>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-md cursor-pointer"
          >
            Save Configuration
          </button>
        </form>
      </div>
    </div>
  );
};
