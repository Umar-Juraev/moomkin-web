"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import i18nConfig from "../../../i18nConfig";
import { cn } from "@/lib/utils"
import NProgress from "nprogress";

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
}

const languageOptions: LanguageOption[] = [
  { value: "uz", label: "O'zbekcha", flag: "🇺🇿" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "en", label: "English", flag: "🇬🇧" },
];
interface Props {
  className?: string,
  onlyIcon?: boolean
}

function LanguageSwitcher({ className, onlyIcon }: Props) {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = i18n.language;
  const handleLanguageChange = async (newLocale: string) => {
    await i18n.changeLanguage(newLocale);
    const segments = pathname.split("/");
    let newPath = "";

    if (i18nConfig.locales.includes(segments[1])) {
      segments.splice(1, 1);
    }

    if (i18nConfig.prefixDefault || newLocale !== i18nConfig.defaultLocale) {
      newPath = `/${newLocale}${segments.join("/")}`;
    } else {
      newPath = segments.join("/");
    }

    NProgress.start();
    router.push(newPath || "/");
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger icon={false} id="language-select" value={'xaxaxa'} className={cn("w-auto border-none rounded-none shadow-none focus-visible:ring-0, cursor-pointer text-lg font-medium", className)}>
        <SelectValue className="font-bold text-2xl" placeholder={t("change_language")} />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {onlyIcon ? option.value.toUpperCase() : `${option.flag} ${option.label}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
export default LanguageSwitcher;
