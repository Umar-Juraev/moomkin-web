import React, { FC } from "react";
import Image from "next/image";
import { CategoryDTO } from "@/types/DTO";
import { FilterItem } from "@/store/slices/usefilter";
import { cn } from "@/lib/utils";

interface Props {
  data: CategoryDTO;
  onClick: (value: FilterItem) => void;
  isActiveId: string | number
}
const CategoryItem: FC<Props> = ({ data, onClick, isActiveId }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={() => onClick({ id: String(data.id), key: "category_id", value: data.id })}>
      <div className="w-26 h-26 overflow-hidden rounded-full mb-2.5 ">
        {data.icon_url ? (
          <Image src={data.icon_url} alt={data.name} width={104} height={104} />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded-full" />
        )}
      </div>
      <h6 className={cn("font-pretendard font-medium text-[15px]  h-7 text-nowrap  tracking-[-0.015em] inline-flex items-center justify-center md:text-sm", isActiveId === data.id && "bg-primary text-white py-1 px-1.5 font-medium rounded-sm")}>
        {data.name}
      </h6>
    </div>
  );
};

export default CategoryItem;
