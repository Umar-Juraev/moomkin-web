"use client";
import { DiscountDTO } from "@/types/DTO";
import Image from "next/image";
import React, { FC, useState } from "react";
import calendarIcon from "@/assets/icons/calendar.svg";
import locationIcon from "@/assets/icons/location.svg";
import { formatDateRange } from "@/utils/date";
import { calculateDiscountPercentageFormatted } from "@/utils/data";
import { FavoriteIcon } from "@/assets/icons";

interface Props {
  data: DiscountDTO;
  onClick: (discountId: number) => void;
}
const ProductCard: FC<Props> = ({ data, onClick }) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleSaveTofavorite = (id: number) => {
    setFavorite((prev) => !prev);
  };
  return (
    <div className="border-nonerounded-t-[22px] md:w-[296px]">
      <div className="rounded-[22px] mb-2 h-38 overflow-hidden flex flex-col relative">
        <Image
          onClick={() => onClick(data.id)}
          src={data.attachments[0].attachment.url}
          alt={data.name}
          width={268}
          height={152}
          className="object-cover h-full cursor-pointer hover:opacity-60 transition-all duration-300"
        />
        <span className="absolute top-2 left-2 bg-[#16C602] rounded-[22px] text-white text-base font-bold h-8 w-15 flex items-center justify-center">
          {calculateDiscountPercentageFormatted(
            data.price,
            data.discount_price
          )}
        </span>
        <span
          className="absolute top-2 right-2 cursor-pointer "
          onClick={() => handleSaveTofavorite(data.id)}
        >
          <FavoriteIcon active={favorite} />
        </span>

        <span className="absolute bottom-[9px] left-[9px] overflow-hidden rounded-[14px] border border-white  shadow-[0px 0.5px 2px 0px #33333314]">
          <Image
            src={data.company.icon_url}
            alt={data.company.name}
            width={54}
            height={54}
          />
        </span>
      </div>
      <div>
        <p className="font-medium text-sm leading-5 align-middle text-[#656E78] mb-0.5">
          {data.name}
        </p>
        <p className="font-bold text-base leading-[22px] align-middle mb-1.5">
          {data.description}
        </p>
        <div className="flex items-center gap-1 mb-0.5">
          <Image src={calendarIcon} alt={data.name} />
          <p className="font-normal text-[13px] leading-[18px] align-middle">
            {formatDateRange(data.start_date, data.end_date)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Image src={locationIcon} alt={data.name} />
          <p className="font-normal text-[13px] leading-[18px] align-middle">
            Toshkent Yashnobod Aviasozlar 4
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
