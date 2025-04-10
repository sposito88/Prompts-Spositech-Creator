
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'pt-BR' | 'en';

// Define translation values structure
type TranslationValues = {
  [key: string]: string;
};

// Translation dictionaries
const translations: Record<Language, TranslationValues> = {
  'pt-BR': {
    // Header
    'app.title': 'Spositech Prompt Generation',
    'app.description': 'Gere prompts personalizados para seu projeto',
    
    // Form
    'form.promptStyle': 'Estilo do Prompt',
    'form.promptStyle.placeholder': 'Selecione um estilo',
    'form.keywords': 'Palavras-chave ou Área de Aplicação',
    'form.keywords.placeholder': 'ex: marketing digital, vendas',
    'form.subject': 'Assunto',
    'form.subject.placeholder': 'ex: estratégia de conteúdo para Instagram',
    'form.submit': 'Gerar Prompt',
    
    // Prompt Styles
    'style.creative': 'Criativo',
    'style.professional': 'Profissional',
    'style.academic': 'Acadêmico',
    'style.technical': 'Técnico',
    'style.conversational': 'Conversacional',
    'style.storytelling': 'Narrativo',
    'style.persuasive': 'Persuasivo',
    'style.instructional': 'Instrucional',
    
    // Result
    'result.title': 'Seu Prompt',
    'result.regenerate': 'Gerar Novamente',
    'result.copy': 'Copiar',
    'result.copied': 'Copiado!',
    
    // Loading
    'loading.message': 'Gerando seu prompt perfeito...',
    
    // Errors
    'error.general': 'Ocorreu um erro. Tente novamente.',
    'error.requiredField': 'Este campo é obrigatório',
    
    // Theme toggle
    'theme.light': 'Modo Claro',
    'theme.dark': 'Modo Escuro',
    
    // Language toggle
    'language.en': 'English',
    'language.pt-BR': 'Português',
    
    // History and Favorites
    'history.title': 'Histórico',
    'history.empty': 'Sem histórico de prompts',
    'history.clear': 'Limpar histórico',
    'history.cleared': 'Histórico limpo',
    'favorites.title': 'Favoritos',
    'favorites.add': 'Adicionar aos favoritos',
    'favorites.remove': 'Remover dos favoritos',
    'favorites.added': 'Adicionado aos favoritos',
    'favorites.removed': 'Removido dos favoritos',
    'favorites.cleared': 'Favoritos limpos',
  },
  'en': {
    // Header
    'app.title': 'Spositech Prompt Generation',
    'app.description': 'Generate custom prompts for your project',
    
    // Form
    'form.promptStyle': 'Prompt Style',
    'form.promptStyle.placeholder': 'Select a style',
    'form.keywords': 'Keywords or Application Area',
    'form.keywords.placeholder': 'e.g. digital marketing, sales',
    'form.subject': 'Subject',
    'form.subject.placeholder': 'e.g. content strategy for Instagram',
    'form.submit': 'Generate Prompt',
    
    // Prompt Styles
    'style.creative': 'Creative',
    'style.professional': 'Professional',
    'style.academic': 'Academic',
    'style.technical': 'Technical',
    'style.conversational': 'Conversational',
    'style.storytelling': 'Storytelling',
    'style.persuasive': 'Persuasive',
    'style.instructional': 'Instructional',
    
    // Result
    'result.title': 'Your Prompt',
    'result.regenerate': 'Regenerate',
    'result.copy': 'Copy',
    'result.copied': 'Copied!',
    
    // Loading
    'loading.message': 'Generating your perfect prompt...',
    
    // Errors
    'error.general': 'An error occurred. Please try again.',
    'error.requiredField': 'This field is required',
    
    // Theme toggle
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
    
    // Language toggle
    'language.en': 'English',
    'language.pt-BR': 'Português',
    
    // History and Favorites
    'history.title': 'History',
    'history.empty': 'No prompt history',
    'history.clear': 'Clear history',
    'history.cleared': 'History cleared',
    'favorites.title': 'Favorites',
    'favorites.add': 'Add to favorites',
    'favorites.remove': 'Remove from favorites',
    'favorites.added': 'Added to favorites',
    'favorites.removed': 'Removed from favorites',
    'favorites.cleared': 'Favorites cleared',
  }
};

// Create context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'pt-BR',
  setLanguage: () => {},
  t: () => '',
});

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
