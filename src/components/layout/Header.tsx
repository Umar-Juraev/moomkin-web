"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../assets/icons/Logo.svg";
import burgerIcon from "@/assets/icons/burder.svg";
import {
  Globe,
  HeartIcon,
  MapPin,
  Settings,
  AlertCircle,
  LogOut,
  X,
  AlignJustify,
} from "lucide-react";
import { Button } from "../ui/button";
import { LanguageSwitcher, Search } from "../shared";
import { useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n";
import { useDiscounts, useSearchSuggestions } from "@/hooks/useDiscount";
import useFavorites from "@/store/slices/useFavorites";
import { Badge } from "../ui/badge";
import { Link } from "@/i18n";
import SettingsModule from "@/modules/Settings";
import NProgress from "nprogress";
import useUI from "@/store/slices/useUI";

export default function Header() {
  const t = useTranslations();
  const params = useParams();
  const locale = params?.locale || "uz";
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [burger, setBurger] = useState(false);
  const [settingsDialog, setSettingsDialog] = useState(false);
  const router = useRouter();
  const { favorites } = useFavorites();
  const { storedSuggestions } = useUI()


  const suggestionQuery = useSearchSuggestions({
    search: searchQuery,
  })

  const handleFavorite = () => {
    if (!favorites.length) return
    NProgress.start();
    router.replace(`/${locale}/favorites`);
  }

  const handleSearchOpen = (isOpen: boolean) => {
    if (isOpen) {

    }
  }
  
  return (
    <div className="max-w-[1440px] mx-auto flex justify-between align-center bg-white px-10 h-20 md:h-auto md:block md:px-4">
      <div className="items-center hidden gap-[9px] font-semibold md:flex pb-[9px] pt-3.5">
        <MapPin />
        <div className="whitespace-nowrap">
          {/* <LocationDisplay /> */}
          {t('header.location')}
        </div>
      </div>
      <div
        className={cn(
          "flex items-center gap-9 w-full md:justify-between md:py-1"
        )}
      >
        <Link href="/">
          <Image src={logoIcon} alt="logo" />
        </Link>
        <div className="flex items-center gap-[9px] font-semibold md:hidden">
          <MapPin />
          <div className="whitespace-nowrap">
            {/* <LocationDisplay /> */}
            {t('header.location')}
          </div>
        </div>
        <Search
          placeholder={t('placeholder.search')}
          onSearch={setSearchQuery}
          isLoading={suggestionQuery.isFetching}
          onOpen={handleSearchOpen}
          data={suggestionQuery?.data?.data || storedSuggestions}
          className="ml-14 max-w-[560px] md:hidden"
        />
        <DropdownMenu onOpenChange={(isOpen) => setBurger(isOpen)}>
          <DropdownMenuTrigger
            asChild
            className="md:flex  w-12 h-12 rounded-full bg-main-light-gray hover:opacity-60 hidden justify-center items-center p-0 m-0 border-none shadow-none"
          >
            {!burger ? (
              <Button variant="outline" className="p-0">
                <Image src={burgerIcon} alt="menu" />
              </Button>
            ) : (
              <div>
                <X size={25} color="#292C30" />
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-62 shadow-[0px_8px_24px_0px_#3333331F,0px_0px_2px_0px_#33333314] border-none rounded-2xl"
            align="end"
          >
            {/* <DropdownMenuGroup className="p-4 m-0">
              {false ? (
                <DropdownMenuItem>Profile</DropdownMenuItem>
              ) : (
                 <Button variant="primary"className="w-full text-base font-bold">
                  {t("login")}
                </Button>
              )}
            </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator className="bg-[#919DA63D]" /> */}
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem
                onClick={() => { NProgress.start(); router.push("/favorites") }}
                className="cursor-pointer text-base font-medium p-3 relative"
              >
                {favorites.length ? (
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-xs"
                    variant="destructive"
                  >
                    {favorites.length}
                  </Badge>
                ) : (
                  <HeartIcon size={34} color="#292C30" />
                )}
                {t('header.saved')}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => { NProgress.start(); router.push("/settings") }}
                className="cursor-pointer text-base font-medium p-3"
              >
                <Settings size={34} color="#292C30" />{t('header.settings')}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-base font-medium p-3">
                <AlertCircle size={34} color="#292C30" className="rotate-180" />
                {t('header.aboutProgram')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator className="bg-[#919DA63D]" />
            <DropdownMenuGroup className="p-1">
              {true && (
                <DropdownMenuItem className="cursor-pointer text-base font-medium p-3">
                  <LogOut size={34} className="rotate-180" color="#292C30" />
                  {t("logout")}
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher
          onlyIcon
          className="w-12 !h-12 bg-main-light-gray flex items-center justify-center rounded-full"
        />
        <Button variant="primary" className="w-12" onClick={handleFavorite}>
          {favorites.length ? (
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-xs"
              variant="destructive"
            >
              {favorites.length}
            </Badge>
          ) : (
            <HeartIcon className="size-5.5" />
          )}
        </Button>
        <Button
          variant={'primary'}
          className="w-12 md:hidden"
          onClick={() => setSettingsDialog(true)}
        >
          <AlignJustify className="size-5.5" />
        </Button>
      </div>
      <Dialog open={settingsDialog} onOpenChange={setSettingsDialog}>
        <DialogContent className="p-0 border-none shadow-none rounded-2xl overflow-hidden gap-0 w-[744px]">
          <DialogHeader className="relative flex flex-row items-center px-4 h-19 border-b border-gray-200">
            <DialogTitle className="text-2xl font-extrabold mr-auto">
              {t('settings.title')}
            </DialogTitle>
            <DialogDescription className="hidden" />
          </DialogHeader>
          <SettingsModule />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// function LocationDisplay() {
//   const [location, setLocation] = useState<string>("");

//   useEffect(() => {
//     if (typeof window !== "undefined" && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation(`Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`);
//         },
//         () => {
//           setLocation("Город Ташкент");
//         }
//       );
//     } else {
//       setLocation("Город Ташкент");
//     }
//   }, []);

//   return <span>{location}</span>;
// }

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
