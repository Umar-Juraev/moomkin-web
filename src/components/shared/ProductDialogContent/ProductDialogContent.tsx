"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { calculateDiscountPercentageFormatted } from "@/utils/data";
import { formatDateRange } from "@/utils/date";
import Image from "next/image";
import calendarIcon from "@/assets/icons/calendar.svg";
import locationIcon from "@/assets/icons/location.svg";
import telegramIcon from "@/assets/icons/telegram.svg";
import instagramIcon from "@/assets/icons/instagram.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import shareIcon from "@/assets/icons/share.svg";
import React, { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import YMap from "../YMap/YMap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDiscount } from "@/hooks/useDiscount";
import { FavoriteIcon } from "@/assets/icons";
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
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleSaveTofavorite = (id: number) => {
    setFavorite((prev) => !prev);
  };
  const { data: discountData, isFetching } = useDiscount(discountId);
  const data = discountData?.data;

  console.log(data);


  if (isFetching || !data) return <div>...loading</div>;

  return (
    <div className="animate-fade-in text-text-dark border-none shadow-none p-0 m-0 md:overflow-y-auto">
      <div className="flex p-0 m-0 md:flex-col">
        <div className="relative w-full p-2 max-h-[600px] md:max-h-max md:rounded-none">
          <Carousel className="rounded-3xl overflow-hidden">
            <CarouselContent className="rounded-3xl overflow-hidden ml-0 h-[600px] w-[480px] md:max-h-[429px] md:w-full">
              {data?.attachments.filter(({type})=>type === 'original').map((item, i) => (
                <CarouselItem key={i} className="p-1">
                  <Image
                    src={item.attachment.url}
                    alt={data.description}
                    fill
                    className="object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 w-11 h-11 bg-[#000000CC] text-white" />
            <CarouselNext className="right-3 w-11 h-11 bg-[#000000CC] text-white" />
          </Carousel>
          <span className="absolute top-5 left-5 bg-[#16C602] rounded-[22px] text-white text-base font-bold h-8 w-33 flex items-center justify-center">
            {calculateDiscountPercentageFormatted(
              data.price,
              data.discount_price
            )}
            {' '} скидка
          </span>
          <span className="absolute bottom-[21px] left-[21px] overflow-hidden rounded-[14px] border border-white  shadow-[0px 0.5px 2px 0px #33333314]">
            <Image
              src={data.company.icon_url}
              alt={data.company.name}
              width={94}
              height={94}
            />
          </span>
        </div>
        <div className="pt-16 pl-4 pr-6 relative">
          <div className="flex absolute top-4 left-4 gap-2">
            <div
              className="h-10 w-10 rounded-full bg-main-light-gray flex items-center justify-center"
              onClick={() => handleSaveTofavorite(data.id)}
            >
              <FavoriteIcon active={favorite} />
            </div>
            <div className="h-10 w-10 rounded-full bg-main-light-gray flex items-center justify-center">
              <Image src={shareIcon} alt={data.name} />
            </div>
          </div>
          <h6 className="mb-2 font-bold text-[28px]">{data.name}</h6>
          <p className="mb-3">{data.description}</p>
          <div className="bg-main-light-gray rounded-2xl px-3 py-2 mb-3">
            <div className="flex items-center gap-1 mb-0.5">
              <Image src={calendarIcon} alt={data.name} />
              <p className="font-normal  align-middle">
                {formatDateRange(data.start_date, data.end_date)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Image src={locationIcon} alt={data.name} />
              <p className="font-normal  align-middle">Novza</p>
            </div>
          </div>
          <div className="text-lg font-bold py-2">Адреса</div>
          <Tabs
            className="border-none shadow-none p-0 m-0"
            defaultValue={data.company.addresses[0].name}
          >
            <TabsList className="border-none shadow-none p-0 m-0 bg-white rounded-none">
              {data.company.addresses.map((location) => (
                <TabsTrigger
                  className="shadow-none  py-2.5 px-3 m-0 text-sm bg-white rounded-none"
                  key={location.id}
                  value={location.name}
                >
                  {location.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {data.company.addresses.map((location) => (
              <TabsContent
                className="animate-fade-in border-none shadow-none p-0 m-0 max-h-[190px] overflow-y-auto md:overflow-y-visible md:max-h-max"
                key={location.id}
                value={location.name}
              >
                <div className="h-42.5 flex items-center justify-center">
                  <YMap location={location} />
                </div>
                <div className="text-lg font-bold pt-6 pb-2">Время работы</div>
                <p className="pb-1">Будние дни: 10:00 — 22:00</p>
                <p>Выходные: 12:00 — 20:00</p>
                <div className="text-lg font-bold pt-6 pb-2">
                  Телефонные номера
                </div>
                <p className="pb-1">+998 90 000 00 00</p>
                <p>+998 90 000 10 00</p>
                <div className="text-lg font-bold pt-6 pb-2">
                  Социальные сети
                </div>
                <div className="flex gap-2 mb-4">
                  {data.company.links.map((item, i) => (
                    <Link
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-main-light-gray"
                      href={item.value}
                      key={i}
                    >
                      <Image src={item.icon_url} width={48} height={48} alt={item.name} />
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex gap-2 py-4 md:fixed md:bottom-0 md:bg-white md:w-full">
            <Button className="text-lg font-semibold w-50 h-14 rounded-4xl flex items-center justify-center">
              Маршрут
            </Button>
            <Button className="text-lg font-semibold w-50 h-14 rounded-4xl flex items-center justify-center bg-red text-white">
              Позвонить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDialogContent;
