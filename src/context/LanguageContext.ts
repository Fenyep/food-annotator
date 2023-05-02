import React from "react";

interface LngContextType {
    langs?: Record<string, Language>,
    getLangIcon: (languageCode: string) => string
}

interface Language {
    nativeName: string
}

export const LanguageContext = React.createContext<LngContextType | undefined>(undefined);