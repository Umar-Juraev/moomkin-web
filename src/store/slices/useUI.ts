import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SuggestionsState {
  storedSuggestions: string[];
  addSuggestion: (suggestion: string) => void;
}

const useUI = create<SuggestionsState>()(
  persist(
    (set, get) => ({
      storedSuggestions: [],

      addSuggestion: (suggestion) => {
        const current = get().storedSuggestions;
        if (!current.includes(suggestion)) {
          set({ storedSuggestions: [...current, suggestion] });
        }
      },
    }),
    {
      name: 'SEARCH_SUGGESTIONS_KEY', // key in localStorage
    }
  )
);

export default useUI;
