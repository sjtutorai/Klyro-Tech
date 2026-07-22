import React, { useState } from 'react';
import {
  BookOpen,
  UserPlus,
  Siren,
  Award,
  Calendar,
  Bell,
  Clock,
  Plus,
  Trash2,
  Edit2,
  AlertTriangle,
  FileText,
  Paperclip,
  CheckCircle2,
  Send,
  Users,
  Building2,
} from 'lucide-react';
import {
  Homework,
  Notice,
  EventItem,
  Complaint,
  SOSAlert,
  Achievement,
  TimetableEntry,
  Student,
  UserSession,
  SOSCategory,
} from '../../types';
import { dataService } from '../../services/dataService';

interface TeacherDashboardProps {
  session: UserSession;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ session }) => {
  const schoolId = session.schoolId;

  const [activeTab, setActiveTab] = useState<
    'my_classes' | 'homework' | 'sos' | 'achievements' | 'timetable' | 'notices' | 'events' | 'students'
  >('homework');

  // State
  const [homeworks, setHomeworks] = useState<Homework[]>(dataService.getHomeworks(schoolId));
  const [students, setStudents] = useState<Student[]>(dataService.getStudents(schoolId));
  const [notices, setNotices] = useState<Notice[]>(dataService.getNotices(schoolId));
  const [events, setEvents] = useState<EventItem[]>(dataService.getEvents(schoolId));
  const [sosAlerts, setSOSAlerts] = useState<SOSAlert[]>(dataService.getSOSAlerts(schoolId));
  const [achievements, setAchievements] = useState<Achievement[]>(dataService.getAchievements(schoolId));
  const [timetable, setTimetable] = useState<TimetableEntry[]>(dataService.getTimetable(schoolId));

  // Homework Modal State
  const [showHomeworkModal, setShowHomeworkModal] = useState(false);
  const [hwForm, setHwForm] = useState({
    title: '',
    subject: session.subject || 'English',
    class: '8',
    section: 'A',
    dueDate: '2026-07-28',
    priority: 'medium' as Homework['priority'],
    description: '',
    attachmentName: 'Assignment_Doc.pdf',
  });

  // Emergency SOS Generator State
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosCategory, setSOSCategory] = useState<SOSCategory>('Medical');
  const [sosLocation, setSOSLocation] = useState('Science Lab 1');
  const [sosDescription, setSOSDescription] = useState('');

  // Achievement Form State
  const [showAchModal, setShowAchModal] = useState(false);
  const [achForm, setAchForm] = useState({
    title: '',
    category: 'Academic' as Achievement['category'],
    studentName: 'Vihaan Patel',
    studentId: 'STU-1005',
    class: '10',
    section: 'A',
    description: '',
  });

  // Student Modal State
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [stuForm, setStuForm] = useState({
    name: '',
    class: '8',
    section: 'A',
    rollNo: '21',
    parentName: '',
    parentPhone: '',
  });

  const refreshData = () => {
    setHomeworks(dataService.getHomeworks(schoolId));
    setStudents(dataService.getStudents(schoolId));
    setNotices(dataService.getNotices(schoolId));
    setEvents(dataService.getEvents(schoolId));
    setSOSAlerts(dataService.getSOSAlerts(schoolId));
    setAchievements(dataService.getAchievements(schoolId));
  };

  // Create Homework
  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwForm.title || !hwForm.description) return;

    dataService.addHomework({
      schoolId,
      title: hwForm.title,
      subject: hwForm.subject,
      class: hwForm.class,
      section: hwForm.section,
      dueDate: hwForm.dueDate,
      priority: hwForm.priority,
      description: hwForm.description,
      attachmentName: hwForm.attachmentName,
      createdByTeacherName: session.name,
      createdByTeacherId: session.id,
    });

    setShowHomeworkModal(false);
    setHwForm({
      title: '',
      subject: session.subject || 'English',
      class: '8',
      section: 'A',
      dueDate: '2026-07-28',
      priority: 'medium',
      description: '',
      attachmentName: 'Assignment_Doc.pdf',
    });
    refreshData();
  };

  const handleDeleteHomework = (hwId: string) => {
    dataService.deleteHomework(hwId);
    refreshData();
  };

  // Trigger Emergency SOS
  const handleTriggerSOS = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sosLocation || !sosDescription) return;

    dataService.triggerSOSAlert({
      schoolId,
      category: sosCategory,
      location: sosLocation,
      description: sosDescription,
      createdByTeacherName: session.name,
      createdByTeacherId: session.id,
    });

    setShowSOSModal(false);
    setSOSDescription('');
    refreshData();
    alert(`EMERGENCY SOS ALERT ACTIVATED! Principal & School Staff Notified.`);
  };

  // Add Achievement
  const handleCreateAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title || !achForm.studentName) return;

    dataService.addAchievement({
      schoolId,
      title: achForm.title,
      category: achForm.category,
      studentName: achForm.studentName,
      studentId: achForm.studentId,
      class: achForm.class,
      section: achForm.section,
      date: new Date().toISOString().slice(0, 10),
      description: achForm.description,
      addedByTeacherName: session.name,
    });

    setShowAchModal(false);
    setAchForm({
      title: '',
      category: 'Academic',
      studentName: 'Vihaan Patel',
      studentId: 'STU-1005',
      class: '10',
      section: 'A',
      description: '',
    });
    refreshData();
  };

  // Add Student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stuForm.name) return;

    dataService.addStudent({
      schoolId,
      name: stuForm.name,
      class: stuForm.class,
      section: stuForm.section,
      rollNo: stuForm.rollNo,
      parentName: stuForm.parentName || 'Parent Name',
      parentPhone: stuForm.parentPhone || '+91 98888 77777',
    });

    setShowStudentModal(false);
    setStuForm({ name: '', class: '8', section: 'A', rollNo: '21', parentName: '', parentPhone: '' });
    refreshData();
  };

  const assignedClasses = session.classesAssigned || ['6', '7', '8'];
  const assignedSections = session.sectionsAssigned || ['A', 'B', 'C'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-900">
      {/* Teacher Profile Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-white border border-blue-200/80 text-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-blue-600" />
            Faculty Portal • {session.subject || 'Faculty Member'}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">{session.name}</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Assigned Classes: {assignedClasses.join(', ')} | Sections: {assignedSections.join(', ')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSOSModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs animate-pulse transition active:scale-95"
          >
            <Siren className="w-4 h-4" />
            TRIGGER SOS EMERGENCY
          </button>
          <button
            onClick={() => setShowHomeworkModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Create Homework
          </button>
        </div>
      </div>

      {/* Dashboard Cards Grid (Quick Nav) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <button
          onClick={() => setActiveTab('homework')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'homework'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <BookOpen className={`w-4 h-4 mb-2 ${activeTab === 'homework' ? 'text-white' : 'text-indigo-600'}`} />
          <div className="text-xs font-bold">Homework</div>
          <div className={`text-[10px] ${activeTab === 'homework' ? 'opacity-90' : 'text-slate-500'}`}>{homeworks.length} Active</div>
        </button>

        <button
          onClick={() => setActiveTab('sos')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'sos'
              ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Siren className={`w-4 h-4 mb-2 ${activeTab === 'sos' ? 'text-white' : 'text-rose-600'}`} />
          <div className="text-xs font-bold">SOS Alerts</div>
          <div className={`text-[10px] ${activeTab === 'sos' ? 'opacity-90' : 'text-slate-500'}`}>{sosAlerts.length} Alerts</div>
        </button>

        <button
          onClick={() => setActiveTab('achievements')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'achievements'
              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Award className={`w-4 h-4 mb-2 ${activeTab === 'achievements' ? 'text-white' : 'text-amber-600'}`} />
          <div className="text-xs font-bold">Achievements</div>
          <div className={`text-[10px] ${activeTab === 'achievements' ? 'opacity-90' : 'text-slate-500'}`}>{achievements.length} Badges</div>
        </button>

        <button
          onClick={() => setActiveTab('timetable')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'timetable'
              ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Clock className={`w-4 h-4 mb-2 ${activeTab === 'timetable' ? 'text-white' : 'text-purple-600'}`} />
          <div className="text-xs font-bold">Timetable</div>
          <div className={`text-[10px] ${activeTab === 'timetable' ? 'opacity-90' : 'text-slate-500'}`}>Weekly Schedule</div>
        </button>

        <button
          onClick={() => setActiveTab('notices')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'notices'
              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Bell className={`w-4 h-4 mb-2 ${activeTab === 'notices' ? 'text-white' : 'text-blue-600'}`} />
          <div className="text-xs font-bold">Notices</div>
          <div className={`text-[10px] ${activeTab === 'notices' ? 'opacity-90' : 'text-slate-500'}`}>{notices.length} Published</div>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'events'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Calendar className={`w-4 h-4 mb-2 ${activeTab === 'events' ? 'text-white' : 'text-emerald-600'}`} />
          <div className="text-xs font-bold">Events</div>
          <div className={`text-[10px] ${activeTab === 'events' ? 'opacity-90' : 'text-slate-500'}`}>{events.length} Upcoming</div>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            activeTab === 'students'
              ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
              : 'bg-white text-slate-700 border-slate-200/80 hover:bg-slate-50'
          }`}
        >
          <Users className={`w-4 h-4 mb-2 ${activeTab === 'students' ? 'text-white' : 'text-teal-600'}`} />
          <div className="text-xs font-bold">My Students</div>
          <div className={`text-[10px] ${activeTab === 'students' ? 'opacity-90' : 'text-slate-500'}`}>{students.length} Total</div>
        </button>
      </div>

      {/* TAB: HOMEWORK MODULE */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Created Homework Assignments</h3>
            <button
              onClick={() => setShowHomeworkModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
            >
              <Plus className="w-4 h-4" /> Create Homework
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {homeworks.map((hw) => (
              <div key={hw.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {hw.subject} • Class {hw.class}-{hw.section}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        hw.priority === 'high'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {hw.priority}
                    </span>
                    <button
                      onClick={() => handleDeleteHomework(hw.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">{hw.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{hw.description}</p>

                {hw.attachmentName && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                    <Paperclip className="w-3.5 h-3.5 text-indigo-600" />
                    {hw.attachmentName}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Due Date: {hw.dueDate}</span>
                  <span className="text-emerald-700 font-semibold">
                    {hw.completedByStudentIds.length} Submitted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: SOS ALERTS MODULE */}
      {activeTab === 'sos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Emergency SOS Status Log</h3>
            <button
              onClick={() => setShowSOSModal(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs"
            >
              <Siren className="w-4 h-4" /> Trigger New SOS
            </button>
          </div>

          <div className="space-y-3">
            {sosAlerts.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                      {a.category} SOS
                    </span>
                    <span className="text-xs font-bold text-slate-900">Location: {a.location}</span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
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
                {a.resolvedNote && (
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-800 font-medium">
                    Principal Note: {a.resolvedNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: ACHIEVEMENTS MODULE */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Student Achievements & Award Showcase</h3>
            <button
              onClick={() => setShowAchModal(true)}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Award className="w-4 h-4" /> Add Achievement
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {ach.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{ach.date}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{ach.title}</h4>
                <div className="text-xs text-indigo-700 font-semibold">
                  Awarded to: {ach.studentName} ({ach.studentId}) • Class {ach.class}-{ach.section}
                </div>
                <p className="text-xs text-slate-600">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: TIMETABLE MODULE */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Assigned Faculty Weekly Schedule</h3>
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5">Time Slot</th>
                  <th className="p-3.5">Class & Section</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetable.map((tt) => (
                  <tr key={tt.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-indigo-700">Period {tt.periodNumber}</td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">{tt.timeSlot}</td>
                    <td className="p-3.5 font-bold text-slate-900">Class {tt.class}-{tt.section}</td>
                    <td className="p-3.5 text-purple-700 font-semibold">{tt.subject}</td>
                    <td className="p-3.5 text-slate-600">{tt.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: STUDENTS MODULE */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Student Enrollment & Management</h3>
            <button
              onClick={() => setShowStudentModal(true)}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <UserPlus className="w-4 h-4" /> Enroll New Student
            </button>
          </div>

          <div className="border border-slate-200/80 rounded-2xl overflow-x-auto bg-white shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Student ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Class</th>
                  <th className="p-3.5">Section</th>
                  <th className="p-3.5">Roll No</th>
                  <th className="p-3.5">Parent Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-mono font-bold text-teal-700">{s.studentId}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3.5">{s.class}</td>
                    <td className="p-3.5">{s.section}</td>
                    <td className="p-3.5">{s.rollNo}</td>
                    <td className="p-3.5 text-slate-600">{s.parentPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Homework Modal */}
      {showHomeworkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Assign New Homework</h3>
            <form onSubmit={handleCreateHomework} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Homework Title *</label>
                <input
                  type="text"
                  required
                  value={hwForm.title}
                  onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                  placeholder="e.g. Essay on Renewable Energy"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Class</label>
                  <select
                    value={hwForm.class}
                    onChange={(e) => setHwForm({ ...hwForm, class: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    {assignedClasses.map((c) => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Section</label>
                  <select
                    value={hwForm.section}
                    onChange={(e) => setHwForm({ ...hwForm, section: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    {assignedSections.map((s) => (
                      <option key={s} value={s}>Section {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Priority</label>
                  <select
                    value={hwForm.priority}
                    onChange={(e: any) => setHwForm({ ...hwForm, priority: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Due Date</label>
                <input
                  type="date"
                  value={hwForm.dueDate}
                  onChange={(e) => setHwForm({ ...hwForm, dueDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Instructions & Description *</label>
                <textarea
                  required
                  rows={3}
                  value={hwForm.description}
                  onChange={(e) => setHwForm({ ...hwForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowHomeworkModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-2xs"
                >
                  Assign Homework
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trigger SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-rose-300 p-6 space-y-4 text-slate-900 shadow-2xl">
            <div className="flex items-center gap-2 text-rose-600 font-extrabold text-lg animate-pulse">
              <Siren className="w-6 h-6" />
              TRIGGER CAMPUS EMERGENCY SOS
            </div>
            <p className="text-xs text-slate-600">
              Generating an SOS immediately notifies the Principal, school administrators, and safety marshals.
            </p>

            <form onSubmit={handleTriggerSOS} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Emergency Category *</label>
                <select
                  value={sosCategory}
                  onChange={(e: any) => setSOSCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-rose-200 text-slate-900 font-semibold focus:outline-none"
                >
                  <option value="Medical">Medical Emergency</option>
                  <option value="Fire">Fire Hazard</option>
                  <option value="Electricity">Electrical Hazard</option>
                  <option value="Violence">Student Conflict / Violence</option>
                  <option value="Emergency">General Emergency</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Specific Location *</label>
                <input
                  type="text"
                  required
                  value={sosLocation}
                  onChange={(e) => setSOSLocation(e.target.value)}
                  placeholder="e.g. Science Lab 1, 2nd Floor Block B"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Situation Details *</label>
                <textarea
                  required
                  rows={3}
                  value={sosDescription}
                  onChange={(e) => setSOSDescription(e.target.value)}
                  placeholder="Describe urgent situation..."
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-rose-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSOSModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider shadow-2xs"
                >
                  SEND SOS ALERT NOW
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Achievement Modal */}
      {showAchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Award Student Achievement</h3>
            <form onSubmit={handleCreateAchievement} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Achievement Title *</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  placeholder="e.g. 1st Rank State Science Olympiad"
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Category</label>
                  <select
                    value={achForm.category}
                    onChange={(e: any) => setAchForm({ ...achForm, category: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Attendance">Attendance</option>
                    <option value="Competition">Competition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Student Name *</label>
                  <input
                    type="text"
                    required
                    value={achForm.studentName}
                    onChange={(e) => setAchForm({ ...achForm, studentName: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Description</label>
                <textarea
                  rows={3}
                  value={achForm.description}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAchModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-2xs"
                >
                  Award Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Enroll Student</h3>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={stuForm.name}
                  onChange={(e) => setStuForm({ ...stuForm, name: e.target.value })}
                  className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Class</label>
                  <input
                    type="text"
                    value={stuForm.class}
                    onChange={(e) => setStuForm({ ...stuForm, class: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Section</label>
                  <input
                    type="text"
                    value={stuForm.section}
                    onChange={(e) => setStuForm({ ...stuForm, section: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Roll No</label>
                  <input
                    type="text"
                    value={stuForm.rollNo}
                    onChange={(e) => setStuForm({ ...stuForm, rollNo: e.target.value })}
                    className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-2xs"
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
