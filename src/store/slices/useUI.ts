import { create } from 'zustand';

const SEARCH_SUGGESTIONS_KEY = 'SEARCH_SUGGESTIONS_KEY';

export interface SuggestionsState {
    storedSuggestions: string[];
    addSuggestion: (suggestion: string) => void;
}

const saveToStorage = (suggestions: string[]) => {
    try {
        localStorage.setItem(SEARCH_SUGGESTIONS_KEY, JSON.stringify(suggestions));
    } catch (error) {
        console.error('Failed to save suggestions to localStorage:', error);
    }
};

const loadFromStorage = (): string[] => {
    try {
        const saved = localStorage.getItem(SEARCH_SUGGESTIONS_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error('Failed to load suggestions from localStorage:', error);
        return [];
    }
};

const useUI = create<SuggestionsState>((set, get) => ({
    storedSuggestions: loadFromStorage(),

    addSuggestion: (suggestion: string) => {
        const current = get().storedSuggestions;
        if (!current.includes(suggestion)) {
            const updated = [...current, suggestion];
            saveToStorage(updated);
            set({ storedSuggestions: updated });
        }
    },
}));

export default useUI;
