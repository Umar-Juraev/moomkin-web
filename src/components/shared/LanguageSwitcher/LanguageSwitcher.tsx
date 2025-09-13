"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from "next/navigation";
import { routing } from "../../../i18n";
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
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = async (newLocale: string) => {
    const segments = pathname.split("/");
    let newPath = "";

    if (routing.locales.includes(segments[1] as any)) {
      segments.splice(1, 1);
    }

    // Always prefix with locale since we're using 'always' prefix
    newPath = `/${newLocale}${segments.join("/")}`;

    NProgress.start();
    router.push(newPath || "/");
  };

  return (
    <Select value={currentLocale} onValueChange={handleLanguageChange}>
      <SelectTrigger icon={false} id="language-select"  className={cn("w-auto border-none rounded-none shadow-none focus-visible:ring-0, cursor-pointer text-lg font-medium", className)}>
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
