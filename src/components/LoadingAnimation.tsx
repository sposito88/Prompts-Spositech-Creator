
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function LoadingAnimation() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center p-8">
      <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden mb-4">
        <div className="absolute inset-0 w-1/3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-loader"></div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse-opacity"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse-opacity" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse-opacity" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="mt-4 text-muted-foreground">{t('loading.message')}</p>
    </div>
  );
}
