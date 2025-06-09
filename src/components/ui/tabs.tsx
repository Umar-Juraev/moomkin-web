"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
  className={cn(
    "relative", // Add relative positioning to the trigger for the absolute pseudo-element
    "data-[state=active]:bg-transparent", // Remove background for active state to match image
    "dark:data-[state=active]:bg-transparent", // Dark mode
    "data-[state=active]:text-text-dark", // Text color for active state
    "dark:data-[state=active]:text-foreground", // Dark mode text color
    "focus-visible:ring-0 focus-visible:outline-none", // Remove default focus rings
    "text-[#919DA6] dark:text-muted-foreground", // Default text color for inactive tabs
    "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
    // Pseudo-element base styles (without transition, with rounded corners)
    "before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-[3px] before:w-0 before:bg-transparent before:rounded-[4px]",
    "data-[state=active]:before:w-[25px] data-[state=active]:before:bg-[#E50000]", // Active state pseudo-element
    className // Merge any additional custom classes passed in
  )}

      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
