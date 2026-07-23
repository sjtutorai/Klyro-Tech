import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  icon: LucideIcon;
  iconBgColor?: string;
  iconTextColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtext,
  icon: Icon,
  iconBgColor = 'bg-indigo-500/10 dark:bg-indigo-500/20',
  iconTextColor = 'text-indigo-600 dark:text-indigo-400',
}) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${iconBgColor} ${iconTextColor} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
              isPositive
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400'
                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400'
            }`}
          >
            {isPositive ? '+' : ''}
            {change}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          {subtext}
        </p>
      )}
    </div>
  );
};
