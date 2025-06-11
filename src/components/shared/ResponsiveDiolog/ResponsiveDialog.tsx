"use client";

import * as React from "react";

import { cn } from "@/lib/utils"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery"; 

interface ResponsiveDialogProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  dialogContentClassName?: string;
  drawerContentClassName?: string;
  open?: boolean; 
  onOpenChange?: (open: boolean) => void;
}

function ResponsiveDialog({
  children,
  trigger,
  title,
  description,
  hideHeader = false, 
  dialogContentClassName,
  drawerContentClassName,
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = open ?? internalOpen; 
  const setIsOpen = onOpenChange ?? setInternalOpen;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          className={cn(
            "border-none shadow-none overflow-hidden p-0 rounded-4xl w-auto",
            dialogContentClassName
          )}
        >
          {!hideHeader &&
            title && (
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description && (
                  <DialogDescription>{description}</DialogDescription>
                )}
              </DialogHeader>
            )}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        className={cn(
          "mt-0 m-0 p-0 border-none shadow-none top-0",
          drawerContentClassName
        )}
      >
        {!hideHeader &&
          title && (
            <DrawerHeader className="text-left">
              <DrawerTitle>{title}</DrawerTitle>
              {description && (
                <DrawerDescription>{description}</DrawerDescription>
              )}
            </DrawerHeader>
          )}
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export default ResponsiveDialog;
