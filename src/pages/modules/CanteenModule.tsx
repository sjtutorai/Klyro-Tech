import React, { useState } from 'react';
import { Utensils, CheckCircle2, ShoppingBag } from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const CanteenModule: React.FC = () => {
  const [notification, setNotification] = useState<string | null>(null);

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const todayMenu = [
    { meal: 'Breakfast (08:30 AM)', items: 'South Indian Idli, Vada, Sambhar & Fresh Juice', status: 'Served (420 Students)' },
    { meal: 'Mid-Day Lunch (01:00 PM)', items: 'Nutritious Steamed Rice, Dal Tadka, Seasonal Veggies & Curd', status: 'Preparation Complete' },
    { meal: 'Evening Snack (03:30 PM)', items: 'Fruit Bowl & Baked Snacks', status: 'Scheduled' },
  ];

  return (
    <div className="space-y-6">
      {notification && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between">
          <span>{notification}</span>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <h1 className="text-2xl font-black">School Canteen & Mid-Day Meal Nutrition</h1>
        <p className="text-xs text-slate-300">Daily menu planner, food hygiene audits, meal attendance counters, and vendor inventory management.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Daily Meals Served" value="1,200 Meals" change="98.5% Servings" isPositive={true} icon={Utensils} />
        <StatsCard title="Hygiene Rating" value="5 / 5 Stars" change="FSSAI Certified" isPositive={true} icon={CheckCircle2} />
        <StatsCard title="Ration Stock" value="14 Days Stock" change="Adequate" isPositive={true} icon={ShoppingBag} />
        <StatsCard title="Special Diets / Allergies" value="12 Students" change="Flagged" isPositive={true} icon={Utensils} />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
        <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">Today's Nutrition Menu</h3>
        <div className="space-y-3">
          {todayMenu.map((m, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{m.meal}</h4>
                <p className="text-slate-500 font-medium">{m.items}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-[10px]">
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
