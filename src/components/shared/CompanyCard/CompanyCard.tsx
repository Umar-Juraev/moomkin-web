
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FilterItem } from "@/store/slices/usefilter";
import { CompanyDTO } from "@/types/DTO";
import Image from "next/image";
import React, { FC } from "react";
interface Props {
  data: CompanyDTO,
  isActiveId: string | number
  onClick: (value: FilterItem) => void;
}

const CompanyCard: FC<Props> = ({ data,isActiveId,onClick }) => {

  return (
    <div className="cursor-pointer flex flex-col items-center" onClick={() => onClick({ id: String(data.id), key: "company_id", value: data.id })}>
      <div className="w-23 h-23  rounded-xl overflow-hidden mb-2.5 ">
        {data.icon_url ? (
          <Image src={data.icon_url} alt={data.name} width={104} height={104} />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded-xl" />
        )}
      </div>
      <h6 className={cn("font-pretendard font-medium text-[15px] w-23 text-center  tracking-[-0.015em] inline-flex items-center justify-center md:text-sm", isActiveId === data.id && "bg-primary text-white py-1 px-1.5 font-medium rounded-sm")}>
        {data.name}
      </h6>
    </div>
  );
};

export default CompanyCard;
