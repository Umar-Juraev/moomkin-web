"use client";
import { DiscountDTO } from "@/types/DTO";
import Image from "next/image";
import React, { FC, useState, useTransition, startTransition } from "react";
import calendarIcon from "@/assets/icons/calendar.svg";
import locationIcon from "@/assets/icons/location.svg";
import { formatDateRange } from "@/utils/date";
import { FavoriteIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import useFavorites from "@/store/slices/useFavorites";
import { useOptimistic } from "react";
import { log } from "util";
import { useTranslations, useLocale } from 'next-intl';

interface Props {
  data: DiscountDTO;
  onClick: (discountId: number) => void;
  className?: string
}
const ProductCard: FC<Props> = ({ data, onClick, className }) => {
  const { toggleFavorite, isFavorite, favorites } = useFavorites();
  const t = useTranslations();
  const locale = useLocale();
  const [optimisticFavorites, addFavorite] = useOptimistic(
    favorites,
    (state, discount: DiscountDTO) => {
      const exists = state.some(item => item.id === discount.id);
      return exists
        ? state.filter(item => item.id !== discount.id)
        : [...state, discount];
    }
  );

  const handleSaveTofavorite = React.useCallback(
    (data: DiscountDTO) => {
      startTransition(() => {
        addFavorite(data); // instant UI update
      });
      toggleFavorite(data); // server update
    },
    [addFavorite, toggleFavorite]
  );

  return (
    <div className={cn("border-none rounded-t-[22px] ", className)}>
      <div className="rounded-[22px] mb-1.5 h-[236.44px] overflow-hidden flex flex-col relative">
        {data.attachments[0]?.attachment?.url ? (
          <Image
            onClick={() => onClick(data.id)}
            src={data.attachments[0].attachment.url}
            alt={data.name}
            fill
            className="object-cover h-full cursor-pointer hover:opacity-60 transition-all duration-300"
            sizes="(max-width: 768px) 100vw"
          />
        ) : (
          <div onClick={() => onClick(data.id)} className="cursor-pointer bg-gray-200 w-full h-full" />
        )}
        {data.tags.map((tag) => (
          <span
            key={tag.id}
            className="absolute top-2 left-2 rounded-[22px] px-2 text-base font-bold h-8 flex items-center justify-center"
            style={{
              backgroundColor: tag.Color,
              color: tag.TextColor,
            }}
          >
            {tag.Name}
          </span>
        ))}
        <span
          className="absolute top-2 right-2 cursor-pointer "
          onClick={() => handleSaveTofavorite(data)}
        >
          <FavoriteIcon active={optimisticFavorites.some(item => item.id === data.id)} />
        </span>

        <span className="absolute bottom-[7px] left-[7px] overflow-hidden rounded-[16px] border border-white  shadow-[0px 0.5px 2px 0px #33333314]">
          {data.company?.icon_url ? (
            <Image
              src={data.company.icon_url}
              alt={data?.company?.name}
              width={54}
              height={54}
              className="object-cover h-[54px]"
            />
          ) : (
            <div className="bg-gray-200 w-[54px] h-[54px]" />
          )}
        </span>
      </div>
      <div className="md:px-2">
        <p className="font-medium text-[13px] leading-5 align-middle text-[#656E78] mb-0.5">
          {data?.company?.name}
        </p>
        <p className="font-bold text-[15px] leading-[120%] align-middle mb-1.5">
          {data.name}
        </p>
        <div className="flex items-start gap-1 mb-0.5">
          <Image src={calendarIcon} alt={data.name} />
          <p className="font-normal text-[13px] leading-[18px] align-middle">
            {formatDateRange(data.start_date, data.end_date, (locale as 'ru' | 'en' | 'uz'))}
          </p>
        </div>
        {/* <div className="flex items-center gap-1">
          <Image src={locationIcon} alt={data.name} />
          <p className="font-normal text-[13px] leading-[18px] align-middle">
            Toshkent Yashnobod Aviasozlar 4
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
