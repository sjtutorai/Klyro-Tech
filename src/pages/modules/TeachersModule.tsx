import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  UserCheck,
  TrendingUp,
  Download,
  MoreVertical,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { SearchBar } from '../../components/common/SearchBar';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  subject: string;
  classTeacher: string;
  status: 'Active' | 'On Leave' | 'Transfer Pending';
  workloadHours: number;
  rating: number;
  attendanceRate: string;
  qualification: string;
  joiningDate: string;
}

const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 'TCH-001',
    name: 'Mrs. Priya Sharma',
    email: 'priya.sharma@greenwood.edu',
    phone: '+91 98765 43210',
    department: 'Mathematics',
    subject: 'Grade 8 & 10 Mathematics',
    classTeacher: 'Grade 8-A',
    status: 'Active',
    workloadHours: 24,
    rating: 4.9,
    attendanceRate: '98%',
    qualification: 'M.Sc Mathematics, B.Ed',
    joiningDate: '12-Jun-2018',
  },
  {
    id: 'TCH-002',
    name: 'Dr. Ramesh Kumar',
    email: 'ramesh.kumar@greenwood.edu',
    phone: '+91 98765 43211',
    department: 'Science',
    subject: 'Grade 9 & 10 Physics',
    classTeacher: 'Grade 10-B',
    status: 'Active',
    workloadHours: 26,
    rating: 4.8,
    attendanceRate: '96%',
    qualification: 'Ph.D Physics',
    joiningDate: '01-Aug-2015',
  },
  {
    id: 'TCH-003',
    name: 'Ms. Ananya Roy',
    email: 'ananya.roy@greenwood.edu',
    phone: '+91 98765 43212',
    department: 'English',
    subject: 'Grade 6 - 8 English Literature',
    classTeacher: 'Grade 7-C',
    status: 'Active',
    workloadHours: 22,
    rating: 4.7,
    attendanceRate: '95%',
    qualification: 'M.A. English, B.Ed',
    joiningDate: '15-Jan-2020',
  },
  {
    id: 'TCH-004',
    name: 'Mr. Suresh Hegde',
    email: 'suresh.hegde@greenwood.edu',
    phone: '+91 98765 43213',
    department: 'Languages',
    subject: 'Kannada Language & Lit',
    classTeacher: 'Grade 6-A',
    status: 'On Leave',
    workloadHours: 20,
    rating: 4.8,
    attendanceRate: '92%',
    qualification: 'M.A. Kannada, B.Ed',
    joiningDate: '10-Jul-2016',
  },
  {
    id: 'TCH-005',
    name: 'Mrs. Deepa Patel',
    email: 'deepa.patel@greenwood.edu',
    phone: '+91 98765 43214',
    department: 'Science',
    subject: 'Grade 7 & 8 Chemistry',
    classTeacher: 'Grade 8-B',
    status: 'Active',
    workloadHours: 25,
    rating: 4.9,
    attendanceRate: '99%',
    qualification: 'M.Sc Chemistry, M.Ed',
    joiningDate: '04-Mar-2019',
  },
  {
    id: 'TCH-006',
    name: 'Mr. Vikram Singh',
    email: 'vikram.singh@greenwood.edu',
    phone: '+91 98765 43215',
    department: 'Social Science',
    subject: 'Grade 9 & 10 History & Civics',
    classTeacher: 'Grade 9-A',
    status: 'Active',
    workloadHours: 23,
    rating: 4.6,
    attendanceRate: '94%',
    qualification: 'M.A. History',
    joiningDate: '20-Oct-2021',
  },
];

interface LeaveRequest {
  id: string;
  teacherName: string;
  type: string;
  dates: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: 'LR-101', teacherName: 'Mr. Suresh Hegde', type: 'Casual Leave', dates: '23 Jul - 25 Jul', reason: 'Family medical emergency', status: 'Pending' },
  { id: 'LR-102', teacherName: 'Ms. Ananya Roy', type: 'Medical Leave', dates: '28 Jul - 29 Jul', reason: 'Doctor consultation & rest', status: 'Pending' },
];

export const TeachersModule: React.FC<{ activeSubItem?: string }> = ({ activeSubItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeTab, setActiveTab] = useState<'directory' | 'leaves' | 'workload' | 'performance'>('directory');
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(LEAVE_REQUESTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherDept, setNewTeacherDept] = useState('Mathematics');
  const [newTeacherSubject, setNewTeacherSubject] = useState('');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleApproveLeave = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: action } : l)));
    triggerNotification(`Leave request ${id} ${action.toLowerCase()} successfully.`);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName) return;
    const newT: Teacher = {
      id: `TCH-00${teachers.length + 1}`,
      name: newTeacherName,
      email: `${newTeacherName.toLowerCase().replace(/\s+/g, '.')}@greenwood.edu`,
      phone: '+91 98765 00000',
      department: newTeacherDept,
      subject: newTeacherSubject || `${newTeacherDept} Fundamentals`,
      classTeacher: 'Unassigned',
      status: 'Active',
      workloadHours: 20,
      rating: 5.0,
      attendanceRate: '100%',
      qualification: 'B.Ed, Master Degree',
      joiningDate: 'Today',
    };
    setTeachers([newT, ...teachers]);
    setShowAddModal(false);
    setNewTeacherName('');
    setNewTeacherSubject('');
    triggerNotification(`Faculty member ${newTeacherName} added to directory!`);
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

      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Users className="w-4 h-4 text-amber-400" />
            <span>Faculty Management System</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Teacher Management & Workload Portal</h1>
          <p className="text-xs text-slate-300">
            Directory, subject allocation, leave approvals, and workload distribution for Greenwood International Academy.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Stats Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Faculty"
          value={teachers.length}
          change="100% Staffed"
          isPositive={true}
          subtext="across 6 Academic Departments"
          icon={Users}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-600"
        />
        <StatsCard
          title="Present Today"
          value={teachers.filter((t) => t.status === 'Active').length}
          change="95.8%"
          isPositive={true}
          subtext="1 on Casual Leave"
          icon={UserCheck}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-600"
        />
        <StatsCard
          title="Pending Leaves"
          value={leaves.filter((l) => l.status === 'Pending').length}
          change="Action Required"
          isPositive={false}
          subtext="2 leave applications today"
          icon={Calendar}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-600"
        />
        <StatsCard
          title="Avg Workload"
          value="23.5 hrs/wk"
          change="Optimal"
          isPositive={true}
          subtext="Balanced timetable distribution"
          icon={Clock}
          iconBgColor="bg-purple-500/10"
          iconTextColor="text-purple-600"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === 'directory'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Teacher Directory ({teachers.length})
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer relative ${
            activeTab === 'leaves'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Leave Approvals
          {leaves.filter((l) => l.status === 'Pending').length > 0 && (
            <span className="ml-2 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px]">
              {leaves.filter((l) => l.status === 'Pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('workload')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer ${
            activeTab === 'workload'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Workload Matrix
        </button>
      </div>

      {/* Directory Tab View */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search teachers by name, subject, or ID..." />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Languages">Languages</option>
                <option value="Social Science">Social Science</option>
              </select>
              <button
                onClick={() => triggerNotification('Exporting Teacher Directory to Excel...')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                        {teacher.name.replace('Mrs. ', '').replace('Dr. ', '').replace('Ms. ', '').replace('Mr. ', '').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{teacher.name}</h3>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">{teacher.department}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        teacher.status === 'Active'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {teacher.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Subject:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{teacher.subject}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Class Teacher:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{teacher.classTeacher}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Workload:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{teacher.workloadHours} hrs / week</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Rating:</span>
                      <span className="font-extrabold text-amber-500">★ {teacher.rating} / 5.0</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{teacher.id}</span>
                  <div className="flex items-center gap-1.5">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      title="Send Email"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => triggerNotification(`Viewing profile details for ${teacher.name}`)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-100 transition"
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaves Tab View */}
      {activeTab === 'leaves' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Faculty Leave Requests</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold uppercase tracking-wider">
                <tr>
                  <th className="p-3.5">Leave ID</th>
                  <th className="p-3.5">Teacher Name</th>
                  <th className="p-3.5">Leave Type</th>
                  <th className="p-3.5">Dates</th>
                  <th className="p-3.5">Reason</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {leaves.map((leave) => (
                  <tr key={leave.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-3.5 font-mono font-bold text-indigo-600">{leave.id}</td>
                    <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">{leave.teacherName}</td>
                    <td className="p-3.5">{leave.type}</td>
                    <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">{leave.dates}</td>
                    <td className="p-3.5 text-slate-500">{leave.reason}</td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          leave.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-700'
                            : leave.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {leave.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleApproveLeave(leave.id, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                            title="Approve"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleApproveLeave(leave.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition"
                            title="Reject"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Workload Tab View */}
      {activeTab === 'workload' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Weekly Period Workload Distribution</h3>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">
              Target: 22 - 26 hrs / week
            </span>
          </div>
          <div className="space-y-4">
            {teachers.map((t) => (
              <div key={t.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-slate-100">{t.name} ({t.department})</span>
                  <span className="text-slate-600 dark:text-slate-400">{t.workloadHours} / 30 Maximum Hours</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      t.workloadHours > 25 ? 'bg-amber-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${(t.workloadHours / 30) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Add New Faculty Member</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="e.g. Dr. Sunita Rao"
                  required
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Department</label>
                <select
                  value={newTeacherDept}
                  onChange={(e) => setNewTeacherDept(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Languages">Languages</option>
                  <option value="Social Science">Social Science</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject Taught</label>
                <input
                  type="text"
                  value={newTeacherSubject}
                  onChange={(e) => setNewTeacherSubject(e.target.value)}
                  placeholder="e.g. Grade 9 Biology"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
