import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { UserRole } from '../../types';
import { ROLE_NAVIGATION, Language, MenuItem, SubMenuItem } from '../../data/navigationData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  language: Language;
  onSelectItem: (itemId: string, subItemId?: string) => void;
}

interface FlattenedSearchItem {
  id: string;
  subItemId?: string;
  parentLabel: string;
  label: string;
  icon: any;
  badge?: string | number;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  role,
  language,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Flatten items for current role
  const flattenedItems: FlattenedSearchItem[] = React.useMemo(() => {
    const items = ROLE_NAVIGATION[role] || [];
    const result: FlattenedSearchItem[] = [];

    items.forEach((item) => {
      // Main Item
      result.push({
        id: item.id,
        parentLabel: 'Main Navigation',
        label: item.label[language] || item.label.en,
        icon: item.icon,
        badge: item.badge,
      });

      // Subitems if any
      if (item.subItems) {
        item.subItems.forEach((sub) => {
          result.push({
            id: item.id,
            subItemId: sub.id,
            parentLabel: item.label[language] || item.label.en,
            label: sub.label[language] || sub.label.en,
            icon: item.icon,
            badge: sub.badge,
          });
        });
      }
    });

    return result;
  }, [role, language]);

  // Filter based on query
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return flattenedItems;
    const q = query.toLowerCase();
    return flattenedItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.parentLabel.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
    );
  }, [query, flattenedItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard events inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        const item = filteredItems[selectedIndex];
        onSelectItem(item.id, item.subItemId);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a menu, page, or command to search... (e.g., Timetable, Risk)"
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs font-medium">
              No matching navigation menu found for "<span className="text-slate-900 dark:text-slate-200 font-bold">{query}</span>"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={`${item.id}-${item.subItemId || 'main'}-${index}`}
                  onClick={() => {
                    onSelectItem(item.id, item.subItemId);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                              isSelected
                                ? 'bg-amber-300 text-slate-950'
                                : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-[10px] truncate ${
                          isSelected ? 'text-indigo-100' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {item.parentLabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] flex-shrink-0">
                    {isSelected && (
                      <span className="flex items-center gap-1 opacity-80">
                        <span>Select</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Search menus for {role.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">↵</kbd> Select
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
