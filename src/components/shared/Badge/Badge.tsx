import React, { FC } from "react";
import { Badge as BadgeShadcn } from "@/components/ui/badge";
import Image from "next/image";
import { Nullable } from "@/types/common";

interface Props {
  label: string;
  svg?: Nullable<string>;
  value: string;
  onClick: (value: string) => void;
}

const Badge: FC<Props> = ({ svg, label, value, onClick }) => {
  return (
    <BadgeShadcn
      variant={"secondary"}
      onClick={() => onClick(value)}
      className="rounded-[22px] pl-3 pr-4 py-[11px] font-bold text-base flex items-center gap-1.5"
    >
      {svg && <Image src={svg} alt={label} />}
      {label}
    </BadgeShadcn>
  );
};

export default Badge;
