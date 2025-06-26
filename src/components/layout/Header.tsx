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
} from "lucide-react";
import { Button } from "../ui/button";
import { LanguageSwitcher, Search } from "../shared";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDiscounts } from "@/hooks/useDiscount";
import useFavorites from "@/store/slices/useFavorites";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function Header() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [burger, setBurger] = useState(false);
  const router = useRouter();
  const { favorites } = useFavorites();

  const { data, isFetching } = useDiscounts({
    search: searchQuery,
  });

  return (
    <div className="flex justify-between align-center bg-white px-10 h-20 md:h-auto md:block md:px-4">
      <div className="items-center hidden gap-[9px] font-semibold md:flex pb-[9px] pt-3.5">
        <MapPin />
        <div className="whitespace-nowrap">
          {/* <LocationDisplay /> */}
          Город Ташкент
        </div>
      </div>
      <div
        className={cn(
          "animate-fade-in  flex items-center gap-9 w-full md:justify-between md:py-1"
        )}
      >
        <Link href={"/"}>
          <Image src={logoIcon} alt="logo" />
        </Link>
        <div className="flex items-center gap-[9px] font-semibold md:hidden">
          <MapPin />
          <div className="whitespace-nowrap">
            {/* <LocationDisplay /> */}
            Город Ташкент
          </div>
        </div>

        <Search
          placeholder="Ищите горячие скидки"
          onSearch={setSearchQuery}
          isLoading={isFetching}
          data={data?.data.data || []}
          className="pl-14 max-w-[560px] md:hidden"
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
            <DropdownMenuGroup className="p-4 m-0">
              {false ? (
                <DropdownMenuItem>Profile</DropdownMenuItem>
              ) : (
                <Button className="w-full text-base font-bold">
                  {t("login")}
                </Button>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#919DA63D]" />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem
                onClick={() => router.push("/favorites")}
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
                Saved
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-base font-medium p-3">
                {" "}
                <Settings size={34} color="#292C30" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-base font-medium p-3">
                {" "}
                <AlertCircle
                  size={34}
                  color="#292C30"
                  className="rotate-180"
                />{" "}
                About the program
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#919DA63D]" />
            <DropdownMenuGroup className="p-1">
              {true && (
                <DropdownMenuItem className="cursor-pointer text-base font-medium p-3">
                  <LogOut size={34} className="rotate-180" color="#292C30" />{" "}
                  {t("logout")}
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <LanguageSwitcher
          onlyIcon
          className="w-12 !h-12 bg-main-light-gray flex items-center justify-center rounded-full"
        />
        <Button className="w-12" onClick={() => router.push("/favorites")}>
          {favorites.length ? (
            <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-xs"
              variant="destructive"
            >
              {favorites.length}
            </Badge>
          ) : (
            <HeartIcon />
          )}
        </Button>
        <Button>{t("login")}</Button>
      </div>
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
