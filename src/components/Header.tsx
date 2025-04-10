
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
    <header className="w-full py-6 border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {t('app.title')}
          </h1>
          <p className="text-gray-400">{t('app.description')}</p>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border border-gray-700">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex justify-between items-center ${
                    language === lang.code ? 'bg-purple-900/50 text-white' : 'text-gray-300'
                  } hover:bg-purple-900/30 hover:text-white transition-colors`}
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
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">
              {theme === 'light' ? t('theme.dark') : t('theme.light')}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
