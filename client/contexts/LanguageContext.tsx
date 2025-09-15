import { createContext, useState, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// Define the context interface
type LanguageContextType = {
  language: string;
  changeLanguage: (lang: string) => void;
};

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create a hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Create the language provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    // Store the language preference in localStorage
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};