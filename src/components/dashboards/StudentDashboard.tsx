import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  Bell,
  Clock,
  Award,
  MessageSquare,
  Siren,
  Search,
  CheckCircle2,
  Circle,
  Paperclip,
  Plus,
  Lock,
  UserCheck,
  Eye,
  Send,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Homework,
  Notice,
  EventItem,
  Complaint,
  SOSAlert,
  Achievement,
  TimetableEntry,
  UserSession,
  ComplaintCategory,
} from '../../types';
import { dataService } from '../../services/dataService';

interface StudentDashboardProps {
  session: UserSession;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ session }) => {
  const schoolId = session.schoolId;
  const studentId = session.studentId || 'STU-1021';
  const studentClass = session.class || '8';
  const studentSection = session.section || 'A';

  const [activeTab, setActiveTab] = useState<
    'homework' | 'notices' | 'events' | 'timetable' | 'achievements' | 'complaints'
  >('homework');

  // Search & Filters
  const [hwSearch, setHwSearch] = useState('');
  const [hwSubjectFilter, setHwSubjectFilter] = useState('all');

  // State
  const [homeworks, setHomeworks] = useState<Homework[]>(dataService.getHomeworks(schoolId));
  const [notices] = useState<Notice[]>(dataService.getNotices(schoolId));
  const [events] = useState<EventItem[]>(dataService.getEvents(schoolId));
  const [achievements] = useState<Achievement[]>(dataService.getAchievements(schoolId));
  const [timetable] = useState<TimetableEntry[]>(
    dataService.getTimetable(schoolId, studentClass, studentSection)
  );
  const [complaints, setComplaints] = useState<Complaint[]>(dataService.getComplaints(schoolId));
  const [sosAlerts] = useState<SOSAlert[]>(dataService.getSOSAlerts(schoolId));

  // Complaint Form State
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [complaintCategory, setComplaintCategory] = useState<ComplaintCategory>('Broken Furniture');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const refreshData = () => {
    setHomeworks(dataService.getHomeworks(schoolId));
    setComplaints(dataService.getComplaints(schoolId));
  };

  const handleToggleHomework = (hwId: string) => {
    dataService.toggleHomeworkCompletion(hwId, studentId);
    refreshData();

    // Fire Confetti!
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  const handleSaveComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDesc) return;

    dataService.addComplaint({
      schoolId,
      category: complaintCategory,
      description: complaintDesc,
      isAnonymous,
      studentName: isAnonymous ? undefined : session.name,
      studentId: isAnonymous ? undefined : studentId,
    });

    setShowComplaintModal(false);
    setComplaintDesc('');
    refreshData();
    alert('Complaint submitted securely! You can track status in real-time.');
  };

  // Filtered Homeworks
  const myClassHomeworks = homeworks.filter(
    (h) => h.class === studentClass && h.section === studentSection
  );

  const filteredHomeworks = myClassHomeworks.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(hwSearch.toLowerCase()) ||
      h.description.toLowerCase().includes(hwSearch.toLowerCase());
    const matchesSubject = hwSubjectFilter === 'all' || h.subject === hwSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  const subjectsList = Array.from(new Set(myClassHomeworks.map((h) => h.subject)));

  // Active Emergency SOS Notice
  const activeSOS = sosAlerts.find((a) => a.status !== 'Resolved');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-slate-900">
      {/* Active Campus SOS Emergency Status Bar */}
      {activeSOS && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3 animate-pulse shadow-2xs">
          <div className="flex items-center gap-2.5 font-bold">
            <Siren className="w-5 h-5 text-rose-600" />
            <span>
              EMERGENCY SOS ACTIVE: {activeSOS.category} at {activeSOS.location} (Status: {activeSOS.status})
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 font-mono text-rose-800 font-semibold border border-rose-200">
            Faculty Incident Desk
          </span>
        </div>
      )}

      {/* Student Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200/80 text-slate-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            Student Digital Portal
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">Welcome, {session.name}!</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Class {studentClass}-{studentSection} | Student ID: {studentId} | Roll No: {session.rollNo || '12'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 text-right shadow-2xs">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Attendance</div>
            <div className="text-sm font-extrabold text-emerald-700">96.5%</div>
          </div>
          <button
            onClick={() => setShowComplaintModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-2xs transition"
          >
            <MessageSquare className="w-4 h-4" />
            Submit Complaint
          </button>
        </div>
      </div>

      {/* Sidebar + Main Content Layout */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Icon-Only Navigation Sidebar */}
        <aside className="w-full md:w-16 flex-shrink-0 flex md:flex-col gap-2.5 p-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs sticky top-20 z-20 overflow-x-auto md:overflow-visible">
          {/* Homework Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('homework')}
              title={`Homework (${myClassHomeworks.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'homework'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              {myClassHomeworks.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'homework' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {myClassHomeworks.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Homework Assignments</span>
                <span className="text-emerald-300 font-mono text-[11px]">({myClassHomeworks.length})</span>
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
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Bell className="w-5 h-5" />
              {notices.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'notices' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {notices.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>Notice Bulletin</span>
                <span className="text-emerald-300 font-mono text-[11px]">({notices.length})</span>
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
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Calendar className="w-5 h-5" />
              {events.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'events' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {events.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>School Events</span>
                <span className="text-emerald-300 font-mono text-[11px]">({events.length})</span>
              </div>
            </div>
          </div>

          {/* Timetable Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('timetable')}
              title="Class Timetable"
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'timetable'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Clock className="w-5 h-5" />
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                Class Timetable
              </div>
            </div>
          </div>

          {/* Achievements Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('achievements')}
              title={`Achievements (${achievements.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <Award className="w-5 h-5" />
              {achievements.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'achievements' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {achievements.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>My Badges & Badges</span>
                <span className="text-emerald-300 font-mono text-[11px]">({achievements.length})</span>
              </div>
            </div>
          </div>

          {/* Complaints Tab */}
          <div className="relative group flex justify-center">
            <button
              onClick={() => setActiveTab('complaints')}
              title={`My Complaints (${complaints.length})`}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                activeTab === 'complaints'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              {complaints.length > 0 && (
                <span className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold border-2 border-white flex items-center justify-center ${
                  activeTab === 'complaints' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-600 text-white'
                }`}>
                  {complaints.length}
                </span>
              )}
            </button>
            <div className="absolute left-14 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center z-50 pointer-events-none">
              <div className="bg-slate-900 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex items-center gap-1.5">
                <span>My Complaints</span>
                <span className="text-emerald-300 font-mono text-[11px]">({complaints.length})</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dashboard Main Content Area */}
        <main className="flex-1 min-w-0 w-full space-y-6">

      {/* TAB 1: HOMEWORK HUB */}
      {activeTab === 'homework' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-extrabold text-slate-900">Assigned Homework Tasks</h3>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={hwSearch}
                  onChange={(e) => setHwSearch(e.target.value)}
                  placeholder="Search homework..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-indigo-600 w-40 sm:w-56"
                />
              </div>

              <select
                value={hwSubjectFilter}
                onChange={(e) => setHwSubjectFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none"
              >
                <option value="all">All Subjects</option>
                {subjectsList.map((subj) => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHomeworks.map((hw) => {
              const isDone = hw.completedByStudentIds.includes(studentId);
              return (
                <div
                  key={hw.id}
                  className={`p-4 rounded-2xl border transition shadow-2xs ${
                    isDone
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {hw.subject}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                        hw.priority === 'high' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {hw.priority} Priority
                    </span>
                  </div>

                  <h4 className={`font-bold text-sm mt-2 ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {hw.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">{hw.description}</p>

                  {hw.attachmentName && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] text-slate-700 mt-2">
                      <Paperclip className="w-3 h-3 text-indigo-600" />
                      {hw.attachmentName}
                    </div>
                  )}

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 mt-3">
                    <span>Due Date: {hw.dueDate}</span>
                    <button
                      onClick={() => handleToggleHomework(hw.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5" /> Mark Completed
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">School Notice Board</h3>
          <div className="space-y-3">
            {notices.map((n) => (
              <div key={n.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{n.createdAt.slice(0, 10)}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <div className="text-[10px] text-slate-400 pt-1 font-medium">From: {n.createdByName}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EVENTS */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Campus Events & Exhibition Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <div key={e.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
                {e.posterUrl && (
                  <img src={e.posterUrl} alt="" className="w-full h-36 rounded-xl object-cover" />
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{e.title}</h4>
                  <div className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {e.date} • {e.time}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">Venue: {e.venue}</div>
                  <p className="text-xs text-slate-600 mt-2">{e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Class {studentClass}-{studentSection} Weekly Timetable</h3>
          <div className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-600 font-semibold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Period</th>
                  <th className="p-3.5">Time Slot</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Faculty</th>
                  <th className="p-3.5">Room</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetable.map((tt) => (
                  <tr key={tt.id} className="hover:bg-slate-50/60">
                    <td className="p-3.5 font-bold text-emerald-700">Period {tt.periodNumber}</td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">{tt.timeSlot}</td>
                    <td className="p-3.5 font-bold text-slate-900">{tt.subject}</td>
                    <td className="p-3.5 text-indigo-700 font-semibold">{tt.teacherName}</td>
                    <td className="p-3.5 text-slate-600">{tt.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Student Achievements Showcase</h3>
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
                <div className="text-xs text-emerald-700 font-semibold">
                  {ach.studentName} ({ach.studentId}) • Class {ach.class}-{ach.section}
                </div>
                <p className="text-xs text-slate-600">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: COMPLAINT BOX & STATUS TRACKER */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">My Submitted Complaints & Tracking</h3>
            <button
              onClick={() => setShowComplaintModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
            >
              <Plus className="w-4 h-4" /> Submit Complaint
            </button>
          </div>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {c.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {c.isAnonymous ? 'Submitted Anonymously' : `By ${c.studentName}`}
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

                {c.reply ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-emerald-800 space-y-1">
                    <div className="font-bold text-emerald-900">Official Reply ({c.repliedBy}):</div>
                    <div>{c.reply}</div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 italic font-medium">Awaiting Principal Review</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
        </main>
      </div>

      {/* Submit Complaint Modal */}
      {showComplaintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 space-y-4 text-slate-900 shadow-2xl">
            <h3 className="text-lg font-extrabold flex items-center gap-2 text-indigo-700">
              <MessageSquare className="w-5 h-5" />
              Submit Campus Complaint / Feedback
            </h3>

            <form onSubmit={handleSaveComplaint} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Complaint Category *</label>
                <select
                  value={complaintCategory}
                  onChange={(e: any) => setComplaintCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                >
                  <option value="Bullying">Bullying</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Dirty Classroom">Dirty Classroom</option>
                  <option value="Broken Furniture">Broken Furniture</option>
                  <option value="Water Problem">Water Problem</option>
                  <option value="Electricity">Electricity Issue</option>
                  <option value="Teacher Feedback">Teacher Feedback</option>
                  <option value="Suggestions">Suggestions</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1 font-semibold">Description *</label>
                <textarea
                  required
                  rows={4}
                  value={complaintDesc}
                  onChange={(e) => setComplaintDesc(e.target.value)}
                  placeholder="Describe problem clearly..."
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              {/* Anonymity Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Submission Identity Mode</div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {isAnonymous
                      ? 'Your name and student ID will be strictly hidden.'
                      : 'Your name will be visible to Principal.'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    isAnonymous
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {isAnonymous ? <Lock className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                  {isAnonymous ? 'Submit Anonymously' : 'Display My Name'}
                </button>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowComplaintModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-2xs"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
