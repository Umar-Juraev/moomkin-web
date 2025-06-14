import { create } from 'zustand';
import { DiscountDTO } from '@/types/DTO';

export interface FavoritesState {
  favorites: DiscountDTO[];
  addFavorite: (discount: DiscountDTO) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (discount: DiscountDTO) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const FAVORITES_KEY = 'favorites';

const saveToStorage = (favorites: DiscountDTO[]) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Failed to save favorites to localStorage:', error);
  }
};

const loadFromStorage = (): DiscountDTO[] => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favorites from localStorage:', error);
    return [];
  }
};

const useFavorites = create<FavoritesState>((set, get) => ({
  favorites: loadFromStorage(),

  addFavorite: (discount) => {
    const currentFavorites = get().favorites;
    if (!currentFavorites.some(item => item.id === discount.id)) {
      const updatedFavorites = [...currentFavorites, discount];
      saveToStorage(updatedFavorites);
      set({ favorites: updatedFavorites });
    }
  },

  removeFavorite: (id) => {
    const updatedFavorites = get().favorites.filter(item => item.id !== id);
    saveToStorage(updatedFavorites);
    set({ favorites: updatedFavorites });
  },

  toggleFavorite: (discount) => {
    const currentFavorites = get().favorites;
    const exists = currentFavorites.some(item => item.id === discount.id);

    if (exists) {
      get().removeFavorite(discount.id);
    } else {
      get().addFavorite(discount);
    }
  },

  isFavorite: (id) => {
    return get().favorites.some(item => item.id === id);
  },

  clearFavorites: () => {
    saveToStorage([]);
    set({ favorites: [] });
  },
}));


export const isFavoriteItem = (id: number): boolean => {
  return useFavorites.getState().isFavorite(id);
};

export default useFavorites;