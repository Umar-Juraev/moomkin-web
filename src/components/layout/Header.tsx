"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../assets/icons/Logo.svg";
import burgerIcon from "@/assets/icons/burder.svg";
import { Globe, HeartIcon, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { LanguageSwitcher, Search } from "../shared";
import { SearchData } from "../shared/Search/Search";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

export default function Header() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchData | null>(null);
  const [burger, setBurger] = useState<boolean>(false);
  //   const [latitude, setLatitude] = useState<number | null>(null);
  // const [longitude, setLongitude] = useState<number | null>(null);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setError('Geolocation is not supported by your browser');
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     },
  //     (err) => {
  //       setError(err.message);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    if (burger) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [burger]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsLoading(true);

      // Simulating API call
      setTimeout(() => {
        setSearchResults({
          suggestions: [
            {
              id: "1",
              label: "Calendar",
              onSelect: () => console.log("Calendar selected"),
            },
            {
              id: "2",
              label: "Search Emoji",
              onSelect: () => console.log("Search Emoji selected"),
            },
          ],
          settings: [
            {
              id: "4",
              label: "Profile",
              onSelect: () => console.log("Profile selected"),
            },
            {
              id: "5",
              label: "Settings",
              onSelect: () => console.log("Settings selected"),
            },
          ],
        });
        setIsLoading(false);
      }, 500);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);
  return (
    <header className="flex justify-between align-center bg-white px-10 h-20 md:h-auto md:block">
      <div className="items-center hidden gap-[9px] font-semibold md:flex pb-[9px] pt-3.5">
        <MapPin />
        <div className="whitespace-nowrap">Город Ташкент</div>
      </div>
      <div
        className={cn(
          "animate-fade-in  flex items-center gap-9 w-full md:justify-between md:py-1  md:relative ", burger && 'z-16')}
      >
        <Image src={logoIcon} alt="logo" />
        <div className="flex items-center gap-[9px] font-semibold md:hidden">
          <MapPin />
          <div className="whitespace-nowrap">Город Ташкент</div>
        </div>
        <Search
          placeholder="Ищите горячие скидки"
          onSearch={setSearchQuery}
          isLoading={isLoading}
          data={searchResults}
          className="pl-14 max-w-[560px] md:hidden"
        />
        <div
          onClick={() => setBurger((prev) => !prev)}
          className="md:flex  w-12 h-12 rounded-full bg-main-light-gray hover:opacity-60 hidden justify-center items-center"
        >
          <Image src={burgerIcon} alt="menu" />
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 w-screen h-screen px-4 bg-white z-10 transform transition-transform duration-300 pt-[120px]",
          burger ? "translate-x-0" : "-translate-x-full"
        )}
      ></div>

      <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher onlyIcon className="w-12 !h-12 bg-main-light-gray flex items-center justify-center rounded-full" />
        <Button className="w-12">
          <HeartIcon />
        </Button>
        <Button>{t("login")}</Button>
      </div>
    </header>
  );
}
