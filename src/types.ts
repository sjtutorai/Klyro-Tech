export type UserRole = 'super_admin' | 'principal' | 'teacher' | 'student';

export type SchoolStatus = 'active' | 'suspended' | 'pending';

export interface School {
  id: string;
  registerNumber: string; // e.g. NXS-2026-0001
  name: string;
  udiseCode: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  website?: string;
  logoUrl?: string;
  academicYear?: string;
  board?: string;
  classesAvailable?: string[];
  totalSections?: number;
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  principalDesignation?: string;
  principalPhotoUrl?: string;
  status: SchoolStatus;
  createdAt: string;
  totalTeachers: number;
  totalStudents: number;
}

export interface UserSession {
  id: string;
  role: UserRole;
  schoolId: string;
  schoolName: string;
  schoolRegisterNumber: string;
  name: string;
  email?: string;
  studentId?: string; // For students e.g. STU-1001
  employeeId?: string; // For teachers/principals
  avatarUrl?: string;
  subject?: string;
  qualification?: string;
  classesAssigned?: string[];
  sectionsAssigned?: string[];
  class?: string;
  section?: string;
  rollNo?: string;
}

export interface Teacher {
  id: string;
  schoolId: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  subject: string;
  qualification: string;
  classesAssigned: string[];
  sectionsAssigned: string[];
  createdAt: string;
}

export interface Student {
  id: string;
  schoolId: string;
  studentId: string; // e.g. STU-1001
  name: string;
  email?: string;
  phone?: string;
  class: string;
  section: string;
  rollNo: string;
  parentName: string;
  parentPhone: string;
  createdAt: string;
}

export type HomeworkPriority = 'high' | 'medium' | 'low';

export interface Homework {
  id: string;
  schoolId: string;
  title: string;
  subject: string;
  class: string;
  section: string;
  dueDate: string;
  priority: HomeworkPriority;
  description: string;
  attachmentName?: string;
  attachmentUrl?: string;
  createdByTeacherName: string;
  createdByTeacherId: string;
  completedByStudentIds: string[];
  createdAt: string;
}

export type NoticeCategory = 'General' | 'Exam' | 'Holiday' | 'Sports' | 'Circular' | 'Urgent';

export interface Notice {
  id: string;
  schoolId: string; // "ALL" for super admin broadcasts
  title: string;
  category: NoticeCategory;
  content: string;
  isPinned: boolean;
  targetRole: 'all' | 'teachers' | 'students';
  createdByRole: 'super_admin' | 'principal' | 'teacher';
  createdByName: string;
  createdAt: string;
}

export interface EventItem {
  id: string;
  schoolId: string;
  title: string;
  posterUrl?: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  category: string;
  gallery?: string[];
  isArchived: boolean;
  createdByName: string;
  createdAt: string;
}

export type ComplaintCategory =
  | 'Bullying'
  | 'Harassment'
  | 'Dirty Classroom'
  | 'Broken Furniture'
  | 'Water Problem'
  | 'Electricity'
  | 'Teacher Feedback'
  | 'Suggestions'
  | 'Others';

export type IssueStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface Complaint {
  id: string;
  schoolId: string;
  category: ComplaintCategory;
  description: string;
  isAnonymous: boolean;
  studentName?: string;
  studentId?: string;
  status: IssueStatus;
  reply?: string;
  repliedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type SOSCategory = 'Medical' | 'Fire' | 'Electricity' | 'Violence' | 'Emergency' | 'Others';

export interface SOSAlert {
  id: string;
  schoolId: string;
  category: SOSCategory;
  location: string;
  description: string;
  createdByTeacherName: string;
  createdByTeacherId: string;
  status: IssueStatus;
  resolvedNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type AchievementCategory = 'Academic' | 'Sports' | 'Cultural' | 'Attendance' | 'Competition';

export interface Achievement {
  id: string;
  schoolId: string;
  title: string;
  category: AchievementCategory;
  studentName: string;
  studentId: string;
  class: string;
  section: string;
  date: string;
  description: string;
  certificateUrl?: string;
  addedByTeacherName: string;
  createdAt: string;
}

export interface TimetableEntry {
  id: string;
  schoolId: string;
  class: string;
  section: string;
  day: string; // 'Monday', 'Tuesday', etc.
  periodNumber: number;
  timeSlot: string; // e.g., '09:00 - 09:45 AM'
  subject: string;
  teacherName: string;
  room: string;
}

export interface SystemNotification {
  id: string;
  schoolId: string;
  targetRole: 'all' | 'principal' | 'teacher' | 'student';
  title: string;
  message: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  schoolId?: string;
  actorName: string;
  actorRole: string;
  action: string;
  timestamp: string;
}
