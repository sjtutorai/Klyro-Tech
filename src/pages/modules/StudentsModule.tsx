import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Search,
  Plus,
  FileSpreadsheet,
  Award,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  TrendingUp,
  Download,
  Phone,
  Mail,
  Heart,
  ShieldAlert,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { SearchBar } from '../../components/common/SearchBar';

interface Student {
  id: string;
  rollNo: number;
  name: string;
  grade: string;
  section: string;
  attendance: string;
  academicPerformance: string;
  parentName: string;
  parentPhone: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  bloodGroup: string;
  conduct: 'Excellent' | 'Good' | 'Needs Improvement';
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 'STU-1001',
    rollNo: 1,
    name: 'Aarav Sharma',
    grade: 'Grade 10',
    section: 'A',
    attendance: '98.5%',
    academicPerformance: '94.2% (Grade A+)',
    parentName: 'Rajesh Sharma',
    parentPhone: '+91 98765 11111',
    status: 'Active',
    bloodGroup: 'O+',
    conduct: 'Excellent',
  },
  {
    id: 'STU-1002',
    rollNo: 2,
    name: 'Ananya Verma',
    grade: 'Grade 10',
    section: 'A',
    attendance: '96.0%',
    academicPerformance: '88.5% (Grade A)',
    parentName: 'Vikram Verma',
    parentPhone: '+91 98765 22222',
    status: 'Active',
    bloodGroup: 'B+',
    conduct: 'Excellent',
  },
  {
    id: 'STU-1003',
    rollNo: 3,
    name: 'Rohan Deshmukh',
    grade: 'Grade 9',
    section: 'B',
    attendance: '82.0%',
    academicPerformance: '64.0% (Grade C)',
    parentName: 'Sanjay Deshmukh',
    parentPhone: '+91 98765 33333',
    status: 'Active',
    bloodGroup: 'A+',
    conduct: 'Needs Improvement',
  },
  {
    id: 'STU-1004',
    rollNo: 4,
    name: 'Diya Patel',
    grade: 'Grade 8',
    section: 'A',
    attendance: '99.0%',
    academicPerformance: '96.5% (Grade A+)',
    parentName: 'Ramesh Patel',
    parentPhone: '+91 98765 44444',
    status: 'Active',
    bloodGroup: 'AB+',
    conduct: 'Excellent',
  },
  {
    id: 'STU-1005',
    rollNo: 5,
    name: 'Karthik Gowda',
    grade: 'Grade 8',
    section: 'B',
    attendance: '91.2%',
    academicPerformance: '78.0% (Grade B)',
    parentName: 'Manjunath Gowda',
    parentPhone: '+91 98765 55555',
    status: 'Active',
    bloodGroup: 'O-',
    conduct: 'Good',
  },
  {
    id: 'STU-1006',
    rollNo: 6,
    name: 'Sneha Reddy',
    grade: 'Grade 7',
    section: 'C',
    attendance: '94.5%',
    academicPerformance: '85.0% (Grade A)',
    parentName: 'Venkat Reddy',
    parentPhone: '+91 98765 66666',
    status: 'Active',
    bloodGroup: 'A-',
    conduct: 'Good',
  },
];

export const StudentsModule: React.FC<{ activeSubItem?: string }> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [activeTab, setActiveTab] = useState<'directory' | 'discipline' | 'medical' | 'promote'>('directory');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State
  const [newName, setNewName] = useState('');
  const [newGrade, setNewGrade] = useState('Grade 8');
  const [newSection, setNewSection] = useState('A');
  const [newParent, setNewParent] = useState('');

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const handleAdmitStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const newS: Student = {
      id: `STU-10${students.length + 1}`,
      rollNo: students.length + 1,
      name: newName,
      grade: newGrade,
      section: newSection,
      attendance: '100%',
      academicPerformance: 'Pending Evaluation',
      parentName: newParent || 'Parent / Guardian',
      parentPhone: '+91 98765 00000',
      status: 'Active',
      bloodGroup: 'B+',
      conduct: 'Good',
    };
    setStudents([newS, ...students]);
    setShowAdmitModal(false);
    setNewName('');
    setNewParent('');
    triggerNotification(`New student ${newName} successfully admitted to ${newGrade}-${newSection}!`);
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
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Student Information System</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">Student Management & Academic Profiles</h1>
          <p className="text-xs text-slate-300">
            Admissions, attendance records, discipline logs, medical information, and performance tracking.
          </p>
        </div>

        <button
          onClick={() => setShowAdmitModal(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer self-start md:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Admit New Student</span>
        </button>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Students"
          value="1,240"
          change="+4.2%"
          isPositive={true}
          subtext="across Grade 1 to Grade 10"
          icon={GraduationCap}
          iconBgColor="bg-indigo-500/10"
          iconTextColor="text-indigo-600"
        />
        <StatsCard
          title="Avg Attendance"
          value="94.2%"
          change="High"
          isPositive={true}
          subtext="1,168 Present Today"
          icon={UserCheck}
          iconBgColor="bg-emerald-500/10"
          iconTextColor="text-emerald-600"
        />
        <StatsCard
          title="Top Performers (A+)"
          value="184"
          change="+12"
          isPositive={true}
          subtext="Scored > 90% in Mid-Terms"
          icon={Award}
          iconBgColor="bg-amber-500/10"
          iconTextColor="text-amber-600"
        />
        <StatsCard
          title="At-Risk / Watchlist"
          value="14"
          change="-3"
          isPositive={true}
          subtext="Attendance < 85% or low grades"
          icon={ShieldAlert}
          iconBgColor="bg-rose-500/10"
          iconTextColor="text-rose-600"
        />
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'directory'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Student Roster ({students.length})
        </button>
        <button
          onClick={() => setActiveTab('discipline')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'discipline'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Behaviour & Discipline
        </button>
        <button
          onClick={() => setActiveTab('medical')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'medical'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Medical Records
        </button>
        <button
          onClick={() => setActiveTab('promote')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
            activeTab === 'promote'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Batch Promotion / TC Transfer
        </button>
      </div>

      {/* Student Roster Table */}
      {activeTab === 'directory' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search students by name, parent, or ID..." />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
              >
                <option value="All">All Grades</option>
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 9">Grade 9</option>
                <option value="Grade 8">Grade 8</option>
                <option value="Grade 7">Grade 7</option>
              </select>
              <button
                onClick={() => triggerNotification('Exporting Student Roster (PDF / Excel)...')}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" />
                <span>Export Roster</span>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-extrabold uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5">Student ID</th>
                    <th className="p-3.5">Student Name</th>
                    <th className="p-3.5">Class / Sec</th>
                    <th className="p-3.5">Attendance</th>
                    <th className="p-3.5">Academic Grade</th>
                    <th className="p-3.5">Parent Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">{s.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-black text-xs flex items-center justify-center">
                          {s.name.substring(0, 1)}
                        </div>
                        <span>{s.name}</span>
                      </td>
                      <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
                        {s.grade} - Sec {s.section}
                      </td>
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-200">{s.attendance}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px]">
                          {s.academicPerformance}
                        </span>
                      </td>
                      <td className="p-3.5 space-y-0.5">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{s.parentName}</div>
                        <div className="text-[11px] text-slate-400">{s.parentPhone}</div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                            s.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => triggerNotification(`Opened student dossier for ${s.name}`)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-100 transition"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Discipline Tab */}
      {activeTab === 'discipline' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Conduct & Behavioural Logs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {students.map((s) => (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{s.name}</h4>
                  <p className="text-xs text-slate-500">{s.grade} - Section {s.section} • Roll #{s.rollNo}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    s.conduct === 'Excellent'
                      ? 'bg-emerald-100 text-emerald-800'
                      : s.conduct === 'Good'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {s.conduct}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Admit Modal */}
      {showAdmitModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">New Student Admission</h3>
              <button onClick={() => setShowAdmitModal(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdmitStudent} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student Full Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ishaan Rao"
                  required
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 7">Grade 7</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Section</label>
                  <select
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Parent / Guardian Name</label>
                <input
                  type="text"
                  value={newParent}
                  onChange={(e) => setNewParent(e.target.value)}
                  placeholder="e.g. Sunita Rao"
                  className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md"
                >
                  Admit Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
