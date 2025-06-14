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

// --- useDebounce Hook ---
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

// --- SearchProps Interface ---
interface SearchProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
  data: DiscountDTO[];
  className?: string;
}

// --- Search Component ---
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

  // Initialize searchQuery once from URL on mount
  // This state will then be fully controlled by user input
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get('q') || '';
  });
  const [showResults, setShowResults] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce the search query for API calls or heavy logic
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_MS);

  // Effect to trigger parent onSearch callback initially and when debounced query changes
  useEffect(() => {
    // Only call onSearch if debouncedSearchQuery has a value
    // or if you want to explicitly handle empty query (e.g., clear results globally).
    // The current logic means onSearch is called only if there's a query or it becomes empty.
    onSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, onSearch]);


  // IMPORTANT: Removed the conflicting useEffect that was resetting searchQuery.
  // The input is now fully controlled by the `searchQuery` state,
  // which is updated via `handleInputChange`.


  // Effect to control visibility of results based on focus.
  useEffect(() => {
    if (isFocused) {
      setShowResults(true); // Always show results when focused (CommandEmpty handles no data)
    } else {
      setShowResults(false); // Hide results when unfocused
    }
  }, [isFocused]);

  // Callback to handle changes in the CommandInput value.
  const handleInputChange = useCallback((value: string) => {
    setSearchQuery(value); // This is what updates the input's value
    setShowResults(true); // Always show results when user is typing
  }, []);

  // Callback to handle focus event on the CommandInput.
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setShowResults(true); // When focused, show results
  }, []);

  // Effect to handle clicks outside the search container to close results and unfocus.
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

  // Callback for when a company name is selected from the results.
  const handleCompanySelect = useCallback((companyName: string) => {
    setSearchQuery(companyName); // Set input to selected company name
    // Navigate to the search page with the selected company name as the query
    router.push(`/search?q=${encodeURIComponent(companyName)}`);
    setShowResults(false); // Hide results
    setIsFocused(false); // Unfocus
  }, [router]);

  // Callback to clear the search input and hide results.
  const handleClear = useCallback(() => {
    setSearchQuery(""); // Clear the input value
    setShowResults(false); // Hide results
    setIsFocused(false); // Unfocus
    // If you want clearing the input to also clear the URL param:
    router.push('/'); // Or router.replace('/search');
  }, [router]); // router is a dependency for handleClear now

  // Memoize unique company names from the data
  const uniqueCompanies = React.useMemo(() => {
    if (!data) return [];
    return Array.from(new Set(data.map(item => item.company.name)));
  }, [data]);

  // Effect to manage body overflow when the search input is focused.
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
          className="fixed inset-0 bg-black opacity-30 z-5"
          style={{ transition: "background 0.2s" }}
        />
      )}
      <div
        ref={containerRef}
        className={cn("relative w-full z-[10]", className)}
      >
        <Command className={showResults ? "rounded-t-2xl bg-white" : "rounded-2xl"}>
          <div className="relative">
            <CommandInput
              placeholder={placeholder}
              value={searchQuery} // Input value is controlled by searchQuery state
              onValueChange={handleInputChange} // Updates searchQuery state
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
                  <CommandEmpty>No results found for "{searchQuery}"</CommandEmpty>
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