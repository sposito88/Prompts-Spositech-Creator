
import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <header className="w-full py-6">
      <div className="container flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">{t('app.title')}</h1>
          <p className="text-muted-foreground">{t('app.description')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('pt-BR')}
                className={language === 'pt-BR' ? 'bg-accent text-accent-foreground' : ''}
              >
                {t('language.pt-BR')}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange('en')}
                className={language === 'en' ? 'bg-accent text-accent-foreground' : ''}
              >
                {t('language.en')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="outline" size="icon" onClick={toggleTheme}>
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
