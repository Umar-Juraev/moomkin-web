"use client";
import React, { useState } from "react";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher/LanguageSwitcher";
import {
  ArrowLeft,
  LifeBuoy,
  Settings as SettingsIcon,
  Shield,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter, useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const locale = params?.locale || "uz";
  const tabItems = [
    {
      value: "general",
      label: t("settings.general"),
      icon: <SettingsIcon className="size-5.5" />,
    },
    // {
    //   value: "security",
    //   label: "Security",
    //   icon: <Shield className="size-5.5" />,
    // },
    {
      value: "support",
      label: t("settings.support"),
      icon: <LifeBuoy className="size-5.5" />,
    },
  ];
  const [tab, setTab] = useState("general");
  const [notifications, setNotifications] = useState(false);
  const router = useRouter();
  return (
    <div className="flex w-full  justify-center bg-white md:fixed md:h-screen md:top-0 md:left-0 md:block">
      <div className="hidden w-full  py-3 relative md:flex md:justify-center">
        <div
          className="w-10 absolute left-[21px]"
          onClick={() => router.push(`/${locale}`)}
        >
          <ArrowLeft />
        </div>
        <h4 className="text-center text-lg leading-6 font-bold">
          {t("settings.title")}
        </h4>
      </div>
      <div className="flex flex-col  p-6 min-w-[220px] md:flex-row md:p-0 md:px-2">
        {tabItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setTab(item.value)}
            className={`relative cursor-pointer flex items-center w-full text-base p-3 font-medium gap-3 transition rounded-[12px] md:flex md:justify-center md:w-auto  ${
              tab === item.value ? "bg-[#F2F5F7] md:bg-white" : "bg-transparent"
            }`}
          >
            <div className="md:hidden">{item.icon}</div>
            <div>{item.label}</div>
            <div
              className={cn(
                "hidden md:block",
                tab === item.value
                  ? "absolute w-[37px] h-[3px] bg-red bottom-1 rounded-2xl"
                  : "absolute w-[37px] h-[3px] bg-white bottom-1 rounded-2xl"
              )}
            />
          </button>
        ))}
      </div>
      <div className="flex-1 flex flex-col gap-10 justify-center p-6 mb-[100px]">
        {tab === "general" && (
          <div className="flex flex-col gap-10">
            <div className="flex items-start justify-between ">
              <div>
                <div className="font-medium text-base mb-1">
                  {t("settings.appLang")}
                </div>
                <p className="text-[#919DA6] text-[13px] leading-4.5 max-w-xl">
                  {t("settings.appLangDesc")}
                </p>
              </div>
              <div>
                <LanguageSwitcher />
              </div>
            </div>
            {/* Notification */}
            {/* <div className="flex items-start justify-between ">
              <div className="w-[88%]">
                <div className="font-medium text-base mb-1">Xabarnoma</div>
                <p className="text-[#919DA6] text-[13px]  leading-4.5 ">
                  Hisobingiz va barcha bog&apos;liq ma&apos;lumotlaringiz
                  butunlay o&apos;chiriladi. Bu amalni bekor qilib
                  bo&apos;lmaydi.
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
                className="w-[51px] h-[31px] data-[state=checked]:bg-red data-[state=unchecked]:bg-[#E5E7EB] transition-colors duration-200 border-none shadow-md [&_[data-slot=switch-thumb]]:w-[29px] [&_[data-slot=switch-thumb]]:h-[28px] [&_[data-slot=switch-thumb]]:bg-white [&_[data-slot=switch-thumb]]:shadow-md"
                aria-pressed={notifications}
              />
            </div> */}
          </div>
        )}

        {/* {tab === "security" && (
          <div className="flex items-start justify-between ">
            <div>
              <div className="font-medium text-base mb-1">
                Hisobni o&apos;chirish
              </div>
              <p className="text-[#919DA6] text-[13px]  leading-4.5 max-w-xl">
                Hisobingiz va barcha bog&apos;liq ma&apos;lumotlaringiz butunlay
                o&apos;chiriladi. Bu amalni bekor qilib bo&apos;lmaydi.
              </p>
            </div>
            <button className="bg-[#E45717] h-10 text-white text-sm font-bold rounded-full px-4  whitespace-nowrap hover:opacity-90 transition cursor-pointer">
              Hisobni o&apos;chirish
            </button>
          </div>
        )} */}
        {tab === "support" && (
          <div className="flex flex-col gap-10">
            {/* Phone Support */}
            <div className="flex items-start justify-between ">
              <div>
                <div className="mb-1 font-medium text-base leading-5  ">
                  +998990370117
                </div>
                <p className="text-[#919DA6] text-[13px]  leading-4.5 max-w-xl">
                  {t("settings.phoneDesc")}
                </p>
              </div>
              <a href="tel:+998990370117" className="cursor-pointer">
                <button className="cursor-pointer bg-[#F6F7F8] rounded-full h-10 px-4 text-sm font-bold text-[#23272F] whitespace-nowrap hover:opacity-90 transition">
                  {t("settings.call")}
                </button>
              </a>
            </div>
            {/* Telegram Support */}
            <div className="flex items-start justify-between ">
              <div>
                <div className="mb-1 font-medium text-base leading-5 ">
                  @moomkinadmin
                </div>
                <p className="text-[#919DA6] text-[13px]  leading-4.5 w-[90%]">
                  {t("settings.tgDesc")}
                </p>
              </div>
              <a
                href="https://t.me/moomkinadmin"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <button className="cursor-pointer bg-[#F6F7F8] rounded-full h-10 px-4 text-sm font-bold text-[#23272F] whitespace-nowrap hover:opacity-90 transition">
                  {t("settings.write")}
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
