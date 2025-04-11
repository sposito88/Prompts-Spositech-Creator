import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Globe, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="transition-colors border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="backdrop-blur-md border bg-white/90 border-gray-300 dark:bg-black/90 dark:border-gray-700">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex justify-between items-center transition-colors
                    ${language === lang.code 
                      ? 'bg-purple-100 text-purple-900 dark:bg-purple-900/50 dark:text-white' 
                      : 'text-gray-700 dark:text-gray-300'
                    } 
                    hover:bg-purple-50 hover:text-purple-800 dark:hover:bg-purple-900/30 dark:hover:text-white`}
                >
                  {t(`language.${lang.code}`)}
                  {language === lang.code && <Check className="h-4 w-4 ml-2 text-purple-400" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme} 
            className="transition-colors border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">
              {theme === 'dark' ? t('theme.light') : t('theme.dark')}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
