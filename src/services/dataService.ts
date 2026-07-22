import {
  School,
  Teacher,
  Student,
  Homework,
  Notice,
  EventItem,
  Complaint,
  SOSAlert,
  Achievement,
  TimetableEntry,
  SystemNotification,
  ActivityLog,
  UserSession,
  IssueStatus,
} from '../types';
import {
  DEMO_SCHOOL,
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  INITIAL_HOMEWORKS,
  INITIAL_NOTICES,
  INITIAL_EVENTS,
  INITIAL_COMPLAINTS,
  INITIAL_SOS_ALERTS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_TIMETABLES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
  SUPER_ADMIN_EMAILS,
} from '../data/initialData';

const STORAGE_KEYS = {
  SCHOOLS: 'klyro_schools_v1',
  TEACHERS: 'klyro_teachers_v1',
  STUDENTS: 'klyro_students_v1',
  HOMEWORKS: 'klyro_homeworks_v1',
  NOTICES: 'klyro_notices_v1',
  EVENTS: 'klyro_events_v1',
  COMPLAINTS: 'klyro_complaints_v1',
  SOS_ALERTS: 'klyro_sos_v1',
  ACHIEVEMENTS: 'klyro_achievements_v1',
  TIMETABLES: 'klyro_timetables_v1',
  NOTIFICATIONS: 'klyro_notifications_v1',
  ACTIVITY_LOGS: 'klyro_activity_logs_v1',
  CURRENT_SESSION: 'klyro_session_v1',
};

class DataService {
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.initializeDefaults();
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  private getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      this.notify();
    } catch (e) {
      console.error('LocalStorage error', e);
    }
  }

  public initializeDefaults() {
    if (!localStorage.getItem(STORAGE_KEYS.SCHOOLS)) {
      this.setItem(STORAGE_KEYS.SCHOOLS, [DEMO_SCHOOL]);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TEACHERS)) {
      this.setItem(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STUDENTS)) {
      this.setItem(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.HOMEWORKS)) {
      this.setItem(STORAGE_KEYS.HOMEWORKS, INITIAL_HOMEWORKS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTICES)) {
      this.setItem(STORAGE_KEYS.NOTICES, INITIAL_NOTICES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      this.setItem(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COMPLAINTS)) {
      this.setItem(STORAGE_KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.SOS_ALERTS)) {
      this.setItem(STORAGE_KEYS.SOS_ALERTS, INITIAL_SOS_ALERTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
      this.setItem(STORAGE_KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TIMETABLES)) {
      this.setItem(STORAGE_KEYS.TIMETABLES, INITIAL_TIMETABLES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
      this.setItem(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS)) {
      this.setItem(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
    }
  }

  // Session
  public getSession(): UserSession | null {
    return this.getItem<UserSession | null>(STORAGE_KEYS.CURRENT_SESSION, null);
  }

  public setSession(session: UserSession | null) {
    this.setItem(STORAGE_KEYS.CURRENT_SESSION, session);
  }

  // Schools
  public getSchools(): School[] {
    return this.getItem<School[]>(STORAGE_KEYS.SCHOOLS, [DEMO_SCHOOL]);
  }

  public getSchoolByRegisterNumber(regNum: string): School | undefined {
    return this.getSchools().find(
      (s) => s.registerNumber.toUpperCase() === regNum.trim().toUpperCase()
    );
  }

  // Uniqueness validation helpers
  public isUdiseCodeTaken(udiseCode: string, excludeSchoolId?: string): boolean {
    const code = udiseCode.trim().toLowerCase();
    if (!code) return false;
    return this.getSchools().some((s) => s.id !== excludeSchoolId && s.udiseCode.trim().toLowerCase() === code);
  }

  public isSchoolEmailTaken(email: string, excludeSchoolId?: string): boolean {
    const mail = email.trim().toLowerCase();
    if (!mail) return false;
    return this.getSchools().some((s) => s.id !== excludeSchoolId && s.email.trim().toLowerCase() === mail);
  }

  public isPrincipalEmailTaken(email: string, excludeSchoolId?: string): boolean {
    const mail = email.trim().toLowerCase();
    if (!mail) return false;
    return this.getSchools().some((s) => s.id !== excludeSchoolId && s.principalEmail.trim().toLowerCase() === mail);
  }

  public isTeacherEmailTakenGlobally(email: string): boolean {
    const mail = email.trim().toLowerCase();
    if (!mail) return false;
    return this.getTeachers().some((t) => t.email.trim().toLowerCase() === mail);
  }

  public registerSchool(
    schoolData: Omit<
      School,
      'id' | 'registerNumber' | 'status' | 'createdAt' | 'totalTeachers' | 'totalStudents'
    >,
    initialTeachers: Omit<Teacher, 'id' | 'schoolId' | 'createdAt'>[]
  ): { school: School; tempPassword: string } {
    const schools = this.getSchools();
    const count = schools.length + 1;
    const registerNumber = `NXS-2026-${count.toString().padStart(4, '0')}`;
    const newSchoolId = `sch_${Date.now()}`;

    const newSchool: School = {
      ...schoolData,
      id: newSchoolId,
      registerNumber,
      status: 'active',
      createdAt: new Date().toISOString(),
      totalTeachers: initialTeachers.length,
      totalStudents: 0,
    };

    const teachers = this.getTeachers();
    const newTeachersList: Teacher[] = initialTeachers.map((t, idx) => ({
      ...t,
      id: `tch_${Date.now()}_${idx}`,
      schoolId: newSchoolId,
      createdAt: new Date().toISOString(),
    }));

    this.setItem(STORAGE_KEYS.SCHOOLS, [newSchool, ...schools]);
    this.setItem(STORAGE_KEYS.TEACHERS, [...newTeachersList, ...teachers]);

    this.logActivity(
      'System',
      'Principal',
      `Registered new school ${newSchool.name} (${newSchool.registerNumber})`,
      newSchoolId
    );

    return {
      school: newSchool,
      tempPassword: newSchool.udiseCode,
    };
  }

  public updateSchoolStatus(schoolId: string, status: 'active' | 'suspended') {
    const schools = this.getSchools().map((s) => (s.id === schoolId ? { ...s, status } : s));
    this.setItem(STORAGE_KEYS.SCHOOLS, schools);
    this.logActivity('Super Admin', 'VASCORE Labs', `Updated school ${schoolId} status to ${status}`);
  }

  public deleteSchool(schoolId: string) {
    const schools = this.getSchools().filter((s) => s.id !== schoolId);
    this.setItem(STORAGE_KEYS.SCHOOLS, schools);
    this.logActivity('Super Admin', 'VASCORE Labs', `Deleted school ID ${schoolId}`);
  }

  // Teachers
  public getTeachers(schoolId?: string): Teacher[] {
    const teachers = this.getItem<Teacher[]>(STORAGE_KEYS.TEACHERS, []);
    return schoolId ? teachers.filter((t) => t.schoolId === schoolId) : teachers;
  }

  public addTeacher(teacher: Omit<Teacher, 'id' | 'createdAt'>): Teacher {
    const teachers = this.getTeachers();
    const newTeacher: Teacher = {
      ...teacher,
      id: `tch_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.TEACHERS, [newTeacher, ...teachers]);

    // Update teacher count
    const schools = this.getSchools().map((s) =>
      s.id === teacher.schoolId ? { ...s, totalTeachers: s.totalTeachers + 1 } : s
    );
    this.setItem(STORAGE_KEYS.SCHOOLS, schools);

    this.logActivity(
      'Principal',
      'Principal',
      `Added new teacher ${newTeacher.name} (${newTeacher.subject})`,
      teacher.schoolId
    );

    return newTeacher;
  }

  public updateTeacher(teacherId: string, updates: Partial<Teacher>) {
    const teachers = this.getTeachers().map((t) => (t.id === teacherId ? { ...t, ...updates } : t));
    this.setItem(STORAGE_KEYS.TEACHERS, teachers);
  }

  public deleteTeacher(teacherId: string, schoolId: string) {
    const teachers = this.getTeachers().filter((t) => t.id !== teacherId);
    this.setItem(STORAGE_KEYS.TEACHERS, teachers);

    const schools = this.getSchools().map((s) =>
      s.id === schoolId ? { ...s, totalTeachers: Math.max(0, s.totalTeachers - 1) } : s
    );
    this.setItem(STORAGE_KEYS.SCHOOLS, schools);
  }

  // Students
  public getStudents(schoolId?: string): Student[] {
    const students = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    return schoolId ? students.filter((s) => s.schoolId === schoolId) : students;
  }

  public addStudent(student: Omit<Student, 'id' | 'studentId' | 'createdAt'>): Student {
    const students = this.getStudents();
    const nextNum = 1000 + students.length + 1;
    const studentId = `STU-${nextNum}`;

    const newStudent: Student = {
      ...student,
      id: `stu_${Date.now()}`,
      studentId,
      createdAt: new Date().toISOString(),
    };

    this.setItem(STORAGE_KEYS.STUDENTS, [newStudent, ...students]);

    const schools = this.getSchools().map((s) =>
      s.id === student.schoolId ? { ...s, totalStudents: s.totalStudents + 1 } : s
    );
    this.setItem(STORAGE_KEYS.SCHOOLS, schools);

    return newStudent;
  }

  public updateStudent(studentId: string, updates: Partial<Student>) {
    const students = this.getStudents().map((s) => (s.id === studentId ? { ...s, ...updates } : s));
    this.setItem(STORAGE_KEYS.STUDENTS, students);
  }

  // Homeworks
  public getHomeworks(schoolId?: string): Homework[] {
    const hws = this.getItem<Homework[]>(STORAGE_KEYS.HOMEWORKS, []);
    return schoolId ? hws.filter((h) => h.schoolId === schoolId) : hws;
  }

  public addHomework(hw: Omit<Homework, 'id' | 'completedByStudentIds' | 'createdAt'>): Homework {
    const hws = this.getHomeworks();
    const newHw: Homework = {
      ...hw,
      id: `hw_${Date.now()}`,
      completedByStudentIds: [],
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.HOMEWORKS, [newHw, ...hws]);
    this.logActivity(
      hw.createdByTeacherName,
      'Teacher',
      `Assigned homework '${hw.title}' for Class ${hw.class}-${hw.section}`,
      hw.schoolId
    );
    return newHw;
  }

  public toggleHomeworkCompletion(hwId: string, studentId: string) {
    const hws = this.getHomeworks().map((h) => {
      if (h.id === hwId) {
        const completed = h.completedByStudentIds.includes(studentId);
        const updatedIds = completed
          ? h.completedByStudentIds.filter((id) => id !== studentId)
          : [...h.completedByStudentIds, studentId];
        return { ...h, completedByStudentIds: updatedIds };
      }
      return h;
    });
    this.setItem(STORAGE_KEYS.HOMEWORKS, hws);
  }

  public deleteHomework(hwId: string) {
    const hws = this.getHomeworks().filter((h) => h.id !== hwId);
    this.setItem(STORAGE_KEYS.HOMEWORKS, hws);
  }

  // Notices
  public getNotices(schoolId?: string): Notice[] {
    const notices = this.getItem<Notice[]>(STORAGE_KEYS.NOTICES, []);
    return schoolId
      ? notices.filter((n) => n.schoolId === schoolId || n.schoolId === 'ALL')
      : notices;
  }

  public addNotice(notice: Omit<Notice, 'id' | 'createdAt'>): Notice {
    const notices = this.getItem<Notice[]>(STORAGE_KEYS.NOTICES, []);
    const newNotice: Notice = {
      ...notice,
      id: `not_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.NOTICES, [newNotice, ...notices]);
    this.logActivity(
      notice.createdByName,
      notice.createdByRole,
      `Published notice: '${notice.title}'`,
      notice.schoolId
    );
    return newNotice;
  }

  public deleteNotice(noticeId: string) {
    const notices = this.getItem<Notice[]>(STORAGE_KEYS.NOTICES, []).filter((n) => n.id !== noticeId);
    this.setItem(STORAGE_KEYS.NOTICES, notices);
  }

  // Events
  public getEvents(schoolId?: string): EventItem[] {
    const events = this.getItem<EventItem[]>(STORAGE_KEYS.EVENTS, []);
    return schoolId ? events.filter((e) => e.schoolId === schoolId) : events;
  }

  public addEvent(evt: Omit<EventItem, 'id' | 'isArchived' | 'createdAt'>): EventItem {
    const events = this.getEvents();
    const newEvent: EventItem = {
      ...evt,
      id: `evt_${Date.now()}`,
      isArchived: false,
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.EVENTS, [newEvent, ...events]);
    return newEvent;
  }

  public deleteEvent(eventId: string) {
    const events = this.getEvents().filter((e) => e.id !== eventId);
    this.setItem(STORAGE_KEYS.EVENTS, events);
  }

  // Complaints
  public getComplaints(schoolId?: string): Complaint[] {
    const complaints = this.getItem<Complaint[]>(STORAGE_KEYS.COMPLAINTS, []);
    return schoolId ? complaints.filter((c) => c.schoolId === schoolId) : complaints;
  }

  public addComplaint(complaint: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Complaint {
    const complaints = this.getComplaints();
    const newComplaint: Complaint = {
      ...complaint,
      id: `cmp_${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.COMPLAINTS, [newComplaint, ...complaints]);
    this.logActivity(
      complaint.isAnonymous ? 'Anonymous Student' : complaint.studentName || 'Student',
      'Student',
      `Submitted complaint under category '${complaint.category}'`,
      complaint.schoolId
    );
    return newComplaint;
  }

  public replyToComplaint(complaintId: string, reply: string, repliedBy: string, status: IssueStatus) {
    const complaints = this.getComplaints().map((c) => {
      if (c.id === complaintId) {
        return {
          ...c,
          reply,
          repliedBy,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });
    this.setItem(STORAGE_KEYS.COMPLAINTS, complaints);
  }

  // SOS Alerts
  public getSOSAlerts(schoolId?: string): SOSAlert[] {
    const alerts = this.getItem<SOSAlert[]>(STORAGE_KEYS.SOS_ALERTS, []);
    return schoolId ? alerts.filter((a) => a.schoolId === schoolId) : alerts;
  }

  public triggerSOSAlert(alert: Omit<SOSAlert, 'id' | 'status' | 'createdAt' | 'updatedAt'>): SOSAlert {
    const alerts = this.getSOSAlerts();
    const newAlert: SOSAlert = {
      ...alert,
      id: `sos_${Date.now()}`,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.SOS_ALERTS, [newAlert, ...alerts]);

    // Push system notification
    this.addNotification({
      schoolId: alert.schoolId,
      targetRole: 'all',
      title: `URGENT SOS ALERT: ${alert.category}`,
      message: `${alert.createdByTeacherName} reported emergency at ${alert.location}`,
      type: 'alert',
      read: false,
    });

    this.logActivity(
      alert.createdByTeacherName,
      'Teacher',
      `EMERGENCY SOS Triggered: ${alert.category} at ${alert.location}`,
      alert.schoolId
    );

    return newAlert;
  }

  public updateSOSStatus(alertId: string, status: IssueStatus, resolvedNote?: string) {
    const alerts = this.getSOSAlerts().map((a) => {
      if (a.id === alertId) {
        return {
          ...a,
          status,
          resolvedNote: resolvedNote || a.resolvedNote,
          updatedAt: new Date().toISOString(),
        };
      }
      return a;
    });
    this.setItem(STORAGE_KEYS.SOS_ALERTS, alerts);
  }

  // Achievements
  public getAchievements(schoolId?: string): Achievement[] {
    const achievements = this.getItem<Achievement[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
    return schoolId ? achievements.filter((a) => a.schoolId === schoolId) : achievements;
  }

  public addAchievement(ach: Omit<Achievement, 'id' | 'createdAt'>): Achievement {
    const achievements = this.getAchievements();
    const newAch: Achievement = {
      ...ach,
      id: `ach_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.ACHIEVEMENTS, [newAch, ...achievements]);
    return newAch;
  }

  // Timetables
  public getTimetable(schoolId: string, className?: string, section?: string): TimetableEntry[] {
    const timetables = this.getItem<TimetableEntry[]>(STORAGE_KEYS.TIMETABLES, []);
    return timetables.filter((t) => {
      const matchSchool = t.schoolId === schoolId;
      const matchClass = !className || t.class === className;
      const matchSection = !section || t.section === section;
      return matchSchool && matchClass && matchSection;
    });
  }

  // Notifications
  public getNotifications(schoolId: string, role: string): SystemNotification[] {
    const notifications = this.getItem<SystemNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return notifications.filter(
      (n) => n.schoolId === schoolId && (n.targetRole === 'all' || n.targetRole === role)
    );
  }

  public addNotification(ntf: Omit<SystemNotification, 'id' | 'createdAt'>) {
    const ntfs = this.getItem<SystemNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNtf: SystemNotification = {
      ...ntf,
      id: `ntf_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.NOTIFICATIONS, [newNtf, ...ntfs]);
  }

  // Activity Logs
  public getActivityLogs(schoolId?: string): ActivityLog[] {
    const logs = this.getItem<ActivityLog[]>(STORAGE_KEYS.ACTIVITY_LOGS, []);
    return schoolId ? logs.filter((l) => !l.schoolId || l.schoolId === schoolId) : logs;
  }

  public logActivity(actorName: string, actorRole: string, action: string, schoolId?: string) {
    const logs = this.getActivityLogs();
    const newLog: ActivityLog = {
      id: `log_${Date.now()}`,
      schoolId,
      actorName,
      actorRole,
      action,
      timestamp: new Date().toLocaleString(),
    };
    this.setItem(STORAGE_KEYS.ACTIVITY_LOGS, [newLog, ...logs].slice(0, 50));
  }

  // Backup & Restore
  public exportDatabaseJSON(): string {
    const data = {
      schools: this.getSchools(),
      teachers: this.getTeachers(),
      students: this.getStudents(),
      homeworks: this.getHomeworks(),
      notices: this.getNotices(),
      events: this.getEvents(),
      complaints: this.getComplaints(),
      sosAlerts: this.getSOSAlerts(),
      achievements: this.getAchievements(),
      timetables: this.getItem(STORAGE_KEYS.TIMETABLES, []),
      activityLogs: this.getActivityLogs(),
    };
    return JSON.stringify(data, null, 2);
  }

  public restoreDatabaseJSON(jsonStr: string): boolean {
    try {
      const data = JSON.parse(jsonStr);
      if (data.schools) this.setItem(STORAGE_KEYS.SCHOOLS, data.schools);
      if (data.teachers) this.setItem(STORAGE_KEYS.TEACHERS, data.teachers);
      if (data.students) this.setItem(STORAGE_KEYS.STUDENTS, data.students);
      if (data.homeworks) this.setItem(STORAGE_KEYS.HOMEWORKS, data.homeworks);
      if (data.notices) this.setItem(STORAGE_KEYS.NOTICES, data.notices);
      if (data.events) this.setItem(STORAGE_KEYS.EVENTS, data.events);
      if (data.complaints) this.setItem(STORAGE_KEYS.COMPLAINTS, data.complaints);
      if (data.sosAlerts) this.setItem(STORAGE_KEYS.SOS_ALERTS, data.sosAlerts);
      if (data.achievements) this.setItem(STORAGE_KEYS.ACHIEVEMENTS, data.achievements);
      return true;
    } catch {
      return false;
    }
  }

  public resetToDefaultDemo() {
    localStorage.clear();
    this.initializeDefaults();
    this.notify();
  }
}

export const dataService = new DataService();
