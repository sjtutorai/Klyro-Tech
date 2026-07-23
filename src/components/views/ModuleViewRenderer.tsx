import React from 'react';
import { UserSession } from '../../types';
import { PrincipalDashboard } from '../dashboards/PrincipalDashboard';
import { SuperAdminDashboard } from '../dashboards/SuperAdminDashboard';
import { TeacherDashboard } from '../dashboards/TeacherDashboard';
import { StudentDashboard } from '../dashboards/StudentDashboard';

// Module Pages Imports
import { TeachersModule } from '../../pages/modules/TeachersModule';
import { StudentsModule } from '../../pages/modules/StudentsModule';
import { TimetableModule } from '../../pages/modules/TimetableModule';
import { AcademicModule } from '../../pages/modules/AcademicModule';
import { ExaminationsModule } from '../../pages/modules/ExaminationsModule';
import { ReportsModule } from '../../pages/modules/ReportsModule';
import { FinanceModule } from '../../pages/modules/FinanceModule';
import { CommunicationModule } from '../../pages/modules/CommunicationModule';
import { AIInsightsModule } from '../../pages/modules/AIInsightsModule';
import { InfrastructureModule } from '../../pages/modules/InfrastructureModule';
import { LibraryModule } from '../../pages/modules/LibraryModule';
import { TransportModule } from '../../pages/modules/TransportModule';
import { CanteenModule } from '../../pages/modules/CanteenModule';
import { ParentModule } from '../../pages/modules/ParentModule';
import { AdministrationModule } from '../../pages/modules/AdministrationModule';
import { SettingsModule } from '../../pages/modules/SettingsModule';
import { ProfileModule } from '../../pages/modules/ProfileModule';

interface ModuleViewRendererProps {
  session: UserSession;
  activeItem: string;
  activeSubItem?: string;
}

export const ModuleViewRenderer: React.FC<ModuleViewRendererProps> = ({
  session,
  activeItem,
  activeSubItem,
}) => {
  // 1. Dashboard Routing
  if (activeItem === 'dashboard') {
    if (session.role === 'super_admin') return <SuperAdminDashboard session={session} />;
    if (session.role === 'principal') return <PrincipalDashboard session={session} />;
    if (session.role === 'teacher') return <TeacherDashboard session={session} />;
    if (session.role === 'student') return <StudentDashboard session={session} />;
  }

  // 2. Teachers Module
  if (
    activeItem === 'teachers' ||
    activeSubItem?.includes('teacher') ||
    activeItem.includes('teacher')
  ) {
    return <TeachersModule activeSubItem={activeSubItem} />;
  }

  // 3. Students Module
  if (
    activeItem === 'students' ||
    activeSubItem?.includes('student') ||
    activeItem.includes('student')
  ) {
    return <StudentsModule activeSubItem={activeSubItem} />;
  }

  // 4. Timetable Module
  if (
    activeItem === 'timetable' ||
    activeSubItem?.includes('timetable') ||
    activeSubItem?.includes('schedule')
  ) {
    return <TimetableModule />;
  }

  // 5. Academic Module
  if (
    activeItem === 'academic' ||
    activeSubItem?.includes('class') ||
    activeSubItem?.includes('subject') ||
    activeSubItem?.includes('curriculum')
  ) {
    return <AcademicModule />;
  }

  // 6. Examinations Module
  if (
    activeItem === 'examinations' ||
    activeSubItem?.includes('exam') ||
    activeSubItem?.includes('marks') ||
    activeSubItem?.includes('report_cards')
  ) {
    return <ExaminationsModule />;
  }

  // 7. Reports Module
  if (
    activeItem === 'reports' ||
    activeSubItem?.includes('report') ||
    activeSubItem?.includes('analytics')
  ) {
    return <ReportsModule />;
  }

  // 8. Finance Module
  if (
    activeItem === 'finance' ||
    activeSubItem?.includes('fee') ||
    activeSubItem?.includes('payroll') ||
    activeSubItem?.includes('expense')
  ) {
    return <FinanceModule />;
  }

  // 9. Communication Module
  if (
    activeItem === 'communication' ||
    activeSubItem?.includes('sms') ||
    activeSubItem?.includes('circular') ||
    activeSubItem?.includes('announcements')
  ) {
    return <CommunicationModule />;
  }

  // 10. AI Assistant & Insights
  if (
    activeItem.includes('ai') ||
    activeItem === 'ai_assistant' ||
    activeSubItem?.includes('generator') ||
    activeSubItem?.includes('predictor')
  ) {
    return <AIInsightsModule />;
  }

  // 11. Infrastructure Module
  if (
    activeItem === 'infrastructure' ||
    activeSubItem?.includes('building') ||
    activeSubItem?.includes('equipment') ||
    activeSubItem?.includes('maintenance')
  ) {
    return <InfrastructureModule />;
  }

  // 12. Library Module
  if (
    activeItem === 'library' ||
    activeSubItem?.includes('book') ||
    activeSubItem?.includes('catalog')
  ) {
    return <LibraryModule />;
  }

  // 13. Transport Module
  if (
    activeItem === 'transport' ||
    activeSubItem?.includes('bus') ||
    activeSubItem?.includes('route')
  ) {
    return <TransportModule />;
  }

  // 14. Canteen Module
  if (
    activeItem === 'canteen' ||
    activeSubItem?.includes('meal') ||
    activeSubItem?.includes('menu')
  ) {
    return <CanteenModule />;
  }

  // 15. Parent Management Module
  if (
    activeItem === 'parent_management' ||
    activeSubItem?.includes('parent') ||
    activeSubItem?.includes('ptm')
  ) {
    return <ParentModule />;
  }

  // 16. Administration Module
  if (
    activeItem === 'administration' ||
    activeSubItem?.includes('audit') ||
    activeSubItem?.includes('backup') ||
    activeSubItem?.includes('roles')
  ) {
    return <AdministrationModule />;
  }

  // 17. Settings Module
  if (
    activeItem === 'settings' ||
    activeSubItem?.includes('profile') ||
    activeSubItem?.includes('config')
  ) {
    return <SettingsModule />;
  }

  // 18. Profile Module
  if (activeItem === 'my_profile') {
    return <ProfileModule session={session} />;
  }

  // Default fallback to Dashboard
  if (session.role === 'super_admin') return <SuperAdminDashboard session={session} />;
  if (session.role === 'principal') return <PrincipalDashboard session={session} />;
  if (session.role === 'teacher') return <TeacherDashboard session={session} />;
  return <StudentDashboard session={session} />;
};
