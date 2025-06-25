import { create } from 'zustand';

interface UiState {
    isMobileSearch: boolean;
    setIsMobileSearch: (value: boolean) => void;
}

const LOCAL_STORAGE_KEY = 'isMobileSearch';

const getInitialIsMobileSearch = (): boolean => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored === 'true';
    }
    return false;
};

export const useUi = create<UiState>((set) => ({
    isMobileSearch: getInitialIsMobileSearch(),
    setIsMobileSearch: (value: boolean) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(LOCAL_STORAGE_KEY, value.toString());
        }
        set({ isMobileSearch: value });
    },
}));