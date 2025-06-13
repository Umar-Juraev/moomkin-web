import { create } from "zustand";

// Interface for filter button items 
export interface FilterItem {
  id: string;
  key: string;
  value: any;
}

export interface FilterState {
  filterDiscount: {
    category_id: string | null;
    company_id: string | null;
  };
  // New state for clicked filter buttons
  clickedFilters: Record<string, any>;
  
  setFilterDiscount: (filter: { category_id: string | null; company_id: string | null }) => void;
  resetFilterDiscount: () => void;
  
  // New methods for handling filter button clicks
  toggleFilterButton: (item: FilterItem) => void;
  loadFiltersFromStorage: () => void;
  clearAllFilters: () => void;
}

// Helper function to save to localStorage (or in-memory storage)
const saveToStorage = (data: Record<string, any>) => {
  try {
    // In a real environment, use: localStorage.setItem('clickedFilters', JSON.stringify(data));
    // For Claude artifacts, we'll use a global variable as localStorage isn't supported
    (window as any).__filterStorage = data;
  } catch (error) {
    console.error('Failed to save to storage:', error);
  }
};

// Helper function to load from localStorage (or in-memory storage)
const loadFromStorage = (): Record<string, any> => {
  try {
    // In a real environment, use: const saved = localStorage.getItem('clickedFilters');
    // For Claude artifacts, we'll use a global variable
    const saved = (window as any).__filterStorage;
    return saved || {};
  } catch (error) {
    console.error('Failed to load from storage:', error);
    return {};
  }
};

const useFilter = create<FilterState>((set, get) => ({
  // Filter Discount
  filterDiscount: {
    category_id: null,
    company_id: null,
  },
  
  // Initialize with data from storage
  clickedFilters: loadFromStorage(),
  
  setFilterDiscount: (filter) => set({ filterDiscount: filter }),
  
  resetFilterDiscount: () =>
    set({
      filterDiscount: {
        category_id: null,
        company_id: null,
      },
    }),
  
  // Toggle filter button - add if not exists, remove if exists
  toggleFilterButton: (item: FilterItem) => {
    const currentFilters = get().clickedFilters;
    const newFilters = { ...currentFilters };
    
    // Check if this item is already clicked (by checking if any value has the same id)
    let itemExists = false;
    let keyToRemove = '';
    
    for (const [key, value] of Object.entries(currentFilters)) {
      if (Array.isArray(value)) {
        // If value is an array, check each item's id
        const itemIndex = value.findIndex((v: any) => v?.id === item.id);
        if (itemIndex !== -1) {
          itemExists = true;
          keyToRemove = key;
          break;
        }
      } else if (value?.id === item.id) {
        // If value is an object, check its id directly
        itemExists = true;
        keyToRemove = key;
        break;
      }
    }
    
    if (itemExists) {
      // Remove the item
      if (Array.isArray(newFilters[keyToRemove])) {
        newFilters[keyToRemove] = newFilters[keyToRemove].filter((v: any) => v?.id !== item.id);
        // If array becomes empty, remove the key entirely
        if (newFilters[keyToRemove].length === 0) {
          delete newFilters[keyToRemove];
        }
      } else {
        delete newFilters[keyToRemove];
      }
    } else {
      // Add the item
      if (newFilters[item.key]) {
        // If key already exists, handle based on current value type
        if (Array.isArray(newFilters[item.key])) {
          newFilters[item.key] = [...newFilters[item.key], item.value];
        } else {
          // Convert to array if not already
          newFilters[item.key] = [newFilters[item.key], item.value];
        }
      } else {
        // Create new key with the value
        newFilters[item.key] = item.value;
      }
    }
    
    // Save to storage
    saveToStorage(newFilters);
    
    // Update state
    set({ clickedFilters: newFilters });
  },
  
  // Load filters from storage (useful for page refresh)
  loadFiltersFromStorage: () => {
    const savedFilters = loadFromStorage();
    set({ clickedFilters: savedFilters });
  },
  
  // Clear all clicked filters
  clearAllFilters: () => {
    saveToStorage({});
    set({ clickedFilters: {} });
  },
}));

export default useFilter;