import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Import translations - using require to avoid TypeScript issues with JSON imports
import enTranslation from "../locales/en.json";
import zhTranslation from "../locales/zh.json";

// Initialize i18next
i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Default language
    fallbackLng: "en",
    // Debug mode in development
    debug: process.env.NODE_ENV === "development",
    // Resources with translations
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    // Common namespace used around the app
    defaultNS: "translation",
    // React settings
    react: {
      useSuspense: true,
    },
    // Interpolation settings
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
