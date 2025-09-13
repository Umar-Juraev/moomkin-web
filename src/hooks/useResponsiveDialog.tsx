"use client";

import { ResponsiveDialog } from "@/components/shared";
import * as React from "react";
import { useCallback, useMemo, useState } from "react";

interface HookModalContent {
  content: (onClose: () => void) => React.ReactNode;
  title?: string;
  description?: string;
  hideHeader?: boolean;
  dialogContentClassName?: string;
  drawerContentClassName?: string;
  onClose?: () => void;
}

export function useResponsiveDialog(): [
  React.ReactNode | null,
  (options: {
    content: (onClose: () => void) => React.ReactNode;
    title?: string;
    description?: string;
    hideHeader?: boolean;
    dialogContentClassName?: string;
    drawerContentClassName?: string;
    onClose?: () => void;
  }) => void,
  boolean
] {
  const [modalState, setModalState] = useState<HookModalContent | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
    // Call the onClose callback if provided
    if (modalState?.onClose) {
      modalState.onClose();
    }
  }, [modalState?.onClose]);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    // If closing (open is false), call the onClose callback if provided
    if (!open && modalState?.onClose) {
      modalState.onClose();
    }
  }, [modalState?.onClose]);


  const responsiveDialogElement = useMemo(() => {
    if (!modalState) {
      return null;
    }

    const {
      content: getContent,
      title,
      description,
      hideHeader,
      dialogContentClassName,
      drawerContentClassName,
    } = modalState;

    const actualContent = getContent(onClose);

    return (
      <ResponsiveDialog
        open={isOpen}
        onOpenChange={handleOpenChange}
        title={title}
        description={description}
        hideHeader={hideHeader}
        dialogContentClassName={dialogContentClassName}
        drawerContentClassName={drawerContentClassName}
      >
        {actualContent}
      </ResponsiveDialog>
    );
  }, [
    modalState,
    isOpen,
    onClose,
    handleOpenChange,
  ]);

  const showResponsiveDialog = useCallback(
    (options: {
      content: (onClose: () => void) => React.ReactNode;
      title?: string;
      description?: string;
      hideHeader?: boolean;
      dialogContentClassName?: string;
      drawerContentClassName?: string;
      onClose?: () => void;
    }) => {
      setModalState({
        content: options.content,
        title: options.title,
        description: options.description,
        hideHeader: options.hideHeader,
        dialogContentClassName: options.dialogContentClassName,
        drawerContentClassName: options.drawerContentClassName,
        onClose: options.onClose,
      });
      setIsOpen(true);
    },
    [],
  );

  return [responsiveDialogElement, showResponsiveDialog, isOpen];
}
