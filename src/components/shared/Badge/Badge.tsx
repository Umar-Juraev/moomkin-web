import React, { FC } from "react";
import { Badge as BadgeShadcn } from "@/components/ui/badge";
import Image from "next/image";
import { Nullable } from "@/types/common";
import { useTranslation } from "react-i18next";


interface IData {
    key: string;
    id: number;
    icon: any;
    label: string;
    value: string;
    isActive:boolean
}
interface Props {
  data: IData
  onClick: (value: IData) => void;
}

const Badge: FC<Props> = ({data, onClick }) => {
  const { t } = useTranslation();
  const handleClick = React.useCallback(() => onClick(data), [onClick, data]);
  return (
    <BadgeShadcn
      variant={data.isActive ? 'default' : 'secondary'}
      onClick={handleClick}
      className="rounded-[22px] pl-3 pr-4 py-0 h-11 font-bold text-base flex items-center gap-1.5 cursor-pointer"
    >
      {data.icon && <Image src={data.icon} alt={t(data.label) || data.label || 'Badge icon'} />}
      {t(data.label) || data.label}
    </BadgeShadcn>
  );
};

export default Badge;
