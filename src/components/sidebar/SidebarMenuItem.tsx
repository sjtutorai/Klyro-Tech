import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { MenuItem, SubMenuItem, Language } from '../../data/navigationData';

interface SidebarMenuItemProps {
  item: MenuItem;
  isCollapsed: boolean;
  language: Language;
  activeItem: string;
  activeSubItem?: string;
  onSelect: (itemId: string, subItemId?: string) => void;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  item,
  isCollapsed,
  language,
  activeItem,
  activeSubItem,
  onSelect,
}) => {
  const Icon = item.icon;
  const hasSubItems = Boolean(item.subItems && item.subItems.length > 0);
  const isMainActive = activeItem === item.id;
  const [isOpen, setIsOpen] = useState(isMainActive);

  // If main item becomes active, ensure expanded
  useEffect(() => {
    if (isMainActive && hasSubItems) {
      setIsOpen(true);
    }
  }, [isMainActive, hasSubItems]);

  const mainLabel = item.label[language] || item.label.en;

  const handleMainClick = () => {
    if (hasSubItems) {
      if (isCollapsed) {
        // If sidebar is collapsed, select first subitem or main item
        onSelect(item.id, item.subItems![0].id);
      } else {
        setIsOpen(!isOpen);
      }
    } else {
      onSelect(item.id);
    }
  };

  return (
    <div className="w-full">
      {/* Main Item Button */}
      <div className="relative group">
        <button
          onClick={handleMainClick}
          className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            isMainActive && !hasSubItems
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
              : isMainActive && hasSubItems
              ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <Icon
              className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                isMainActive ? 'scale-110' : 'group-hover:scale-105'
              }`}
            />
            {!isCollapsed && <span className="truncate">{mainLabel}</span>}
          </div>

          {!isCollapsed && (
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isMainActive && !hasSubItems
                      ? 'bg-amber-300 text-slate-950'
                      : 'bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {hasSubItems && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </motion.div>
              )}
            </div>
          )}
        </button>

        {/* Collapsed Tooltip */}
        {isCollapsed && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden group-hover:flex items-center z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap flex items-center gap-2">
              <span>{mainLabel}</span>
              {item.badge && (
                <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px]">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Expandable Submenu */}
      {hasSubItems && !isCollapsed && (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden pl-5 pr-1 py-1 space-y-1 border-l-2 border-indigo-100 dark:border-indigo-950 ml-4 my-1"
            >
              {item.subItems!.map((sub) => {
                const isSubActive = isMainActive && activeSubItem === sub.id;
                const subLabel = sub.label[language] || sub.label.en;
                return (
                  <button
                    key={sub.id}
                    onClick={() => onSelect(item.id, sub.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                      isSubActive
                        ? 'bg-indigo-600 text-white shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/80 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="truncate">{subLabel}</span>
                    {sub.badge && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                          isSubActive
                            ? 'bg-amber-300 text-slate-950'
                            : 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        }`}
                      >
                        {sub.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
