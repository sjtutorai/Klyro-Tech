import React, { useState } from 'react';
import {
  School as SchoolIcon,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  AlertTriangle,
  Siren,
  ShieldCheck,
  Search,
  Plus,
  Power,
  Trash2,
  KeyRound,
  Download,
  Upload,
  Radio,
  BarChart2,
  Activity,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { School, UserSession } from '../../types';
import { dataService } from '../../services/dataService';
import { SUPER_ADMIN_EMAILS } from '../../data/initialData';

interface SuperAdminDashboardProps {
  session: UserSession;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = () => {
  const [schools, setSchools] = useState<School[]>(dataService.getSchools());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  // Broadcast Notice Modal State
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');

  // Password Reset Modal
  const [resetModalData, setResetModalData] = useState<{ schoolName: string; type: string } | null>(null);

  // Backup / Restore JSON
  const [restoreJson, setRestoreJson] = useState('');
  const [restoreMessage, setRestoreMessage] = useState('');

  const refreshData = () => {
    setSchools(dataService.getSchools());
  };

  const handleToggleStatus = (schoolId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'suspended' : 'active';
    dataService.updateSchoolStatus(schoolId, nextStatus);
    refreshData();
  };

  const handleDeleteSchool = (schoolId: string) => {
    if (confirm('Are you sure you want to permanently delete this school and its data?')) {
      dataService.deleteSchool(schoolId);
      refreshData();
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;

    dataService.addNotice({
      schoolId: 'ALL',
      title: broadcastTitle,
      category: 'Circular',
      content: broadcastContent,
      isPinned: true,
      targetRole: 'all',
      createdByRole: 'super_admin',
      createdByName: 'VASCORE Labs Super Admin',
    });

    setShowBroadcastModal(false);
    setBroadcastTitle('');
    setBroadcastContent('');
    alert('Global Broadcast Notice published to all registered schools!');
  };

  const handleExportBackup = () => {
    const data = dataService.exportDatabaseJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Klyro_Tech_Cloud_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const handleRestoreBackup = () => {
    if (!restoreJson.trim()) return;
    const ok = dataService.restoreDatabaseJSON(restoreJson);
    if (ok) {
      setRestoreMessage('Database successfully restored!');
      refreshData();
      setTimeout(() => setRestoreMessage(''), 3000);
    } else {
      setRestoreMessage('Invalid JSON backup file.');
    }
  };

  // Aggregated Stats
  const totalSchools = schools.length;
  const totalPrincipals = schools.length;
  const totalTeachers = dataService.getTeachers().length;
  const totalStudents = dataService.getStudents().length;
  const totalHomework = dataService.getHomeworks().length;
  const totalEvents = dataService.getEvents().length;
  const totalComplaints = dataService.getComplaints().length;
  const totalSOSAlerts = dataService.getSOSAlerts().length;

  const filteredSchools = schools.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.registerNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.udiseCode.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const chartData = [
    { name: 'Schools', value: totalSchools },
    { name: 'Principals', value: totalPrincipals },
    { name: 'Teachers', value: totalTeachers },
    { name: 'Students', value: totalStudents },
    { name: 'Homework', value: totalHomework },
    { name: 'Events', value: totalEvents },
    { name: 'Complaints', value: totalComplaints },
    { name: 'SOS Alerts', value: totalSOSAlerts },
  ];

  const activityLogs = dataService.getActivityLogs();

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-slate-900">
      {/* Authorized Super Admin Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-amber-900 flex items-center gap-2">
              👑 VASCORE Labs Command Center
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200/80 text-amber-800 font-mono font-bold">
                SUPER ADMIN AUTHORIZED
              </span>
            </div>
            <p className="text-xs text-amber-700 mt-0.5">
              Authorized Emails:{' '}
              {SUPER_ADMIN_EMAILS.map((e) => e.split('@')[0]).join(', ')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Radio className="w-4 h-4" />
            Global Broadcast
          </button>
          <button
            onClick={handleExportBackup}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 border border-slate-200/80 transition"
          >
            <Download className="w-4 h-4 text-indigo-600" />
            Export Backup
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Schools</span>
            <SchoolIcon className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalSchools}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Principals</span>
            <Users className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalPrincipals}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Teachers</span>
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalTeachers}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Students</span>
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalStudents}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Homework</span>
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalHomework}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Events</span>
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalEvents}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>Complaints</span>
            <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
          </div>
          <div className="text-xl font-black text-slate-900">{totalComplaints}</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>SOS Alerts</span>
            <Siren className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-black text-rose-600">{totalSOSAlerts}</div>
        </div>
      </div>

      {/* Main Section: School Management Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <SchoolIcon className="w-5 h-5 text-indigo-600" />
              Registered School Network
            </h3>
            <p className="text-xs text-slate-500">
              Manage school authorizations, status, security locks, and credentials.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search school or UDISE..."
                className="pl-9 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 w-48 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="border border-slate-200/80 rounded-2xl overflow-x-auto bg-white">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200/80">
              <tr>
                <th className="p-3.5">School Details</th>
                <th className="p-3.5">Register #</th>
                <th className="p-3.5">Principal</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Faculty / Students</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchools.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      {s.logoUrl && (
                        <img
                          src={s.logoUrl}
                          alt=""
                          className="w-6 h-6 rounded-md object-cover border border-slate-200"
                        />
                      )}
                      <span>{s.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">UDISE: {s.udiseCode}</div>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-[11px] border border-indigo-100">
                      {s.registerNumber}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">{s.principalName}</div>
                    <div className="text-[10px] text-slate-500">{s.principalEmail}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{s.district}</div>
                    <div className="text-[10px] text-slate-500">{s.state}</div>
                  </td>

                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                        {s.totalTeachers} Tchrs
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                        {s.totalStudents} Stds
                      </span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        s.status === 'active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {s.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="p-3.5 text-right space-x-1">
                    <button
                      onClick={() => setResetModalData({ schoolName: s.name, type: 'Principal' })}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                      title="Reset Principal Password"
                    >
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                    </button>

                    <button
                      onClick={() => handleToggleStatus(s.id, s.status)}
                      className={`p-1.5 rounded-lg transition ${
                        s.status === 'active'
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-600'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
                      }`}
                      title={s.status === 'active' ? 'Suspend School' : 'Activate School'}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteSchool(s.id)}
                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                      title="Delete School"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics & Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recharts Platform Distribution */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-600" />
            Platform Ecosystem Metrics
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a' }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-Time System Activity Logs */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            System Activity Log
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {activityLogs.map((log) => (
              <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                <div className="flex items-center justify-between text-slate-500 text-[10px]">
                  <span className="font-bold text-indigo-700">{log.actorName} ({log.actorRole})</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="text-slate-800 mt-1 font-medium">{log.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Database Restore Utility */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Upload className="w-4 h-4 text-indigo-600" />
          Database Backup & Restore Tool
        </h3>
        <p className="text-xs text-slate-500">
          Paste exported Klyro Tech JSON backup state to restore system database instantly.
        </p>

        {restoreMessage && (
          <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {restoreMessage}
          </div>
        )}

        <div className="flex gap-2">
          <textarea
            value={restoreJson}
            onChange={(e) => setRestoreJson(e.target.value)}
            placeholder="Paste JSON database backup here..."
            className="w-full h-20 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 font-mono focus:outline-none focus:border-indigo-600"
          />
        </div>
        <button
          onClick={handleRestoreBackup}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition shadow-2xs"
        >
          Restore Database
        </button>
      </div>

      {/* Broadcast Notice Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-bold flex items-center gap-2 text-amber-700">
              <Radio className="w-5 h-5" />
              Global School Notice Broadcast
            </h3>
            <p className="text-xs text-slate-500">
              This notice will be published across all registered school portals on Klyro Tech network.
            </p>

            <form onSubmit={handleSendBroadcast} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  placeholder="e.g. Critical System Maintenance Advisory"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Notice Message *</label>
                <textarea
                  required
                  rows={4}
                  value={broadcastContent}
                  onChange={(e) => setBroadcastContent(e.target.value)}
                  placeholder="Type broadcast message..."
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {resetModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 border border-amber-200 mx-auto flex items-center justify-center">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold">Reset Password</h3>
            <p className="text-xs text-slate-500">
              Reset temporary password for <span className="text-slate-900 font-bold">{resetModalData.schoolName}</span> ({resetModalData.type}).
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-emerald-700">
              New Password: <span className="font-bold">klyro@reset2026</span>
            </div>
            <button
              onClick={() => {
                alert(`Password successfully reset to klyro@reset2026 for ${resetModalData.schoolName}`);
                setResetModalData(null);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
            >
              Confirm Password Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
