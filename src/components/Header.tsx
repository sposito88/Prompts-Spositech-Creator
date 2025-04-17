import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="w-full py-6 border-b sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm border-gray-200 bg-white/50 dark:border-gray-800 dark:bg-black/50">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{t('app.description')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
