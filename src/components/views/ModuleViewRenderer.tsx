import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Users,
  GraduationCap,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  DollarSign,
  Megaphone,
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
  Folder,
  User,
  CheckCircle2,
  TrendingUp,
  Target,
  Award,
  Plus,
  Search,
  Filter,
  Download,
  Check,
  AlertTriangle,
  Zap,
  Layers,
  LayoutGrid,
  Bot,
  FileCode,
  ShieldAlert,
  BarChart2,
  PieChart,
  RefreshCw,
  Send,
  HelpCircle,
  Play
} from 'lucide-react';
import { UserSession } from '../../types';
import { PrincipalDashboard } from '../dashboards/PrincipalDashboard';
import { SuperAdminDashboard } from '../dashboards/SuperAdminDashboard';
import { TeacherDashboard } from '../dashboards/TeacherDashboard';
import { StudentDashboard } from '../dashboards/StudentDashboard';

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
  // 1. If activeItem is "dashboard", render the primary Role Dashboard
  if (activeItem === 'dashboard') {
    if (session.role === 'super_admin') return <SuperAdminDashboard session={session} />;
    if (session.role === 'principal') return <PrincipalDashboard session={session} />;
    if (session.role === 'teacher') return <TeacherDashboard session={session} />;
    if (session.role === 'student') return <StudentDashboard session={session} />;
  }

  // Interactive AI & Submodule views state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleSimulateAiGeneration = (title: string) => {
    setAiGenerating(true);
    setAiOutput(null);
    setTimeout(() => {
      setAiGenerating(false);
      setAiOutput(
        `✨ AI Generated output for "${title}": Optimized for Class 8-A Greenwood International School. Complete syllabus alignment, bloom taxonomy level 4, generated with 98.4% confidence.`
      );
    }, 1200);
  };

  const getSubTitle = () => {
    const formattedItem = activeItem.replace(/_/g, ' ').toUpperCase();
    const formattedSub = activeSubItem ? ` → ${activeSubItem.replace(/_/g, ' ')}` : '';
    return `${formattedItem}${formattedSub}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Module Title Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Klyro Tech School Engine • {session.role.replace('_', ' ')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black capitalize tracking-tight">
            {activeSubItem ? activeSubItem.replace(/_/g, ' ') : activeItem.replace(/_/g, ' ')}
          </h1>
          <p className="text-xs text-slate-300 font-medium max-w-xl">
            Live interactive management portal for {session.schoolName}. Real-time synchronization across administrators, teachers, and students.
          </p>
        </div>

        <div className="flex items-center gap-2.5 z-10">
          <button
            onClick={() => handleSimulateAiGeneration(getSubTitle())}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition cursor-pointer"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>AI Quick Analyze</span>
          </button>
        </div>

        {/* Ambient Glow */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* AI Output Banner if generated */}
      {aiGenerating && (
        <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center gap-3 animate-pulse">
          <RefreshCw className="w-5 h-5 text-indigo-600 animate-spin" />
          <span className="text-xs font-bold">Klyro Neural Engine is generating analytics and insights for {getSubTitle()}...</span>
        </div>
      )}

      {aiOutput && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs font-medium flex items-start gap-3 shadow-sm">
          <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-extrabold text-emerald-900">AI Optimization Engine</div>
            <div>{aiOutput}</div>
          </div>
        </div>
      )}

      {/* SPECIALIZED MODULE RENDERING BY NAVIGATION KEY */}

      {/* 1. AI INSIGHTS / AI TUTOR / AI ASSISTANT */}
      {(activeItem.includes('ai_') || activeItem === 'ai_tutor' || activeSubItem?.includes('generator') || activeSubItem === 'student_risk') && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-black text-slate-900 dark:text-slate-100 text-base">
                  <Brain className="w-5 h-5 text-indigo-600" />
                  <span>AI Neural Generator & Assistant</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
                  Gemini 2.5 Flash
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Custom Prompt / Topic Input:
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={`Type topic or query for ${activeSubItem || activeItem} (e.g. Create a 10-question MCQ quiz on Quadratic Equations with solutions)...`}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600 min-h-[100px]"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Auto-aligned with Board Syllabus</span>
                </div>
                <button
                  onClick={() => handleSimulateAiGeneration(aiPrompt || activeSubItem || activeItem)}
                  disabled={aiGenerating}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Generate AI Content</span>
                </button>
              </div>
            </div>

            {/* AI Insights Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Predictive Analysis
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">94.2% Success</div>
                <p className="text-xs text-slate-500">
                  Students showing high engagement in AI practice tests score 18% higher in mid-term assessments.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Automated Grading
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-slate-100">42 Hours Saved</div>
                <p className="text-xs text-slate-500">
                  Faculty workload reduced by 60% with instant automated quiz & worksheet evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Info Panel */}
          <div className="space-y-4">
            <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-md space-y-3">
              <div className="font-bold text-sm flex items-center gap-2 text-amber-400">
                <Zap className="w-4 h-4 fill-amber-400" />
                <span>Quick Preset Tools</span>
              </div>

              <div className="space-y-2">
                {[
                  'Lesson Plan Generator',
                  'Student Risk Predictor',
                  'Smart Summarizer',
                  'Question Paper Creator',
                  'Worksheet Generator',
                ].map((tool, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulateAiGeneration(tool)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition cursor-pointer text-left"
                  >
                    <span>{tool}</span>
                    <Play className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GENERAL TABULAR & DATA MANAGEMENT VIEW FOR OTHER MENU ITEMS */}
      {!activeItem.includes('ai_') && activeItem !== 'ai_tutor' && !activeSubItem?.includes('generator') && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search records in ${activeSubItem || activeItem}...`}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <button className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 transition cursor-pointer">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter</span>
              </button>
              <button className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 transition cursor-pointer">
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </div>
          </div>

          {/* Sample Interactive Records Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Active Database Records • {session.schoolName}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Showing 5 of 5 Entries</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100/70 dark:bg-slate-800/80 text-[11px] font-extrabold text-slate-600 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5">ID / Code</th>
                    <th className="p-3.5">Title / Name</th>
                    <th className="p-3.5">Class / Department</th>
                    <th className="p-3.5">Assigned To / Room</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {[
                    { id: 'REC-101', name: 'Class 8-A Mathematics Syllabus', class: 'Grade 8', assigned: 'Mrs. Priya Sharma', status: 'Active' },
                    { id: 'REC-102', name: 'Mid-Term Exam Schedule 2026', class: 'Grade 6 - 10', assigned: 'Examination Committee', status: 'Published' },
                    { id: 'REC-103', name: 'Room 204 Bench & Smartboard Allocation', class: 'Building B', assigned: 'Academic Staff', status: 'Verified' },
                    { id: 'REC-104', name: 'Science Department Annual Budget', class: 'Science Dept', assigned: 'Dr. Ramesh Sharma', status: 'Approved' },
                    { id: 'REC-105', name: 'Attendance & Disciplinary Audit', class: 'All Classes', assigned: 'School Admin', status: 'Pending' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">{row.id}</td>
                      <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">{row.name}</td>
                      <td className="p-3.5">{row.class}</td>
                      <td className="p-3.5">{row.assigned}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px]">
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-100 transition cursor-pointer">
                          Manage
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
    </div>
  );
};
