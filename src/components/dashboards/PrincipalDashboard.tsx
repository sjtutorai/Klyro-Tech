import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  BookOpen,
  Calendar,
  AlertTriangle,
  Siren,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  MessageSquare,
  Building2,
  ShieldAlert,
  Send,
  Eye,
  Bell,
  Clock,
  Filter,
  GraduationCap,
} from 'lucide-react';
import {
  Teacher,
  Student,
  Homework,
  Notice,
  EventItem,
  Complaint,
  SOSAlert,
  UserSession,
  IssueStatus,
} from '../../types';
import { dataService } from '../../services/dataService';

interface PrincipalDashboardProps {
  session: UserSession;
}

export const PrincipalDashboard: React.FC<PrincipalDashboardProps> = ({ session }) => {
  const schoolId = session.schoolId;

  const [activeTab, setActiveTab] = useState<
    'teachers' | 'students' | 'homework' | 'notices' | 'events' | 'complaints' | 'sos'
  >('teachers');

  // State
  const [teachers, setTeachers] = useState<Teacher[]>(dataService.getTeachers(schoolId));
  const [students, setStudents] = useState<Student[]>(dataService.getStudents(schoolId));
  const [homeworks] = useState<Homework[]>(dataService.getHomeworks(schoolId));
  const [notices, setNotices] = useState<Notice[]>(dataService.getNotices(schoolId));
  const [events, setEvents] = useState<EventItem[]>(dataService.getEvents(schoolId));
  const [complaints, setComplaints] = useState<Complaint[]>(dataService.getComplaints(schoolId));
  const [sosAlerts, setSOSAlerts] = useState<SOSAlert[]>(dataService.getSOSAlerts(schoolId));

  // Modals & Forms State
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    subject: '',
    qualification: '',
    classes: '6,7,8',
    sections: 'A,B',
  });

  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'General' as Notice['category'],
    content: '',
    targetRole: 'all' as Notice['targetRole'],
  });

  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    venue: '',
    date: '',
    time: '',
    description: '',
    category: 'General',
  });

  // Complaint reply state
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState<IssueStatus>('In Progress');

  // Create Principal's Own Complaint
  const [showCreateComplaintModal, setShowCreateComplaintModal] = useState(false);
  const [ownComplaintText, setOwnComplaintText] = useState('');
  const [ownComplaintCategory, setOwnComplaintCategory] = useState<Complaint['category']>('Suggestions');

  const refreshData = () => {
    setTeachers(dataService.getTeachers(schoolId));
    setStudents(dataService.getStudents(schoolId));
    setNotices(dataService.getNotices(schoolId));
    setEvents(dataService.getEvents(schoolId));
    setComplaints(dataService.getComplaints(schoolId));
    setSOSAlerts(dataService.getSOSAlerts(schoolId));
  };

  // Add Teacher
  const handleSaveTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherForm.name || !teacherForm.email || !teacherForm.subject) return;

    dataService.addTeacher({
      schoolId,
      name: teacherForm.name,
      email: teacherForm.email,
      phone: teacherForm.phone || '+91 98000 00000',
      employeeId: teacherForm.employeeId || `EMP-${Date.now().toString().slice(-4)}`,
      subject: teacherForm.subject,
      qualification: teacherForm.qualification || 'B.Ed',
      classesAssigned: teacherForm.classes.split(',').map((c) => c.trim()),
      sectionsAssigned: teacherForm.sections.split(',').map((s) => s.trim()),
    });

    setShowAddTeacherModal(false);
    setTeacherForm({ name: '', email: '', phone: '', employeeId: '', subject: '', qualification: '', classes: '6,7,8', sections: 'A,B' });
    refreshData();
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (confirm('Are you sure you want to remove this teacher from faculty list?')) {
      dataService.deleteTeacher(teacherId, schoolId);
      refreshData();
    }
  };

  // Notices
  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeForm.title || !noticeForm.content) return;

    dataService.addNotice({
      schoolId,
      title: noticeForm.title,
      category: noticeForm.category,
      content: noticeForm.content,
      isPinned: false,
      targetRole: noticeForm.targetRole,
      createdByRole: 'principal',
      createdByName: session.name,
    });

    setShowNoticeModal(false);
    setNoticeForm({ title: '', category: 'General', content: '', targetRole: 'all' });
    refreshData();
  };

  const handleDeleteNotice = (noticeId: string) => {
    dataService.deleteNotice(noticeId);
    refreshData();
  };

  // Events
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;

    dataService.addEvent({
      schoolId,
      title: eventForm.title,
      venue: eventForm.venue || 'School Grounds',
      date: eventForm.date,
      time: eventForm.time || '10:00 AM',
      description: eventForm.description,
      category: eventForm.category,
      createdByName: session.name,
    });

    setShowEventModal(false);
    setEventForm({ title: '', venue: '', date: '', time: '', description: '', category: 'General' });
    refreshData();
  };

  const handleDeleteEvent = (eventId: string) => {
    dataService.deleteEvent(eventId);
    refreshData();
  };

  // Complaints
  const handleSaveReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !replyText) return;

    dataService.replyToComplaint(selectedComplaint.id, replyText, session.name, replyStatus);
    setSelectedComplaint(null);
    setReplyText('');
    refreshData();
  };

  const handleCreateOwnComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownComplaintText) return;

    dataService.addComplaint({
      schoolId,
      category: ownComplaintCategory,
      description: ownComplaintText,
      isAnonymous: false,
      studentName: `${session.name} (Principal)`,
      studentId: 'PRINCIPAL-01',
    });

    setShowCreateComplaintModal(false);
    setOwnComplaintText('');
    refreshData();
  };

  // Update SOS Status
  const handleUpdateSOSStatus = (alertId: string, status: IssueStatus) => {
    const note = prompt('Add optional resolution / status note:');
    dataService.updateSOSStatus(alertId, status, note || undefined);
    refreshData();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-900">
      {/* Principal Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-white border border-purple-200/80 text-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-700 text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-purple-600" />
            School Principal Administration
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">{session.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {session.schoolName} ({session.schoolRegisterNumber})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNoticeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Bell className="w-4 h-4" />
            Publish School Notice
          </button>
          <button
            onClick={() => setShowEventModal(true)}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Calendar className="w-4 h-4" />
            Create Event
          </button>
        </div>
      </div>

      {/* Sidebar + Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Icon-Only Navigation Sidebar */}
        <aside className="w-full md:w-16 flex-shrink-0 flex md:flex-col gap-2.5 p-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs sticky top-20 z-20 overflow-x-auto md:overflow-visible">
          {/* Faculty Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('teachers')}
              title={`Faculty (${teachers.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Users className="w-5 h-5" />
              {teachers.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'teachers' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {teachers.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Faculty</span>
                <span className="text-purple-300 font-mono text-[11px]">({teachers.length})</span>
              </div>
            </div>
          </div>

          {/* Students Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('students')}
              title={`Students (${students.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              {students.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'students' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {students.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Students</span>
                <span className="text-purple-300 font-mono text-[11px]">({students.length})</span>
              </div>
            </div>
          </div>

          {/* Homework Monitor Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('homework')}
              title={`Homework Monitor (${homeworks.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'homework'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {homeworks.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'homework' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {homeworks.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Homework Monitor</span>
                <span className="text-purple-300 font-mono text-[11px]">({homeworks.length})</span>
              </div>
            </div>
          </div>

          {/* Notices Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('notices')}
              title={`Notices (${notices.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'notices'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Bell className="w-5 h-5" />
              {notices.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'notices' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {notices.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Notices</span>
                <span className="text-purple-300 font-mono text-[11px]">({notices.length})</span>
              </div>
            </div>
          </div>

          {/* Events Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('events')}
              title={`Events (${events.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Calendar className="w-5 h-5" />
              {events.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'events' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {events.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Events</span>
                <span className="text-purple-300 font-mono text-[11px]">({events.length})</span>
              </div>
            </div>
          </div>

          {/* Complaints Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('complaints')}
              title={`Complaints (${complaints.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'complaints'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              {complaints.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'complaints' ? 'bg-amber-400 text-slate-950' : 'bg-purple-600 text-white'
                }`}>
                  {complaints.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Complaints</span>
                <span className="text-purple-300 font-mono text-[11px]">({complaints.length})</span>
              </div>
            </div>
          </div>

          {/* SOS Alerts Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('sos')}
              title={`SOS Alerts (${sosAlerts.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'sos'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-105'
                  : 'bg-slate-50 hover:bg-rose-50 text-rose-600 border border-rose-200/80'
              }`}
            >
              <Siren className="w-5 h-5 animate-pulse" />
              {sosAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold bg-rose-600 text-white border-2 border-white flex items-center justify-center animate-bounce">
                  {sosAlerts.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-rose-950 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5 border border-rose-800">
                <span>SOS Emergency Alerts</span>
                <span className="text-rose-300 font-mono text-[11px]">({sosAlerts.length})</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">

      {/* TAB 1: TEACHER MANAGEMENT */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">School Faculty Roster</h3>
            <button
              onClick={() => setShowAddTeacherModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs"
            >
              <UserPlus className="w-4 h-4" />
              Add New Teacher
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((t) => (
              <div key={t.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3 relative group">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">{t.subject}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-semibold text-slate-600">
                    {t.employeeId}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium">Email:</span> {t.email}
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Qualification:</span> {t.qualification}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-semibold">
                      Classes: {t.classesAssigned.join(', ')}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-semibold">
                      Sec: {t.sectionsAssigned.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-1 pt-2">
                  <button
                    onClick={() => handleDeleteTeacher(t.id)}
                    className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove Teacher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT ROSTER */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Student Directory & Class Matrix</h3>
            <span className="text-xs text-slate-500 font-medium">Total Enrolled: {students.length} Students</span>
          </div>

          <div className="border border-slate-200/80 rounded-2xl overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Student ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Class & Section</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Parent Info</th>
                  <th className="p-3.5">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-mono font-bold text-indigo-700">{s.studentId}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold">
                        Class {s.class}-{s.section}
                      </span>
                    </td>
                    <td className="p-3.5">{s.rollNo}</td>
                    <td className="p-3.5 text-slate-600">{s.parentName}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-500">{s.parentPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: HOMEWORK MONITOR (Read-Only) */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-800 flex items-center gap-2">
            <Eye className="w-4 h-4 shrink-0 text-blue-600" />
            <span className="font-medium">Principal View: Read-only access to faculty homework assignments across all classes.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeworks.map((hw) => (
              <div key={hw.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700">
                    {hw.subject} • Class {hw.class}-{hw.section}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      hw.priority === 'high'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {hw.priority} Priority
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{hw.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Assigned By: {hw.createdByTeacherName}</span>
                  <span>Due: {hw.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">School Circulars & Notices</h3>
            <button
              onClick={() => setShowNoticeModal(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Create Notice
            </button>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {n.category}
                  </span>
                  <button
                    onClick={() => handleDeleteNotice(n.id)}
                    className="text-rose-600 hover:text-rose-700 text-xs p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  Published by {n.createdByName} • Target: {n.targetRole.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Campus Events & Exhibition Calendar</h3>
            <button
              onClick={() => setShowEventModal(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Add Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <div key={e.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                {e.posterUrl && (
                  <img
                    src={e.posterUrl}
                    alt=""
                    className="w-full h-36 rounded-xl object-cover border border-slate-200"
                  />
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{e.title}</h4>
                  <div className="text-xs text-indigo-600 font-semibold mt-0.5">
                    {e.date} • {e.time}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Venue: {e.venue}</div>
                  <p className="text-xs text-slate-600 mt-2">{e.description}</p>
                </div>
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleDeleteEvent(e.id)}
                    className="text-rose-600 hover:text-rose-700 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: COMPLAINTS */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Student Complaint Box & Resolution Desk</h3>
            <button
              onClick={() => setShowCreateComplaintModal(true)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4 text-purple-600" /> Log Principal Complaint
            </button>
          </div>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {c.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {c.isAnonymous ? 'Submitted Anonymously' : `From: ${c.studentName}`}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      c.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : c.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700">{c.description}</p>

                {c.reply && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-indigo-900 space-y-0.5">
                    <div className="font-bold text-indigo-700">Official Reply ({c.repliedBy}):</div>
                    <div>{c.reply}</div>
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedComplaint(c);
                      setReplyText(c.reply || '');
                      setReplyStatus(c.status);
                    }}
                    className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Reply & Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: SOS ALERTS CENTER */}
      {activeTab === 'sos' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-1">
            <div className="font-bold text-rose-700 flex items-center gap-2">
              <Siren className="w-5 h-5 animate-pulse text-rose-600" />
              Emergency SOS Command Desk
            </div>
            <p>
              Teachers generate emergency alerts. The Principal updates status (Pending, In Progress, Resolved). Alert status updates in real-time across Teacher and Student dashboards.
            </p>
          </div>

          <div className="space-y-3">
            {sosAlerts.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white animate-pulse">
                      {a.category} SOS
                    </span>
                    <span className="text-xs font-bold text-slate-900">Location: {a.location}</span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      a.status === 'Resolved'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : a.status === 'In Progress'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>

                <p className="text-xs text-slate-700">{a.description}</p>
                <div className="text-[11px] text-slate-500">
                  Triggered by Faculty: {a.createdByTeacherName} at {a.createdAt}
                </div>

                {a.resolvedNote && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-800 font-medium">
                    Resolution Note: {a.resolvedNote}
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                  <button
                    onClick={() => handleUpdateSOSStatus(a.id, 'Pending')}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs hover:bg-rose-100 font-semibold"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateSOSStatus(a.id, 'In Progress')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs hover:bg-amber-100 font-semibold"
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateSOSStatus(a.id, 'Resolved')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs hover:bg-emerald-100 font-semibold"
                  >
                    Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        </main>
      </div>

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Add Faculty Member</h3>
            <form onSubmit={handleSaveTeacher} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Teacher Name *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.name}
                    onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Email *</label>
                  <input
                    type="email"
                    required
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Subject *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.subject}
                    onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Qualification</label>
                  <input
                    type="text"
                    value={teacherForm.qualification}
                    onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Classes (e.g. 6,7,8)</label>
                  <input
                    type="text"
                    value={teacherForm.classes}
                    onChange={(e) => setTeacherForm({ ...teacherForm, classes: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Sections (e.g. A,B)</label>
                  <input
                    type="text"
                    value={teacherForm.sections}
                    onChange={(e) => setTeacherForm({ ...teacherForm, sections: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-2xs"
                >
                  Save Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Notice Modal */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Publish School Circular Notice</h3>
            <form onSubmit={handleSaveNotice} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Title *</label>
                <input
                  type="text"
                  required
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Category</label>
                  <select
                    value={noticeForm.category}
                    onChange={(e: any) => setNoticeForm({ ...noticeForm, category: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    <option value="General">General</option>
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Sports">Sports</option>
                    <option value="Circular">Circular</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Target Audience</label>
                  <select
                    value={noticeForm.targetRole}
                    onChange={(e: any) => setNoticeForm({ ...noticeForm, targetRole: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    <option value="all">Everyone</option>
                    <option value="teachers">Teachers Only</option>
                    <option value="students">Students Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Notice Content *</label>
                <textarea
                  required
                  rows={4}
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNoticeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-2xs"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Reply to Complaint</h3>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <div className="font-bold text-amber-700 mb-1">Category: {selectedComplaint.category}</div>
              <p>{selectedComplaint.description}</p>
            </div>

            <form onSubmit={handleSaveReply} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Official Resolution Reply *</label>
                <textarea
                  required
                  rows={3}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type official reply and action taken..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Update Status</label>
                <select
                  value={replyStatus}
                  onChange={(e: any) => setReplyStatus(e.target.value)}
                  className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-2xs"
                >
                  Submit Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
