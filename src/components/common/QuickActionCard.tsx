import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  badge?: string;
  gradient?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  badge,
  gradient = 'from-indigo-600 to-violet-600',
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-sm group-hover:scale-105 transition-transform`}>
          <Icon className="w-5 h-5" />
        </div>
        {badge && (
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold uppercase tracking-wide">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          <span>{title}</span>
          <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};
