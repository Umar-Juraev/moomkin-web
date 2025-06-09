"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

interface SearchItem {
  id: string;
  label: string;
  onSelect?: () => void;
}

export interface SearchData {
  suggestions?: SearchItem[];
  settings?: SearchItem[];
}

interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
  data?: SearchData | null;
  className?: string;
}

 function Search({
  placeholder = "Type to search...",
  onSearch,
  isLoading = false,
  data = null,
  className,
}: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show results when input is focused
  useEffect(() => {
    if (isFocused) {
      setShowResults(
        Boolean(
          data &&
            ((data.suggestions && data.suggestions.length > 0) ||
              (data.settings && data.settings.length > 0))
        )
      );
    }
  }, [isFocused, data]);

  // Handle input change
  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
    setShowResults(true);
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowResults(
      Boolean(
        data &&
          ((data.suggestions && data.suggestions.length > 0) ||
            (data.settings && data.settings.length > 0))
      )
    );
  };

  // Handle blur/click outside
  useEffect(() => {
    if (!isFocused) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setShowResults(false);
        setSearchQuery("");
        onSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line
  }, [isFocused]);

  const handleItemSelect = (callback?: () => void) => {
    if (callback) callback();
    setShowResults(false);
    setIsFocused(false);
    setSearchQuery("");
    onSearch("");
  };

  return (
    <>
      {isFocused && (
        <div
          className="fixed inset-0 bg-black opacity-20 z-20"
          style={{ transition: "background 0.2s" }}
        />
      )}
      <div
        ref={containerRef}
        className={cn("relative w-full z-30", className)}
        style={{ position: "relative" }}
      >
        <Command className={showResults ? "rounded-t-3xl" : "rounded-3xl"}>
          <CommandInput
            placeholder={placeholder}
            value={searchQuery}
            onValueChange={handleInputChange}
            onFocus={handleFocus}
            // Prevent blur on click inside
            autoFocus={false}
            className="text-base"
          />
          {isLoading && (
            <div className="absolute right-4.5 top-1/2 -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600" />
          )}
          {showResults && (
            <CommandList className="bg-white border-none">
              {!data?.suggestions?.length && !data?.settings?.length ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <>
                  {data?.suggestions && data.suggestions.length > 0 && (
                    <CommandGroup heading="Suggestions">
                      {data.suggestions.map((item) => (
                        <CommandItem
                          className="cursor-pointer"
                          key={item.id}
                          onSelect={() => handleItemSelect(item.onSelect)}
                        >
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}

                  {data?.suggestions &&
                    data?.settings &&
                    data.suggestions.length > 0 &&
                    data.settings.length > 0 && <CommandSeparator />}

                  {data?.settings && data.settings.length > 0 && (
                    <CommandGroup heading="Settings">
                      {data.settings.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleItemSelect(item.onSelect)}
                        >
                          {item.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          )}
        </Command>
      </div>
    </>
  );
}


export default Search
