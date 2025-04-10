import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type LanguageContextType = {
  language: string;
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  availableLanguages: { code: string; name: string }[];
};

const translations = {
  'en': {
    'app.title': 'AI Prompt Creator',
    'app.description': 'Create powerful prompts for your AI tools',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'form.subject': 'Subject',
    'form.subject.placeholder': 'What is the prompt about?',
    'form.style': 'Style',
    'form.style.placeholder': 'Select a style',
    'form.keywords': 'Keywords',
    'form.keywords.placeholder': 'Enter keywords (optional)',
    'form.generate': 'Generate',
    'form.regenerate': 'Regenerate',
    'result.title': 'Your Prompt',
    'result.copy': 'Copy to clipboard',
    'result.copied': 'Copied!',
    'result.regenerate': 'Regenerate',
    'history.title': 'History',
    'history.empty': 'No history yet',
    'history.clear': 'Clear History',
    'history.cleared': 'History cleared',
    'favorites.title': 'Favorites',
    'favorites.empty': 'No favorites yet',
    'favorites.add': 'Add to Favorites',
    'favorites.remove': 'Remove from Favorites',
    'favorites.added': 'Added to favorites',
    'favorites.removed': 'Removed from favorites',
    'favorites.clear': 'Clear Favorites',
    'favorites.cleared': 'Favorites cleared',
    'error.general': 'An error occurred. Please try again.',
    'share.title': 'Share',
    'share.copy': 'Copy',
    'share.copied': 'Copied!',
    'share.emailSubject': 'Check out this AI prompt',
  },
  'pt': {
    'app.title': 'Criador de Prompts IA',
    'app.description': 'Crie prompts poderosos para suas ferramentas de IA',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'form.subject': 'Assunto',
    'form.subject.placeholder': 'Sobre o que é o prompt?',
    'form.style': 'Estilo',
    'form.style.placeholder': 'Selecione um estilo',
    'form.keywords': 'Palavras-chave',
    'form.keywords.placeholder': 'Digite palavras-chave (opcional)',
    'form.generate': 'Gerar',
    'form.regenerate': 'Regenerar',
    'result.title': 'Seu Prompt',
    'result.copy': 'Copiar',
    'result.copied': 'Copiado!',
    'result.regenerate': 'Regenerar',
    'history.title': 'Histórico',
    'history.empty': 'Sem histórico ainda',
    'history.clear': 'Limpar Histórico',
    'history.cleared': 'Histórico limpo',
    'favorites.title': 'Favoritos',
    'favorites.empty': 'Sem favoritos ainda',
    'favorites.add': 'Adicionar aos Favoritos',
    'favorites.remove': 'Remover dos Favoritos',
    'favorites.added': 'Adicionado aos favoritos',
    'favorites.removed': 'Removido dos favoritos', 
    'favorites.clear': 'Limpar Favoritos',
    'favorites.cleared': 'Favoritos limpos',
    'error.general': 'Ocorreu um erro. Por favor, tente novamente.',
    'share.title': 'Compartilhar',
    'share.copy': 'Copiar',
    'share.copied': 'Copiado!',
    'share.emailSubject': 'Confira este prompt de IA',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key] || key;
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Português' }
  ];

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export { LanguageProvider, useLanguage };
