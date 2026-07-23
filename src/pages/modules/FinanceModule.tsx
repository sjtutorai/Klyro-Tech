import React, { useState } from 'react';
import {
  DollarSign,
  Send,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Users
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

interface FeeRecord {
  id: string;
  studentName: string;
  grade: string;
  amountDue: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  parentPhone: string;
}

const FEE_RECORDS: FeeRecord[] = [
  { id: 'INV-2026-01', studentName: 'Rohan Deshmukh', grade: 'Grade 9-B', amountDue: '₹14,500', dueDate: '15-Jul-2026', status: 'Overdue', parentPhone: '+91 98765 33333' },
  { id: 'INV-2026-02', studentName: 'Karthik Gowda', grade: 'Grade 8-B', amountDue: '₹12,000', dueDate: '20-Jul-2026', status: 'Pending', parentPhone: '+91 98765 55555' },
  { id: 'INV-2026-03', studentName: 'Aarav Sharma', grade: 'Grade 10-A', amountDue: '₹18,000', dueDate: '10-Jul-2026', status: 'Paid', parentPhone: '+91 98765 11111' },
  { id: 'INV-2026-04', studentName: 'Ananya Verma', grade: 'Grade 10-A', amountDue: '₹18,000', dueDate: '10-Jul-2026', status: 'Paid', parentPhone: '+91 98765 22222' },
];

export const FinanceModule: React.FC = () => {
  const [feeList, setFeeList] = useState<FeeRecord[]>(FEE_RECORDS);
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSendReminder = (name: string, phone: string) => {
    triggerNotification(`Payment reminder SMS & WhatsApp sent to parent of ${name} (${phone})`);
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
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Financial & Fee Operations</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">School Finance, Payroll & Fee Collection</h1>
          <p className="text-xs text-slate-300">
            Real-time tracking of term tuition fee collections, pending balance reminders, teacher salary distribution, and expense audits.
          </p>
        </div>

        <button
          onClick={() => triggerNotification('Faculty Salary Slips generated for current month.')}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <CreditCard className="w-4 h-4" />
          <span>Generate Monthly Payroll</span>
        </button>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Fee Collected"
          value="₹18.25 Lakhs"
          change="+12.4%"
          isPositive={true}
          subtext="88% Term 1 Fee Cleared"
          icon={TrendingUp}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-600"
        />
        <StatsCard
          title="Outstanding Fees"
          value="₹2.45 Lakhs"
          change="14 Defaulters"
          isPositive={false}
          subtext="Action required for Grade 8-9"
          icon={AlertCircle}
          iconBgColor="bg-rose-500/10"
          iconTextColor="text-rose-600"
        />
        <StatsCard
          title="Monthly Payroll"
          value="₹8.40 Lakhs"
          change="48 Faculty"
          isPositive={true}
          subtext="Disbursed on 1st of Month"
          icon={Users}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-600"
        />
        <StatsCard
          title="Net Operational Surplus"
          value="₹7.40 Lakhs"
          change="Healthy"
          isPositive={true}
          subtext="After lab & bus expenses"
          icon={ArrowUpRight}
          iconBgColor="bg-purple-500/10"
          iconTextColor="text-purple-600"
        />
      </div>

      {/* Fee Defaulters & Ledger Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">
            Term Fee Status & Payment Reminders
          </h3>
          <button
            onClick={() => triggerNotification('Bulk Fee Reminder SMS dispatched to all pending parents.')}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Send Bulk SMS Reminder</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold uppercase tracking-wider">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Class / Section</th>
                <th className="p-3.5">Amount Due</th>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {feeList.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <td className="p-3.5 font-mono font-bold text-indigo-600">{rec.id}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">{rec.studentName}</td>
                  <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">{rec.grade}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">{rec.amountDue}</td>
                  <td className="p-3.5 text-slate-500">{rec.dueDate}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        rec.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-700'
                          : rec.status === 'Overdue'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {rec.status !== 'Paid' ? (
                      <button
                        onClick={() => handleSendReminder(rec.studentName, rec.parentPhone)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold transition flex items-center gap-1 justify-end ml-auto"
                      >
                        <Send className="w-3 h-3" />
                        <span>Remind Parent</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => triggerNotification(`Fee Receipt PDF generated for ${rec.studentName}`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold transition flex items-center gap-1 justify-end ml-auto"
                      >
                        <Download className="w-3 h-3" />
                        <span>Receipt</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
