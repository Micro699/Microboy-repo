import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  // Helper to detect system dark mode preference
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize theme state: Prefer localStorage preference, otherwise fall back to system setting
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return getSystemTheme();
  });

  useEffect(() => {
    // Apply or remove Tailwind's 'dark' class on <html>
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Listen for real-time system theme changes (e.g. system automatic night mode switch)
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e) => {
      // Only auto-update if the user hasn't saved an explicit manual override
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
      }
    };

    // Attach listener
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  const handleToggle = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    // Save manual preference to localStorage
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-yellow-400 hover:opacity-80 transition"
      aria-label="Toggle Dark/Light Theme"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
