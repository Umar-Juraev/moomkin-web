"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ProductCard, ProductDialogContent } from '@/components/shared';
import { useResponsiveDialog } from '@/hooks/useResponsiveDialog';
import useFavorites from '@/store/slices/useFavorites';

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites();
  const router = useRouter()

  const [responsiveDialog, showResponsiveDialog] =
    useResponsiveDialog();

  const handleProductClick = (discountId: number) => {
    showResponsiveDialog({
      content: (onClose) => (
        <ProductDialogContent discountId={discountId} onClose={onClose} />
      )
    });
  };

  useEffect(() => {
    if (!favorites.length) {
      router.push('/')
    }
  }, [favorites])
  return (
    <div className='animate-fade-in container'>
      <Breadcrumb className='mt-6 mb-8'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home page</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Сохраненные</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1
        className="font-pretendard font-extrabold text-[56px] leading-[64px] tracking-[-0.5%] mb-8"
      >
        Сохраненные
      </h1>

      <div className="grid grid-cols-4 gap-6 md:grid-cols-1 mb-24">
        {favorites?.map((item, index) => (
          <ProductCard
            onClick={handleProductClick}
            key={index}
            data={item}
            className="md:!w-full"
          />
        ))}
      </div>
      {responsiveDialog}
    </div>
  )
}
export default FavoritesPage
