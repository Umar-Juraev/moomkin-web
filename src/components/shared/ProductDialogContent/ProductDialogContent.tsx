"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDateRange } from "@/utils/date";
import Image from "next/image";
import calendarIcon from "@/assets/icons/calendar.svg";
import locationIcon from "@/assets/icons/location.svg";
import telegramIcon from "@/assets/icons/telegram.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import phoneIcon from "@/assets/icons/phone.svg";
// import shareIcon from "@/assets/icons/share.svg";
import React, { FC, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YMap from "../YMap/YMap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDiscount, useSeenDiscount } from "@/hooks/useDiscount";
import { CloseIcon, FavoriteDialogIcon, ShareIcon } from "@/assets/icons";
import useFavorites from "@/store/slices/useFavorites";
import { CompanyAddressDTO, DiscountDTO } from "@/types/DTO";
import { ContactTypeIdEnum } from "@/constants/enums";
import { X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonDialog from "../SkeletonDialog/SkeletonDialog";
import { useTranslation } from "react-i18next";
import ReadMore from "../Readmore/Readmore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CarouselIndicators from "../CarouselIndicators/CarouselIndicators";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

interface Props {
  onClose: () => void;
  discountId: number;
}

const ProductDialogContent: FC<Props> = ({ onClose, discountId }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useTranslation();
  const [api, setApi] = React.useState<CarouselApi>()
  const isMobile = useMediaQuery("(max-width: 768px)");
  const hasSeenPosted = useRef(false);

  const handleSaveTofavorite = (data: DiscountDTO) => {
    toggleFavorite(data);
  };

  const { data: discountData, isFetching } = useDiscount(discountId);
  const postSeenDiscount = useSeenDiscount()
  const data = discountData?.data;

  const [location, setLocation] = useState<CompanyAddressDTO>();
  const handleGetLocation = (location: CompanyAddressDTO) => {
    setLocation(location)
  }
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "This is a cool thing to share.",
          url: window.location.href,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  const handleNavigate = (lat: number, lng: number) => {
    const url = `https://yandex.com/maps/?rtext=~${lat},${lng}`;
    window.open(url, "_self");
  };

useEffect(() => {
    if (!hasSeenPosted.current) {
      postSeenDiscount.mutateAsync(discountId);
      hasSeenPosted.current = true; 
    }
  }, [discountId, postSeenDiscount]); 

  useEffect(() => {
    if (data?.company?.addresses && data.company.addresses.length > 0) {
      setLocation(data.company.addresses[0]);
    }
  }, [data]);

  if (isFetching || !data) return <SkeletonDialog />;


  return (
    <div className="text-text-dark border-none shadow-none p-0 m-0 md:overflow-y-auto md:h-max">
      <div className="flex p-0 m-0 md:flex-col md:relative">
        <div className="relative md:w-full p-2 md:pt-1 md:rounded-none">
          <Carousel setApi={setApi} className="rounded-3xl overflow-hidden">
            <CarouselContent className="rounded-3xl ml-0 h-[600px] w-[480px] md:max-h-[429px] md:w-full">
              {data?.attachments
                .filter(({ type }) => type === "original")
                .map((item) => {

                  return (
                    // Add relative positioning to CarouselItem
                    <CarouselItem key={item.id} className="p-1 md:pb-0 relative">
                      <Image
                        src={item.attachment.url}
                        blurDataURL={item.attachment.url}
                        alt={data.name}
                        fill
                        className="object-contain"
                        placeholder="blur"
                      />
                    </CarouselItem>
                  )
                })}
            </CarouselContent>
            {(data?.attachments.length > 1 && !isMobile) &&
              <>
                <CarouselPrevious className="left-3 w-11 h-11 bg-[#000000CC] text-white border-none" />
                <CarouselNext className="right-3 w-11 h-11 bg-[#000000CC] text-white border-none" />
              </>
            }
            {(isMobile && data?.attachments.length > 1) && (<CarouselIndicators className="absolute bottom-3 right-3" api={api} />)}
          </Carousel>
          {data.tags.map((tag) => {
            return (
              <span
                key={tag.id}
                className={`
              absolute left-5  rounded-[22px]  px-2 text-base font-bold h-8 flex items-center justify-center
              ${"md:bottom-5 md:top-auto md:left-32"} top-5
            `}
                style={{
                  backgroundColor: tag.Color,
                  color: tag.TextColor,
                }}
              >
                {tag.Name}
              </span>
            )
          })}
          <span className="absolute bottom-5 left-5 overflow-hidden rounded-[14px] border border-white  shadow-[0px 0.5px 2px 0px #33333314] md:bottom-5">
            <Image
              src={data.company.icon_url}
              alt={data.company.name}
              width={94}
              height={94}
              className="object-cover h-[94px]"
            />
          </span>
        </div>
        <div className="w-[432px] pt-16 pl-4 relative md:static md:pt-1 md:w-full md:px-4">
          <div className="flex absolute top-4 left-4 gap-2 mr-6 md:mr-0 md:w-[92%] md:top-4.5 md:left-5">
            <div
              className="h-10 w-10 cursor-pointer rounded-full bg-main-light-gray flex items-center justify-center md:backdrop-blur-[4px] md:bg-[var(--Background-Tertiary,#B4C0CC47)]"
              onClick={() => handleSaveTofavorite(data)}
            >
              <FavoriteDialogIcon active={isFavorite(data.id)} />
            </div>
            <div
              onClick={handleShare}
              className="h-10 w-10 rounded-full bg-main-light-gray flex items-center justify-center cursor-pointer md:backdrop-blur-[4px] md:bg-[var(--Background-Tertiary,#B4C0CC47)]"
            >
              <ShareIcon />
            </div>
            <div
              onClick={onClose}
              className="hidden h-10 w-10 rounded-full bg-main-light-gray md:flex items-center justify-center cursor-pointer md:backdrop-blur-[4px] md:bg-[var(--Background-Tertiary,#B4C0CC47)] md:absolute md:right-1.5 md:top-0"
            >
              <CloseIcon />
            </div>
          </div>

          <div className="h-[464px]  overflow-y-auto md:overflow-y-visible md:h-max">
            <p className="hidden md:block text-base font-medium text-[#656E78] uppercase">{data.company.name}</p>
            <h6 className="mb-2 font-bold text-[28px] mr-6 md:mr-0 md:text-2xl">{data.name}</h6>
            <ReadMore className='mb-3 mr-6 md:mr-0' text={data.description} maxChars={130} />
            <div className="bg-main-light-gray rounded-2xl px-3 py-2 mb-3 mr-6 md:mr-0">
              <div className="flex items-center gap-1 mb-0.5">
                <Image src={calendarIcon} alt={data.name} />
                <p className="font-normal  align-middle">
                  {formatDateRange(data.start_date, data.end_date)}
                </p>
              </div>
              {data.company.addresses &&
                <div className="flex items-center gap-1">
                  <Image src={locationIcon} alt={data.name} />
                  <p className="font-normal  align-middle">{location?.name || data.company.addresses[0].name}</p>
                </div>
              }
            </div>
            {data.company.addresses?.length > 1 && <div className="text-lg font-bold py-2">{t('addresses')}</div>}
            {data.company.addresses &&
              <Tabs
                className="border-none shadow-none p-0 m-0 "
                defaultValue={data.company.addresses[0].name}
              >
                {data.company.addresses.length > 1 && (
                  <TabsList className="border-none shadow-none p-0 m-0 bg-white rounded-none mr-6 md:mr-0">
                    {data.company.addresses.map((location) => (
                      <TabsTrigger
                        onClick={() => handleGetLocation(location)}
                        className="shadow-none  py-2.5 px-3 m-0 text-sm bg-white rounded-none"
                        key={location.id}
                        value={location.name}
                      >
                        {location.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                )}
                {
                  data.company.addresses.map((location) => {
                    return (
                      <TabsContent
                        className="  border-none shadow-none p-0 m-0"
                        key={location.id}
                        value={location.name}
                      >
                        <div className="mr-6 md:mr-0 md:mb-6">
                          <div className="mt-3 h-42.5 flex items-center justify-center">
                            <YMap location={location} />
                          </div>
                        </div>
                      </TabsContent>
                    )
                  })}
              </Tabs>
            }
            {(() => {
              const workingHours = data.company.working_hours;

              if (!workingHours?.length) {
                return <p>Время работы не указано</p>;
              }

              const is24Hours = (timeFrom: string, timeTo: string) => {
                return timeFrom === "00:00" && timeTo === "00:00";
              };

              const weekdays = workingHours.slice(0, 5); // Monday to Friday
              const weekends = workingHours.slice(5);    // Saturday and Sunday

              const allWeekdays24 = weekdays.every(day => is24Hours(day.time_from, day.time_to));
              const allWeekends24 = weekends.every(day => is24Hours(day.time_from, day.time_to));
              const allDays24 = allWeekdays24 && allWeekends24;

              return (
                <>
                  <div className="text-lg font-bold pt-6 pb-2">{t('workTime')}</div>

                  {allDays24 ? (
                    <p>{t('everyDay')}: 24 {t('hours')}</p>
                  ) : allWeekdays24 && !allWeekends24 ? (
                    <>
                      <p>{t('weekdays')}: 24 {t('hours')}</p>
                      <p>
                        {t('weekends')}: {weekends[0].time_from || "—"} — {weekends[0].time_to || "—"}
                      </p>
                    </>
                  ) : !allWeekdays24 && allWeekends24 ? (
                    <>
                      <p>
                        {t('weekdays')}: {weekdays[0].time_from || "—"} — {weekdays[0].time_to || "—"}
                      </p>
                      <p>{t('weekends')}: 24 {t('hours')}</p>
                    </>
                  ) : (
                    <>
                      <p>
                        {t('weekdays')}: {weekdays[0].time_from || "—"} — {weekdays[0].time_to || "—"}
                      </p>
                      <p>
                        {t('weekends')}: {weekends[0].time_from || "—"} — {weekends[0].time_to || "—"}
                      </p>
                    </>
                  )}
                </>
              );
            })()}

            {(() => {
              const links = data?.company.links || [];
              const phoneLinks = links.filter(link => link.type_id === ContactTypeIdEnum.Phone);
              const socialLinks = links
                .filter(link => link.type_id !== ContactTypeIdEnum.Phone)
                .map(link => ({
                  ...link,
                  value: link.type_id === ContactTypeIdEnum.Email ? `mailto:${link.value}` : link.value,
                }));
              return (
                <>
                  {phoneLinks.length > 0 && (
                    <div className="pt-6">
                      <div className="text-lg font-bold pb-2">{t('phoneNumbers')}</div>
                      {phoneLinks.map(({ value }, i) => (
                        <p className="pb-1" key={i}>
                          <Link href={`tel:${value}`}>
                            {value}
                          </Link>
                        </p>
                      ))}
                    </div>
                  )}
                  {socialLinks.length > 0 && (
                    <div className="pt-6">
                      <div className="text-lg font-bold pb-2">{t('socialNetworks')}</div>
                      <div className="flex gap-2 mb-4">
                        {socialLinks.map(({ value, icon_url, name }, i) => (
                          <Link
                            key={i}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full bg-main-light-gray"
                          >
                            <Image
                              src={icon_url}
                              width={24}
                              height={24}
                              alt={name}
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
            {/* } */}
          </div>
          <div className="flex gap-2 py-4  bottom-0 right-0 md:fixed md:bottom-0 md:bg-white mr-4 md:mr-0 md:grid md:grid-cols-[1fr_1fr] md:w-full md:px-4">
            {location && (<Button
              onClick={() => handleNavigate(location.lat, location.lng)}
              className="text-lg font-semibold w-[190px] h-14 rounded-4xl flex items-center justify-center md:w-auto"
            >
              {t('route')}
            </Button>
            )}
            {(() => {
              const links = data?.company.links || [];
              const phoneLinks = links.filter(link => link.type_id === ContactTypeIdEnum.Phone);
              return (

                <Button variant="primary" className="text-lg font-semibold w-[200px] h-14 rounded-4xl flex items-center justify-center bg-red text-white md:w-auto">
                  <Link href={`tel:${phoneLinks[0].value}`}>
                    {t('call')}
                  </Link>
                </Button>
              );
            })()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDialogContent;
