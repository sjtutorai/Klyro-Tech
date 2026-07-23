import {
  LayoutDashboard,
  School,
  Users,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  DollarSign,
  Megaphone,
  Brain,
  Settings,
  UserCheck,
  Building2,
  BookOpen,
  FileText,
  FolderOpen,
  CloudUpload,
  Lock,
  Clock,
  BookMarked,
  ClipboardList,
  CheckSquare,
  MessageSquare,
  Sparkles,
  Folder,
  User,
  CheckCircle2,
  TrendingUp,
  Target,
  Award,
  HelpCircle,
  FileCheck,
  Zap,
  Sliders,
  Layers,
  LayoutGrid
} from 'lucide-react';
import { UserRole } from '../types';

export type Language = 'en' | 'kn' | 'hi';

export interface SubMenuItem {
  id: string;
  label: { en: string; kn: string; hi: string };
  icon?: any;
  badge?: number | string;
}

export interface MenuItem {
  id: string;
  label: { en: string; kn: string; hi: string };
  icon: any;
  badge?: number | string;
  subItems?: SubMenuItem[];
}

export const ROLE_NAVIGATION: Record<UserRole, MenuItem[]> = {
  principal: [
    {
      id: 'dashboard',
      label: { en: 'Dashboard', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'डैशबोर्ड' },
      icon: LayoutDashboard,
    },
    {
      id: 'school_management',
      label: { en: 'School Management', kn: 'ಶಾಲೆ ನಿರ್ವಹಣೆ', hi: 'स्कूल प्रबंधन' },
      icon: School,
      subItems: [
        { id: 'school_overview', label: { en: 'School Overview', kn: 'ಶಾಲೆಯ ಪರಿಚಯ', hi: 'स्कूल अवलोकन' } },
        { id: 'academic_calendar', label: { en: 'Academic Calendar', kn: 'ಶೈಕ್ಷಣಿಕ ಕ್ಯಾಲೆಂಡರ್', hi: 'शैक्षणिक कैलेंडर' } },
        { id: 'departments', label: { en: 'Departments', kn: 'ವಿಭಾಗಗಳು', hi: 'विभाग' } },
      ],
    },
    {
      id: 'teachers',
      label: { en: 'Teachers', kn: 'ಶಿಕ್ಷಕರು', hi: 'शिक्षक' },
      icon: Users,
      subItems: [
        { id: 'teacher_directory', label: { en: 'Teacher Directory', kn: 'ಶಿಕ್ಷಕರ ಡೈರೆಕ್ಟರಿ', hi: 'शिक्षक निर्देशिका' } },
        { id: 'teacher_attendance', label: { en: 'Attendance', kn: 'ಹಾಜರಾತಿ', hi: 'उपस्थिति' } },
        { id: 'teacher_performance', label: { en: 'Performance', kn: 'ಸಾಧನೆ', hi: 'प्रदर्शन' } },
        { id: 'teacher_workload', label: { en: 'Workload', kn: 'ಕೆಲಸದ ಪ್ರಮಾಣ', hi: 'कार्यभार' } },
      ],
    },
    {
      id: 'students',
      label: { en: 'Students', kn: 'ವಿದ್ಯಾರ್ಥಿಗಳು', hi: 'छात्र' },
      icon: GraduationCap,
      subItems: [
        { id: 'student_directory', label: { en: 'Student Directory', kn: 'ವಿದ್ಯಾರ್ಥಿ ಡೈರೆಕ್ಟರಿ', hi: 'छात्र निर्देशिका' } },
        { id: 'student_attendance', label: { en: 'Attendance', kn: 'ಹಾಜರಾತಿ', hi: 'उपस्थिति' } },
        { id: 'student_performance', label: { en: 'Academic Performance', kn: 'ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ', hi: 'शैक्षणिक प्रदर्शन' } },
        { id: 'student_discipline', label: { en: 'Discipline', kn: 'ಶಿಸ್ತು', hi: 'अनुशासन' } },
      ],
    },
    {
      id: 'timetable',
      label: { en: 'Timetable', kn: 'ಸಮಯಪಟ್ಟಿ', hi: 'समय-सारिणी' },
      icon: Calendar,
      subItems: [
        { id: 'view_timetable', label: { en: 'View Timetable', kn: 'ಸಮಯಪಟ್ಟಿ ವೀಕ್ಷಿಸಿ', hi: 'समय-सारिणी देखें' } },
        { id: 'ai_timetable', label: { en: 'AI Timetable', kn: 'ಎಐ ಸಮಯಪಟ್ಟಿ', hi: 'एआई समय-सारिणी' }, badge: 'AI' },
        { id: 'room_allocation', label: { en: 'Room Allocation', kn: 'ಕೊಠಡಿ ಹಂಚಿಕೆ', hi: 'कमरा आवंटन' } },
      ],
    },
    {
      id: 'examinations',
      label: { en: 'Examinations', kn: 'ಪರೀಕ್ಷೆಗಳು', hi: 'परीक्षाएं' },
      icon: FileSpreadsheet,
      subItems: [
        { id: 'exam_schedule', label: { en: 'Schedule', kn: 'ಸಮಯಪಟ್ಟಿ', hi: 'अनुसूची' } },
        { id: 'exam_results', label: { en: 'Results', kn: 'ಫಲಿತಾಂಶಗಳು', hi: 'परिणाम' } },
        { id: 'exam_analytics', label: { en: 'Analytics', kn: 'ವಿಶ್ಲೇಷಣೆ', hi: 'विश्लेषण' } },
      ],
    },
    {
      id: 'reports',
      label: { en: 'Reports', kn: 'ವರದಿಗಳು', hi: 'रिपोर्ट्स' },
      icon: BarChart3,
      subItems: [
        { id: 'school_reports', label: { en: 'School Reports', kn: 'ಶಾಲೆ ವರದಿಗಳು', hi: 'स्कूल रिपोर्ट' } },
        { id: 'teacher_reports', label: { en: 'Teacher Reports', kn: 'ಶಿಕ್ಷಕರ ವರದಿಗಳು', hi: 'शिक्षक रिपोर्ट' } },
        { id: 'student_reports', label: { en: 'Student Reports', kn: 'ವಿದ್ಯಾರ್ಥಿ ವರದಿಗಳು', hi: 'छात्र रिपोर्ट' } },
        { id: 'attendance_reports', label: { en: 'Attendance Reports', kn: 'ಹಾಜರಾತಿ ವರದಿಗಳು', hi: 'उपस्थिति रिपोर्ट' } },
      ],
    },
    {
      id: 'finance',
      label: { en: 'Finance', kn: 'ಹಣಕಾಸು', hi: 'वित्त' },
      icon: DollarSign,
      subItems: [
        { id: 'fees', label: { en: 'Fees', kn: 'ಶುಲ್ಕಗಳು', hi: 'शुल्क' } },
        { id: 'expenses', label: { en: 'Expenses', kn: 'ಖರ್ಚುಗಳು', hi: 'खर्चे' } },
        { id: 'budget', label: { en: 'Budget', kn: 'ಬಜೆಟ್', hi: 'बजट' } },
      ],
    },
    {
      id: 'announcements',
      label: { en: 'Announcements', kn: 'ಪ್ರಕಟಣೆಗಳು', hi: 'घोषणाएं' },
      icon: Megaphone,
      badge: 3,
    },
    {
      id: 'ai_insights',
      label: { en: 'AI Insights', kn: 'ಎಐ ಒಳನೋಟಗಳು', hi: 'एआई अंतर्दृष्टि' },
      icon: Brain,
      badge: 'New',
      subItems: [
        { id: 'school_analytics', label: { en: 'School Analytics', kn: 'ಶಾಲೆ ವಿಶ್ಲೇಷಣೆ', hi: 'स्कूल एनालिटिक्स' } },
        { id: 'student_risk', label: { en: 'Student Risk Prediction', kn: 'ವಿದ್ಯಾರ್ಥಿ ಅಪಾಯ ಮುನ್ಸೂಚನೆ', hi: 'छात्र जोखिम भविष्यवाणी' } },
        { id: 'teacher_eval', label: { en: 'Teacher Performance', kn: 'ಶಿಕ್ಷಕರ ಸಾಧನೆ', hi: 'शिक्षक प्रदर्शन' } },
        { id: 'ai_recommendations', label: { en: 'Recommendations', kn: 'ಶಿಫಾರಸುಗಳು', hi: 'सिफारिशें' } },
      ],
    },
    {
      id: 'settings',
      label: { en: 'Settings', kn: 'ಸಂಯೋಜನೆಗಳು', hi: 'सेटिंग्स' },
      icon: Settings,
    },
  ],

  super_admin: [
    {
      id: 'dashboard',
      label: { en: 'Dashboard', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'डैशबोर्ड' },
      icon: LayoutDashboard,
    },
    {
      id: 'user_management',
      label: { en: 'User Management', kn: 'ಬಳಕೆದಾರರ ನಿರ್ವಹಣೆ', hi: 'उपयोगकर्ता प्रबंधन' },
      icon: UserCheck,
      subItems: [
        { id: 'admin_teachers', label: { en: 'Teachers', kn: 'ಶಿಕ್ಷಕರು', hi: 'शिक्षक' } },
        { id: 'admin_students', label: { en: 'Students', kn: 'ವಿದ್ಯಾರ್ಥಿಗಳು', hi: 'छात्र' } },
        { id: 'admin_parents', label: { en: 'Parents', kn: 'ಪೋಷಕರು', hi: 'अभिभावक' } },
        { id: 'admin_staff', label: { en: 'Staff', kn: 'ಸಿಬ್ಬಂದಿ', hi: 'कर्मचारी' } },
      ],
    },
    {
      id: 'school_setup',
      label: { en: 'School Setup', kn: 'ಶಾಲೆ ಸ್ಥಾಪನೆ', hi: 'स्कूल सेटअप' },
      icon: Building2,
      subItems: [
        { id: 'classes', label: { en: 'Classes', kn: 'ತರಗತಿಗಳು', hi: 'कक्षाएं' } },
        { id: 'sections', label: { en: 'Sections', kn: 'ವಿಭಾಗಗಳು', hi: 'अनुभाग' } },
        { id: 'subjects', label: { en: 'Subjects', kn: 'ವಿಷಯಗಳು', hi: 'विषय' } },
        { id: 'rooms', label: { en: 'Rooms', kn: 'ಕೊಠಡಿಗಳು', hi: 'कमरे' } },
        { id: 'benches', label: { en: 'Benches', kn: 'ಬೆಂಚ್‌ಗಳು', hi: 'बेंच' } },
      ],
    },
    {
      id: 'timetable',
      label: { en: 'Timetable', kn: 'ಸಮಯಪಟ್ಟಿ', hi: 'समय-सारिणी' },
      icon: Calendar,
      subItems: [
        { id: 'generate_timetable', label: { en: 'Generate Timetable', kn: 'ಸಮಯಪಟ್ಟಿ ರಚಿಸಿ', hi: 'समय-सारिणी बनाएं' } },
        { id: 'edit_timetable', label: { en: 'Edit Timetable', kn: 'ಸಮಯಪಟ್ಟಿ ತಿದ್ದಿ', hi: 'समय-सारिणी संपादित करें' } },
        { id: 'substitute_teachers', label: { en: 'Substitute Teachers', kn: 'ಬದಲಿ ಶಿಕ್ಷಕರು', hi: 'बदली शिक्षक' } },
        { id: 'room_allocation', label: { en: 'Room Allocation', kn: 'ಕೊಠಡಿ ಹಂಚಿಕೆ', hi: 'कमरा आवंटन' } },
      ],
    },
    {
      id: 'academic',
      label: { en: 'Academic', kn: 'ಶೈಕ್ಷಣಿಕ', hi: 'अकादमिक' },
      icon: BookOpen,
      subItems: [
        { id: 'subject_allocation', label: { en: 'Subject Allocation', kn: 'ವಿಷಯ ಹಂಚಿಕೆ', hi: 'विषय आवंटन' } },
        { id: 'teacher_allocation', label: { en: 'Teacher Allocation', kn: 'ಶಿಕ್ಷಕರ ಹಂಚಿಕೆ', hi: 'शिक्षक आवंटन' } },
      ],
    },
    {
      id: 'examinations',
      label: { en: 'Examinations', kn: 'ಪರೀಕ್ಷೆಗಳು', hi: 'परीक्षाएं' },
      icon: FileText,
      subItems: [
        { id: 'create_exams', label: { en: 'Create Exams', kn: 'ಪರೀಕ್ಷೆಗಳನ್ನು ರಚಿಸಿ', hi: 'परीक्षा बनाएं' } },
        { id: 'marks_entry', label: { en: 'Marks Entry', kn: 'ಅಂಕಗಳ ನಮೂದು', hi: 'अंक प्रविष्टि' } },
        { id: 'publish_results', label: { en: 'Publish Results', kn: 'ಫಲಿತಾಂಶ ಪ್ರಕಟಿಸಿ', hi: 'परिणाम प्रकाशित करें' } },
      ],
    },
    {
      id: 'notices',
      label: { en: 'Notices', kn: 'ಸೂಚನೆಗಳು', hi: 'नोटिस' },
      icon: Megaphone,
      badge: 2,
    },
    {
      id: 'documents',
      label: { en: 'Documents', kn: 'ದಾಖಲೆಗಳು', hi: 'दस्तावेज़' },
      icon: FolderOpen,
    },
    {
      id: 'backup_restore',
      label: { en: 'Backup & Restore', kn: 'ಬ್ಯಾಕಪ್ ಮತ್ತು ಮರುಸ್ಥಾಪನೆ', hi: 'बैकअप और पुनर्स्थापना' },
      icon: CloudUpload,
    },
    {
      id: 'roles_permissions',
      label: { en: 'Roles & Permissions', kn: 'ಪಾತ್ರಗಳು ಮತ್ತು ಅನುಮತಿಗಳು', hi: 'भूमिकाएं और अनुमतियां' },
      icon: Lock,
    },
    {
      id: 'settings',
      label: { en: 'Settings', kn: 'ಸಂಯೋಜನೆಗಳು', hi: 'सेटिंग्स' },
      icon: Settings,
    },
  ],

  teacher: [
    {
      id: 'dashboard',
      label: { en: 'Dashboard', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'डैशबोर्ड' },
      icon: LayoutDashboard,
    },
    {
      id: 'my_timetable',
      label: { en: 'My Timetable', kn: 'ನನ್ನ ಸಮಯಪಟ್ಟಿ', hi: 'मेरी समय-सारिणी' },
      icon: Clock,
    },
    {
      id: 'my_classes',
      label: { en: 'My Classes', kn: 'ನನ್ನ ತರಗತಿಗಳು', hi: 'मेरी कक्षाएं' },
      icon: GraduationCap,
    },
    {
      id: 'lesson_planner',
      label: { en: 'Lesson Planner', kn: 'ಪಾಠ ಯೋಜಕ', hi: 'पाठ योजनाकार' },
      icon: BookMarked,
    },
    {
      id: 'attendance',
      label: { en: 'Attendance', kn: 'ಹಾಜರಾತಿ', hi: 'उपस्थिति' },
      icon: CheckSquare,
    },
    {
      id: 'assignments',
      label: { en: 'Assignments', kn: 'ನಿಯೋಜನೆಗಳು', hi: 'असाइनमेंट' },
      icon: ClipboardList,
      badge: 4,
      subItems: [
        { id: 'create_assignment', label: { en: 'Create Assignment', kn: 'ನಿಯೋಜನೆ ಸೃಷ್ಟಿಸಿ', hi: 'असाइनमेंट बनाएं' } },
        { id: 'review_submission', label: { en: 'Review Submission', kn: 'ಸಲ್ಲಿಕೆ ಪರಿಶೀಲಿಸಿ', hi: 'सबमिशन की समीक्षा' } },
        { id: 'grade_assignment', label: { en: 'Grade Assignment', kn: 'ಅಂಕ ನೀಡಿ', hi: 'असाइनमेंट ग्रेड करें' } },
      ],
    },
    {
      id: 'exams',
      label: { en: 'Exams', kn: 'ಪರೀಕ್ಷೆಗಳು', hi: 'परीक्षा' },
      icon: FileSpreadsheet,
      subItems: [
        { id: 'question_papers', label: { en: 'Question Papers', kn: 'ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆಗಳು', hi: 'प्रश्न पत्र' } },
        { id: 'marks_entry', label: { en: 'Marks Entry', kn: 'ಅಂಕಗಳ ನಮೂದು', hi: 'अंक प्रविष्टि' } },
      ],
    },
    {
      id: 'student_progress',
      label: { en: 'Student Progress', kn: 'ವಿದ್ಯಾರ್ಥಿ ಪ್ರಗತಿ', hi: 'छात्र प्रगति' },
      icon: TrendingUp,
    },
    {
      id: 'messages',
      label: { en: 'Messages', kn: 'ಸಂದೇಶಗಳು', hi: 'संदेश' },
      icon: MessageSquare,
      badge: 2,
    },
    {
      id: 'announcements',
      label: { en: 'Announcements', kn: 'ಪ್ರಕಟಣೆಗಳು', hi: 'घोषणाएं' },
      icon: Megaphone,
    },
    {
      id: 'ai_assistant',
      label: { en: 'AI Assistant', kn: 'ಎಐ ಸಹಾಯಕ', hi: 'एआई सहायक' },
      icon: Sparkles,
      badge: 'AI',
      subItems: [
        { id: 'lp_generator', label: { en: 'Lesson Plan Generator', kn: 'ಪಾಠ ಯೋಜನೆ ಜನರೇಟರ್', hi: 'पाठ योजना जनरेटर' } },
        { id: 'worksheet_generator', label: { en: 'Worksheet Generator', kn: 'ವರ್ಕ್‌ಶೀಟ್ ಜನರೇಟರ್', hi: 'कार्यपत्रक जनरेटर' } },
        { id: 'quiz_generator', label: { en: 'Quiz Generator', kn: 'ಕ್ವಿಜ್ ಜನರೇಟರ್', hi: 'क्विज जनरेटर' } },
        { id: 'ppt_generator', label: { en: 'PPT Generator', kn: 'ಪಿಪಿಟಿ ಜನರೇಟರ್', hi: 'पीपीटी जनरेटर' } },
        { id: 'qp_generator', label: { en: 'Question Paper Generator', kn: 'ಪ್ರಶ್ನೆಪತ್ರಿಕೆ ಜನರೇಟರ್', hi: 'प्रश्न पत्र जनरेटर' } },
      ],
    },
    {
      id: 'teaching_resources',
      label: { en: 'Teaching Resources', kn: 'ಬೋಧನಾ ಸಂಪನ್ಮೂಲಗಳು', hi: 'शिक्षण संसाधन' },
      icon: Folder,
    },
    {
      id: 'my_profile',
      label: { en: 'My Profile', kn: 'ನನ್ನ ಪ್ರೊಫೈಲ್', hi: 'मेरी प्रोफाइल' },
      icon: User,
    },
    {
      id: 'settings',
      label: { en: 'Settings', kn: 'ಸಂಯೋಜನೆಗಳು', hi: 'सेटिंग्स' },
      icon: Settings,
    },
  ],

  student: [
    {
      id: 'dashboard',
      label: { en: 'Dashboard', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್', hi: 'डैशबोर्ड' },
      icon: LayoutDashboard,
    },
    {
      id: 'my_timetable',
      label: { en: 'My Timetable', kn: 'ನನ್ನ ಸಮಯಪಟ್ಟಿ', hi: 'मेरी समय-सारिणी' },
      icon: Clock,
    },
    {
      id: 'my_subjects',
      label: { en: 'My Subjects', kn: 'ನನ್ನ ವಿಷಯಗಳು', hi: 'मेरे विषय' },
      icon: BookOpen,
    },
    {
      id: 'homework',
      label: { en: 'Homework', kn: 'ಮನೆಕೆಲಸ', hi: 'गृहकार्य' },
      icon: BookMarked,
      badge: 3,
    },
    {
      id: 'assignments',
      label: { en: 'Assignments', kn: 'ನಿಯೋಜನೆಗಳು', hi: 'असाइनमेंट' },
      icon: ClipboardList,
    },
    {
      id: 'attendance',
      label: { en: 'Attendance', kn: 'ಹಾಜರಾತಿ', hi: 'उपस्थिति' },
      icon: CheckCircle2,
    },
    {
      id: 'results',
      label: { en: 'Results', kn: 'ಫಲಿತಾಂಶಗಳು', hi: 'परिणाम' },
      icon: TrendingUp,
    },
    {
      id: 'exam_schedule',
      label: { en: 'Exam Schedule', kn: 'ಪರೀಕ್ಷಾ ವೇಳಾಪಟ್ಟಿ', hi: 'परीक्षा अनुसूची' },
      icon: Calendar,
    },
    {
      id: 'study_planner',
      label: { en: 'Study Planner', kn: 'ಅಧ್ಯಯನ ಯೋಜಕ', hi: 'अध्ययन योजनाकार' },
      icon: Target,
    },
    {
      id: 'ai_tutor',
      label: { en: 'AI Tutor', kn: 'ಎಐ ಟ್ಯೂಟರ್', hi: 'एआई ट्यूटर' },
      icon: Brain,
      badge: 'AI',
      subItems: [
        { id: 'ask_ai', label: { en: 'Ask AI', kn: 'ಎಐ ಗೆ ಕೇಳಿ', hi: 'एआई से पूछें' } },
        { id: 'smart_notes', label: { en: 'Smart Notes', kn: 'ಸ್ಮಾರ್ಟ್ ಟಿಪ್ಪಣಿಗಳು', hi: 'स्मार्ट नोट्स' } },
        { id: 'summaries', label: { en: 'Summaries', kn: 'ಸಾರಾಂಶಗಳು', hi: 'सारांश' } },
        { id: 'flashcards', label: { en: 'Flashcards', kn: 'ಫ್ಲ್ಯಾಶ್‌ಕಾರ್ಡ್‌ಗಳು', hi: 'फ्लैशकार्ड' } },
        { id: 'practice_tests', label: { en: 'Practice Tests', kn: 'ಅಭ್ಯಾಸ ಪರೀಕ್ಷೆಗಳು', hi: 'अभ्यास परीक्षण' } },
        { id: 'tutor_quiz', label: { en: 'Quiz Generator', kn: 'ಕ್ವಿಜ್ ಜನರೇಟರ್', hi: 'क्विज जनरेटर' } },
      ],
    },
    {
      id: 'messages',
      label: { en: 'Messages', kn: 'ಸಂದೇಶಗಳು', hi: 'संदेश' },
      icon: MessageSquare,
      badge: 1,
    },
    {
      id: 'announcements',
      label: { en: 'Announcements', kn: 'ಪ್ರಕಟಣೆಗಳು', hi: 'घोषणाएं' },
      icon: Megaphone,
    },
    {
      id: 'achievements',
      label: { en: 'Achievements', kn: 'ಸಾಧನೆಗಳು', hi: 'उपलब्धियां' },
      icon: Award,
    },
    {
      id: 'my_profile',
      label: { en: 'My Profile', kn: 'ನನ್ನ ಪ್ರೊಫೈಲ್', hi: 'मेरी प्रोफाइल' },
      icon: User,
    },
    {
      id: 'settings',
      label: { en: 'Settings', kn: 'ಸಂಯೋಜನೆಗಳು', hi: 'सेटिंग्स' },
      icon: Settings,
    },
  ],
};
