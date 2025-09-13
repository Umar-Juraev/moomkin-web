"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n";
import {
  ProductCard,
  ProductDialogContent,
} from "@/components/shared";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";
import useFavorites from "@/store/slices/useFavorites";
import { useTranslations, useLocale } from 'next-intl';
import NProgress from "nprogress";
import { Inbox } from "lucide-react";

const FavoritesPage = () => {
  const params = useParams();
  const locale = params?.locale || "uz";
  const { favorites, clearFavorites } = useFavorites();
  const router = useRouter();
  const t = useTranslations();

  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();

  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      ),
    });
  };

  return (
    <div className="container">
      <Breadcrumb className="mt-6 mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t("pages.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{t("pages.favorites")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-pretendard font-extrabold text-[56px] leading-[64px] md:text-5xl tracking-[-0.5%] mb-8">
        {t("header.saved")}
      </h1>

      <div className="gap-4 flex flex-wrap md:gap-3.5 md:grid md:grid-cols-2 mb-24">
        {favorites.length ? (
          favorites?.map((item, index) => (
            <ProductCard
              onClick={handleProductClick}
              key={index}
              data={item}
              className="w-[177.33px] md:!w-full"
            />
          ))
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center py-16">
            <Inbox className="w-20 h-20 text-gray-300 mb-4" />
          </div>
        )}
      </div>
      {responsiveDialog}
    </div>
  );
};
export default FavoritesPage;
