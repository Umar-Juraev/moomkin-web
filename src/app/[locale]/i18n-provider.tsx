"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface I18nProviderProps {
  children: React.ReactNode;
  initialLocale: string;
}
const queryClient = new QueryClient();
export default function I18nProvider({
  children,
  initialLocale,
}: I18nProviderProps) {
  useEffect(() => {
    if (i18n.language !== initialLocale) {
      i18n.changeLanguage(initialLocale);
    }
  }, [initialLocale]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
}
