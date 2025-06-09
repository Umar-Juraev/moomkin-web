import { create } from "zustand";

export interface FilterState {
  filterDiscount: {
    category_id: string | null;
    company_id: string | null;
  };
  setFilterDiscount: (filter: { category_id: string | null; company_id: string | null }) => void;
  resetFilterDiscount: () => void;
}

const useFilter = create<FilterState>((set) => ({
  // Filter Discount
  filterDiscount: {
    category_id: null,
    company_id: null,
  },
  setFilterDiscount: (filter) => set({ filterDiscount: filter }),
  resetFilterDiscount: () =>
    set({
      filterDiscount: {
        category_id: null,
        company_id: null,
      },
    }),
}));
export default useFilter;
