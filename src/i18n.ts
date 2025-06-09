// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import i18nConfig from "./i18nConfig";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: i18nConfig.defaultLocale, // uz
    supportedLngs: i18nConfig.locales, // ['uz', 'ru', 'en']
    nonExplicitSupportedLngs: true,
    debug: false,
    detection: {
      order: ["cookie", "queryString", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
      lookupCookie: "NEXT_LOCALE", 
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    ns: ["common"],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  });

export default i18n;
