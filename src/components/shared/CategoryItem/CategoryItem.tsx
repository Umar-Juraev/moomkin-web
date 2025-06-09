import React, { FC } from "react";
import Image from "next/image";
import { CategoryDTO } from "@/types/DTO";

interface Props {
  data: CategoryDTO;
}
const CategoryItem: FC<Props> = ({ data }) => {
  return (
    <div className="cursor-pointer">
      <div className="w-26 h-26 overflow-hidden rounded-full mb-2.5 ">
        <Image src={data.icon_url} alt={data.name} width={104} height={104} />
      </div>
      <h6 className="font-pretendard font-medium text-[15px] leading-4.5 tracking-[-0.015em] text-center md:text-sm">
        {data.name}
      </h6>
    </div>
  );
};

export default CategoryItem;
