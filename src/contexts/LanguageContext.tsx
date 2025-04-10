
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the Language type
export type Language = 'en' | 'pt-BR';

type LanguageContextType = {
  language: Language;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
  availableLanguages: { code: Language; name: string }[];
};

// Organize translations by section for better maintainability
const translations = {
  'en': {
    // App general
    'app.title': 'AI Prompt Creator',
    'app.description': 'Create powerful prompts for your AI tools',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Form elements
    'form.subject': 'Subject',
    'form.subject.placeholder': 'What is the prompt about?',
    'form.style': 'Style',
    'form.promptStyle': 'Prompt Style',
    'form.promptStyle.placeholder': 'Select a style',
    'form.keywords': 'Keywords',
    'form.keywords.placeholder': 'Enter keywords (optional)',
    'form.generate': 'Generate',
    'form.regenerate': 'Regenerate',
    'form.submit': 'Generate Prompt',
    
    // Result section
    'result.title': 'Your Prompt',
    'result.copy': 'Copy to clipboard',
    'result.copied': 'Copied!',
    'result.regenerate': 'Regenerate',
    
    // History section
    'history.title': 'History',
    'history.empty': 'No history yet',
    'history.clear': 'Clear History',
    'history.cleared': 'History cleared',
    
    // Favorites section
    'favorites.title': 'Favorites',
    'favorites.empty': 'No favorites yet',
    'favorites.add': 'Add to Favorites',
    'favorites.remove': 'Remove from Favorites',
    'favorites.added': 'Added to favorites',
    'favorites.removed': 'Removed from favorites',
    'favorites.clear': 'Clear Favorites',
    'favorites.cleared': 'Favorites cleared',
    
    // Error messages
    'error.general': 'An error occurred. Please try again.',
    'error.requiredField': 'This field is required',
    
    // Loading states
    'loading.message': 'Loading...',
    
    // Sharing
    'share.title': 'Share',
    'share.copy': 'Copy',
    'share.copied': 'Copied!',
    'share.emailSubject': 'Check out this AI prompt',
    
    // Language and theme settings
    'language.pt-BR': 'Português',
    'language.en': 'English',
    'theme.dark': 'Dark Mode',
    'theme.light': 'Light Mode',
    
    // Prompt styles
    'style.creative': 'Creative',
    'style.professional': 'Professional',
    'style.academic': 'Academic',
    'style.technical': 'Technical',
    'style.conversational': 'Conversational',
    'style.storytelling': 'Storytelling',
    'style.persuasive': 'Persuasive',
    'style.instructional': 'Instructional',
  },
  'pt-BR': {
    // App general
    'app.title': 'Criador de Prompts IA',
    'app.description': 'Crie prompts poderosos para suas ferramentas de IA',
    
    // Navigation
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    
    // Form elements
    'form.subject': 'Assunto',
    'form.subject.placeholder': 'Sobre o que é o prompt?',
    'form.style': 'Estilo',
    'form.promptStyle': 'Estilo de Prompt',
    'form.promptStyle.placeholder': 'Selecione um estilo',
    'form.keywords': 'Palavras-chave',
    'form.keywords.placeholder': 'Digite palavras-chave (opcional)',
    'form.generate': 'Gerar',
    'form.regenerate': 'Regenerar',
    'form.submit': 'Gerar Prompt',
    
    // Result section
    'result.title': 'Seu Prompt',
    'result.copy': 'Copiar',
    'result.copied': 'Copiado!',
    'result.regenerate': 'Regenerar',
    
    // History section
    'history.title': 'Histórico',
    'history.empty': 'Sem histórico ainda',
    'history.clear': 'Limpar Histórico',
    'history.cleared': 'Histórico limpo',
    
    // Favorites section
    'favorites.title': 'Favoritos',
    'favorites.empty': 'Sem favoritos ainda',
    'favorites.add': 'Adicionar aos Favoritos',
    'favorites.remove': 'Remover dos Favoritos',
    'favorites.added': 'Adicionado aos favoritos',
    'favorites.removed': 'Removido dos favoritos', 
    'favorites.clear': 'Limpar Favoritos',
    'favorites.cleared': 'Favoritos limpos',
    
    // Error messages
    'error.general': 'Ocorreu um erro. Por favor, tente novamente.',
    'error.requiredField': 'Este campo é obrigatório',
    
    // Loading states
    'loading.message': 'Carregando...',
    
    // Sharing
    'share.title': 'Compartilhar',
    'share.copy': 'Copiar',
    'share.copied': 'Copiado!',
    'share.emailSubject': 'Confira este prompt de IA',
    
    // Language and theme settings
    'language.pt-BR': 'Português',
    'language.en': 'English',
    'theme.dark': 'Modo Escuro',
    'theme.light': 'Modo Claro',
    
    // Prompt styles
    'style.creative': 'Criativo',
    'style.professional': 'Profissional',
    'style.academic': 'Acadêmico',
    'style.technical': 'Técnico',
    'style.conversational': 'Conversacional',
    'style.storytelling': 'Narrativo',
    'style.persuasive': 'Persuasivo',
    'style.instructional': 'Instrucional',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'en'
  );

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const availableLanguages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'pt-BR' as Language, name: 'Português' }
  ];

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        t, 
        setLanguage, 
        availableLanguages 
      }}
    >
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
