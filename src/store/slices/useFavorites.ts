import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DiscountDTO } from '@/types/DTO';

export interface FavoritesState {
  favorites: DiscountDTO[];
  addFavorite: (discount: DiscountDTO) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (discount: DiscountDTO) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;
}

const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (discount) => {
        const currentFavorites = get().favorites;
        if (!currentFavorites.some(item => item.id === discount.id)) {
          set({ favorites: [...currentFavorites, discount] });
        }
      },

      removeFavorite: (id) => {
        set({ favorites: get().favorites.filter(item => item.id !== id) });
      },

      toggleFavorite: (discount) => {
        if (get().isFavorite(discount.id)) {
          get().removeFavorite(discount.id);
        } else {
          get().addFavorite(discount);
        }
      },

      isFavorite: (id) => get().favorites.some(item => item.id === id),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites', // key in localStorage
    }
  )
);

export const isFavoriteItem = (id: number): boolean =>
  useFavorites.getState().isFavorite(id);

export default useFavorites;
