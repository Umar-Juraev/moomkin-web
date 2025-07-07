"use client";

import * as React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
  hideHeader,
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
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      snapPoints={[1]} // Still want it to try and snap to 100%
    >
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        // Keep these styles for the content, but ensure it's within a truly full-height parent
        className={cn(
          "data-[vaul-drawer-direction=bottom]:max-h-[100vh] pb-19", // Ensure DrawerContent also tries to take full height
          drawerContentClassName
        )}
      >
        {/* The children area should now take the remaining space */}
        <div className="flex-grow overflow-auto">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ResponsiveDialog;
