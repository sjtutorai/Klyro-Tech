import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  CheckCircle2,
  TrendingUp,
  PieChart as PieChartIcon,
  Calendar,
  Sparkles,
  Users,
  GraduationCap
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { StatsCard } from '../../components/common/StatsCard';

const ATTENDANCE_TREND = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 94 },
  { month: 'Mar', attendance: 96 },
  { month: 'Apr', attendance: 95 },
  { month: 'May', attendance: 91 },
  { month: 'Jun', attendance: 98 },
];

const PERFORMANCE_DISTRIBUTION = [
  { name: 'Grade A+ (90-100%)', value: 35, color: '#10B981' },
  { name: 'Grade A (75-89%)', value: 42, color: '#6366F1' },
  { name: 'Grade B (60-74%)', value: 15, color: '#F59E0B' },
  { name: 'Grade C (<60%)', value: 8, color: '#EF4444' },
];

export const ReportsModule: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState('Academic Performance');
  const [dateRange, setDateRange] = useState('Current Term');
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
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
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Institutional Intelligence</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Reports & Analytical Insights</h1>
          <p className="text-xs text-slate-300">
            Export official PDF/CSV statements for attendance audits, fee collections, board exam trends, and faculty workload.
          </p>
        </div>

        <button
          onClick={() => triggerNotification('Generating Master School Summary Report (PDF)...')}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Download Master Report PDF</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Overall Attendance"
          value="95.4%"
          change="+1.8%"
          isPositive={true}
          subtext="Exceeds State Board Standard"
          icon={Users}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-600"
        />
        <StatsCard
          title="Pass Percentage"
          value="98.2%"
          change="+2.1%"
          isPositive={true}
          subtext="Mid-Term Board Mock Exam"
          icon={GraduationCap}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-600"
        />
        <StatsCard
          title="Fee Collection Rate"
          value="88.1%"
          change="₹18.2L Collected"
          isPositive={true}
          subtext="Q2 Term Fee Clearance"
          icon={TrendingUp}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-600"
        />
        <StatsCard
          title="Syllabus Completion"
          value="78.5%"
          change="On Track"
          isPositive={true}
          subtext="All Grade 10 subjects aligned"
          icon={BarChart3}
          iconBgColor="bg-purple-500/10"
          iconTextColor="text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Monthly Attendance Trends (%)</h3>
              <p className="text-xs text-slate-500">Student & Faculty presence tracking</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">
              2026 Term
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ATTENDANCE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#FFF', fontSize: '12px' }}
                />
                <Bar dataKey="attendance" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grade Distribution Pie Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Academic Grade Distribution</h3>
              <p className="text-xs text-slate-500">Class 10 Mid-Term Assessment Results</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full">
              Verified
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PERFORMANCE_DISTRIBUTION}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {PERFORMANCE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pre-made Downloadable Reports */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Instant Report Downloads</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Student Attendance Audit Report', type: 'PDF • 2.4 MB', desc: 'Detailed daily log of student attendance across all grades.' },
            { title: 'Fee Defaulters & Outstanding Collection', type: 'Excel • 1.1 MB', desc: 'Pending fee balances, parent contact information, and payment links.' },
            { title: 'Faculty Workload & Performance Audit', type: 'PDF • 3.8 MB', desc: 'Classroom teaching hours, subject progress, and student feedback ratings.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600">
                  <FileText className="w-4 h-4" />
                  <span className="font-bold text-xs">{item.title}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-[11px] font-bold text-slate-400">{item.type}</span>
                <button
                  onClick={() => triggerNotification(`Downloading ${item.title}...`)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
