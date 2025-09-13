"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResponsiveDialog } from "@/hooks/useResponsiveDialog";
import { ProductDialogContent } from "@/components/shared";

export default function DiscountPage() {
  const params = useParams();
  const router = useRouter();
  const [responsiveDialog, showResponsiveDialog] = useResponsiveDialog();
  
  const discountId = params?.id ? parseInt(params.id as string, 10) : null;

  useEffect(() => {
    if (discountId) {
      showResponsiveDialog({
        content: (onClose) => (
          <ProductDialogContent 
            discountId={discountId} 
            onClose={onClose} 
          />
        ),
        // This callback will be triggered when the dialog/drawer is closed
        // (either by user interaction or programmatically)
        onClose: () => {
          router.push(`/${params.locale}`);
        },
      });
    }
  }, [discountId, showResponsiveDialog, router, params.locale]);

  return (
    <>
      {responsiveDialog}
    </>
  );
}
