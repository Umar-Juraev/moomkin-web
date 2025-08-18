import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FilterItem {
  id: string;
  key: string;
  value: any;
}

interface FilterState {
  clickedFilters: Record<string, any>;
  toggleFilterButton: (item: FilterItem) => void;
  clearAllFilters: () => void;
}

const useFilter = create<FilterState>()(
  persist(
    (set, get) => ({
      clickedFilters: {},

      toggleFilterButton: (item) => {
        const currentFilters = get().clickedFilters;
        const newFilters = { ...currentFilters };

        if (item.key === 'order' || item.key === 'category_id') {
          // Toggle single-value filters
          if (newFilters[item.key] === item.value) {
            delete newFilters[item.key];
          } else {
            newFilters[item.key] = item.value;
          }
        } else {
          // Multi-value filters
          if (!newFilters[item.key]) {
            newFilters[item.key] = [item.value];
          } else {
            const currentValue = Array.isArray(newFilters[item.key])
              ? newFilters[item.key]
              : [newFilters[item.key]];

            const existingIndex = currentValue.findIndex((v: any) => {
              if (
                typeof v === 'object' &&
                v !== null &&
                typeof item.value === 'object' &&
                item.value !== null
              ) {
                return (
                  v.id === item.value.id ||
                  JSON.stringify(v) === JSON.stringify(item.value)
                );
              }
              return v === item.value;
            });

            if (existingIndex !== -1) {
              const updatedArray = currentValue.filter(
                (_: any, index: number) => index !== existingIndex
              );

              if (updatedArray.length === 0) {
                delete newFilters[item.key];
              } else {
                newFilters[item.key] = updatedArray;
              }
            } else {
              newFilters[item.key] = [...currentValue, item.value];
            }
          }
        }

        set({ clickedFilters: newFilters });
      },

      clearAllFilters: () => {
        set({ clickedFilters: {} });
      },
    }),
    {
      name: 'filterStorage', // key in localStorage
    }
  )
);

// Utils (unchanged)
export const isFilterActive = (
  filters: Record<string, any>,
  item: FilterItem
): boolean => {
  if (item.key === 'order') {
    return filters[item.key] === item.value;
  }

  const filterValue = filters[item.key];
  if (!filterValue) return false;

  if (Array.isArray(filterValue)) {
    return filterValue.some((v: any) => {
      if (
        typeof v === 'object' &&
        v !== null &&
        typeof item.value === 'object' &&
        item.value !== null
      ) {
        return (
          v.id === item.value.id ||
          JSON.stringify(v) === JSON.stringify(item.value)
        );
      }
      return v === item.value;
    });
  }

  if (
    typeof filterValue === 'object' &&
    filterValue !== null &&
    typeof item.value === 'object' &&
    item.value !== null
  ) {
    return (
      filterValue.id === item.value.id ||
      JSON.stringify(filterValue) === JSON.stringify(item.value)
    );
  }

  return filterValue === item.value;
};

export const getFilterCount = (
  filters: Record<string, any>,
  key: string
): number => {
  const filterValue = filters[key];
  if (!filterValue) return 0;
  if (Array.isArray(filterValue)) return filterValue.length;
  return 1;
};

export default useFilter;
