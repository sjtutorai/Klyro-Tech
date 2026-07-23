import React, { useState } from 'react';
import { Library, BookOpen, CheckCircle2, Search, Download } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const LibraryModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const books = [
    { code: 'BK-501', title: 'Concepts of Physics (Vol 1)', author: 'H.C. Verma', category: 'Science', copies: '8 / 10 Available' },
    { code: 'BK-502', title: 'Higher Algebra', author: 'Hall & Knight', category: 'Mathematics', copies: '4 / 5 Available' },
    { code: 'BK-503', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', copies: '2 / 6 Available' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">Central Library & E-Catalog</h1>
        <p className="text-xs text-slate-300">Book inventory catalog, issue/return logs, overdue fine tracking, and digital learning subscriptions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Books" value="5,420 Books" change="450 Titles" isPositive={true} icon={Library} />
        <StatsCard title="Books Issued Today" value="48 Books" change="Active" isPositive={true} icon={BookOpen} />
        <StatsCard title="Overdue Books" value="3 Books" change="Fine ₹15" isPositive={false} icon={CheckCircle2} />
        <StatsCard title="Digital E-Books" value="1,200 Titles" change="24/7 Access" isPositive={true} icon={Library} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Library Catalog Search</h3>
        <div className="space-y-3">
          {books.map((b) => (
            <div key={b.code} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-indigo-600 font-bold">{b.code}</span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{b.title}</h4>
                <p className="text-slate-500">Author: {b.author} • Category: {b.category}</p>
              </div>
              <div className="text-right space-y-1">
                <span className="font-extrabold text-emerald-600">{b.copies}</span>
                <div>
                  <button
                    onClick={() => triggerNotification(`Book ${b.title} issued to student log.`)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
                  >
                    Issue Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
