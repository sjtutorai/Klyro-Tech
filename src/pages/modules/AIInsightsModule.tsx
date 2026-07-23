import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Zap,
  Send,
  CheckCircle2,
  RefreshCw,
  Award,
  AlertTriangle,
  Play
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const AIInsightsModule: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleGenerate = (topic: string) => {
    setGenerating(true);
    setAiOutput(null);
    setTimeout(() => {
      setGenerating(false);
      setAiOutput(
        `✨ AI Neural Generator Response for "${topic}":\n\n1. Objective: Master Bloom's Taxonomy Level 4 (Analysis & Evaluation) for Grade 10 Mathematics.\n2. Lesson Plan Breakdown: 15-min interactive concept recap, 20-min worked examples, 10-min peer quiz.\n3. Custom Quiz Generated: 5 MCQs + 2 word problems auto-aligned with Board standards with 99.1% confidence score.`
      );
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Klyro Tech Neural Engine</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">AI Assistant & Predictive Intelligence</h1>
          <p className="text-xs text-slate-300">
            Powered by Gemini 2.5 Flash. Generate lesson plans, predict student academic risk, create worksheets, and analyze school metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="AI Accuracy Rating" value="98.8%" change="High Confidence" isPositive={true} icon={Brain} />
        <StatsCard title="Hours Saved / Month" value="142 Hours" change="For Faculty" isPositive={true} icon={Zap} />
        <StatsCard title="At-Risk Predictions" value="14 Students" change="Flagged Early" isPositive={true} icon={AlertTriangle} />
        <StatsCard title="Worksheets Generated" value="380 Sheets" change="Term 2" isPositive={true} icon={Sparkles} />
      </div>

      {/* AI Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span>Interactive AI Generator</span>
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-extrabold">
              Gemini 2.5 Flash
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Type topic or request (e.g. Create a 10-question MCQ worksheet on Trigonometry with detailed solutions)..."
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-600"
          />

          <div className="flex justify-end">
            <button
              onClick={() => handleGenerate(prompt || 'Class 10 Trigonometry Worksheet')}
              disabled={generating}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              {generating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>{generating ? 'Processing with Neural Engine...' : 'Generate AI Output'}</span>
            </button>
          </div>

          {aiOutput && (
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-slate-100 text-xs font-mono space-y-2 whitespace-pre-line animate-in fade-in">
              {aiOutput}
            </div>
          )}
        </div>

        {/* Quick Presets */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
          <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>AI One-Touch Presets</span>
          </h3>

          <div className="space-y-2 text-xs">
            {[
              'Predict Class 10 Board Results',
              'Generate 10-Min Physics Quiz',
              'Create Custom Lesson Plan',
              'Analyze Attendance Anomalies',
              'Draft Official Parent Circular',
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleGenerate(preset)}
                className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center justify-between transition cursor-pointer text-left"
              >
                <span>{preset}</span>
                <Play className="w-3.5 h-3.5 text-indigo-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
