import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-xl transition-all duration-300 flex items-center justify-center
        ${theme === 'dark' 
          ? 'bg-white/5 text-white/50 hover:text-brand-gold hover:bg-brand-gold/10' 
          : 'bg-zinc-100 text-zinc-500 hover:text-brand-gold hover:bg-brand-gold/10'
        } ${className}`}
      aria-label="Toggle Theme"
      title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="animate-in spin-in-90 duration-500" />
      ) : (
        <Moon size={20} className="animate-in -spin-in-90 duration-500" />
      )}
    </button>
  );
};
