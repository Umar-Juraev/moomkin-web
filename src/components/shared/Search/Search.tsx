"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscountDTO } from "@/types/DTO";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import NProgress from "nprogress";
import { useTranslation } from "react-i18next";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
  data?: DiscountDTO[];
  onOpen: (isOpen: boolean) => void;
  className?: string;
}

function Search({
  placeholder = "Type to search...",
  onSearch,
  isLoading = false,
  onOpen,
  data = [],
  className,
}: SearchProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "uz";
  const searchParams = useSearchParams();
  const { i18n } = useTranslation();

  const DEBOUNCE_MS = 300;

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get("q") || "";
  });
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_MS);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
    setIsFocused(true);
  }, []);

  const handleFocus = useCallback(() => {
    onOpen(true);
    setIsFocused(true);
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        onOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused]);

  const handleCompanySelect = (companyName: string) => {
    setSearchQuery(companyName);
    NProgress.start();
    router.push(`/search?q=${encodeURIComponent(companyName)}`);
    setIsFocused(false);
    onOpen(false);
  };

  const handleClear = () => {
    NProgress.start();
    router.push(`/${locale}`);
    setSearchQuery("");
    setIsFocused(false);
    onOpen(false);
  };

  const uniqueCompanies = React.useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map((item) => item.company.name)));
  }, [data]);

  useEffect(() => {
    if (isFocused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFocused]);

  return (
    <>
      {isFocused ? (
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black opacity-30 z-[100] md:bg-white md:opacity-100"
              style={{ transition: "background 0.2s" }}
            />
            <div
              ref={containerRef}
              className={cn(
                "fixed left-1/2 top-4 z-[200] w-full max-w-[560px] -translate-x-1/2 px-4 md:px-0 ",
                className
              )}
              style={{ pointerEvents: "auto" }}
            >
              <Command
                className={isFocused ? "rounded-t-2xl bg-white" : "rounded-2xl"}
              >
                <div className="relative flex items-center">
                  <ArrowLeft
                    onClick={handleClear}
                    color="#292C30"
                    className="size-7 text-red-300 shrink-0 hidden mr-4 md:block"
                  />
                  <CommandInput
                    isHideIcon={isFocused}
                    ref={inputRef}
                    placeholder={placeholder}
                    value={searchQuery}
                    onValueChange={handleInputChange}
                    onFocus={handleFocus}
                    autoFocus={false}
                    className="text-base pr-8"
                  />
                  {isLoading ? (
                    <div className="absolute right-4.5 top-1/2 -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600" />
                  ) : (
                    searchQuery.length > 0 && (
                      <Button
                        onClick={handleClear}
                        className="absolute bg-[#919DA6] right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex p-0 items-center justify-center rounded-full"
                      >
                        <X color="white" size={16} />
                      </Button>
                    )
                  )}
                </div>
                {isFocused && (
                  <CommandList className="bg-white border-none rounded-b-2xl shadow-lg max-h-[300px] overflow-auto md:shadow-none md:overflow-visible">
                    <CommandSeparator />
                    <div className="px-4 pb-4 pt-3">
                      {!uniqueCompanies.length && searchQuery.length > 0 ? (
                        <CommandEmpty>
                          No results found for &quot;{searchQuery}&quot;
                        </CommandEmpty>
                      ) : (
                        uniqueCompanies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {uniqueCompanies.map((name) => (
                              <div
                                key={name}
                                className="cursor-pointer px-3 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                                onClick={() => handleCompanySelect(name)}
                              >
                                {name}
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  </CommandList>
                )}
              </Command>
            </div>
          </>,
          document.body
        )
      ) : (
        <div
          ref={containerRef}
          className={cn(
            "absolute w-[560px] left-1/2 -translate-x-1/2 md:w-full md:static md:left-0 md:-translate-x-0 md:mb-8",
            className
          )}
        >
          <Command className="rounded-3xl">
            <div className="relative">
              <CommandInput
                ref={inputRef}
                placeholder={placeholder}
                value={searchQuery}
                onValueChange={handleInputChange}
                onFocus={handleFocus}
                autoFocus={false}
                className="text-base pr-8 rounded-3xl"
              />
              {isLoading ? (
                <div className="absolute right-4.5 top-1/2 -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600" />
              ) : (
                searchQuery.length > 0 && (
                  <Button
                    onClick={handleClear}
                    className="absolute bg-[#919DA6] right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex p-0 items-center justify-center rounded-full"
                  >
                    <X color="white" size={16} />
                  </Button>
                )
              )}
            </div>
            {isFocused && (
              <CommandList className="bg-white border-none rounded-b-2xl shadow-lg max-h-[300px] overflow-auto">
                <CommandSeparator />
                <div className="px-4 pb-4 pt-3">
                  {!uniqueCompanies.length && searchQuery.length > 0 ? (
                    <CommandEmpty>
                      No results found for &quot;{searchQuery}&quot;
                    </CommandEmpty>
                  ) : (
                    uniqueCompanies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {uniqueCompanies.map((name) => (
                          <div
                            key={name}
                            className="cursor-pointer px-3 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                            onClick={() => handleCompanySelect(name)}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </CommandList>
            )}
          </Command>
        </div>
      )}
    </>
  );
}

export default Search;
