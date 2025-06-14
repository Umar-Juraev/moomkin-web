"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DiscountDTO } from "@/types/DTO";
import { useRouter, useSearchParams } from "next/navigation";

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
  data: DiscountDTO[];
  className?: string;
}

function Search({
  placeholder = "Type to search...",
  onSearch,
  isLoading = false,
  data = [],
  className,
}: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const DEBOUNCE_MS = 300;

  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('q') || '';
  });
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_MS);

  useEffect(() => {
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);

  useEffect(() => {
    if (isFocused) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [isFocused]);

  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value);
    setShowResults(true);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowResults(true);
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isFocused]);

  const handleCompanySelect = useCallback((companyName: string) => {
    setSearchQuery(companyName);
    router.push(`/search?q=${encodeURIComponent(companyName)}`);
    setShowResults(false);
    setIsFocused(false);
  }, [router]);

  const handleClear = useCallback(() => {
    setSearchQuery("");
    setShowResults(false);
    setIsFocused(false);
    router.push('/');
  }, [router]);

  const uniqueCompanies = React.useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map(item => item.company.name)));
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
      {isFocused && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-[100]"
          style={{ transition: "background 0.2s" }}
        />
      )}
      <div
        ref={containerRef}
        className={cn("relative w-full z-[200]", className)}
      >
        <Command className={showResults ? "rounded-t-2xl bg-white" : "rounded-2xl"}>
          <div className="relative">
            <CommandInput
              placeholder={placeholder}
              value={searchQuery}
              onValueChange={handleInputChange}
              onFocus={handleFocus}
              autoFocus={false}
              className="text-base pr-8"
            />
            {isLoading ? (
              <div className="absolute right-4.5 top-1/2 -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600" />
            ) : searchQuery.length > 0 && (
              <Button
                onClick={handleClear}
                className="absolute bg-[#919DA6] right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex p-0 items-center justify-center rounded-full"
              >
                <X color="white" size={16} />
              </Button>
            )}
          </div>

          {showResults && (
            <CommandList className="bg-white border-none rounded-b-2xl shadow-lg max-h-[300px] overflow-auto">
              <CommandSeparator />
              <div className="px-4 pb-4 pt-3">
                {!uniqueCompanies.length && searchQuery.length > 0 ? (
                  <CommandEmpty>No results found for &quot;{searchQuery}&quot;</CommandEmpty>
                ) : (uniqueCompanies.length > 0 &&
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
                )}
              </div>
            </CommandList>
          )}
        </Command>
      </div>
    </>
  );
}

export default Search;
