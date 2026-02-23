
import React from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggle }) => {
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <i className="fas fa-moon text-indigo-600"></i>
      ) : (
        <i className="fas fa-sun text-amber-400"></i>
      )}
    </button>
  );
};
