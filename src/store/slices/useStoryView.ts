import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ViewedStoriesState {
  viewedStoriesId: number[];
  addViewed: (id: number) => void;
  removeViewed: (id: number) => void;
  toggleViewed: (id: number) => void;
  isViewed: (id: number) => boolean;
  clearViewed: () => void;
}

const useViewedStories = create<ViewedStoriesState>()(
  persist(
    (set, get) => ({
      viewedStoriesId: [],

      addViewed: (id) => {
        const current = get().viewedStoriesId;
        if (!current.includes(id)) {
          const updated = [...current, id];
          set({ viewedStoriesId: updated });
        }
      },

      removeViewed: (id) => {
        const updated = get().viewedStoriesId.filter(item => item !== id);
        set({ viewedStoriesId: updated });
      },

      toggleViewed: (id) => {
        const current = get().viewedStoriesId;
        if (current.includes(id)) {
          get().removeViewed(id);
        } else {
          get().addViewed(id);
        }
      },

      isViewed: (id) => {
        return get().viewedStoriesId.includes(id);
      },

      clearViewed: () => {
        set({ viewedStoriesId: [] });
      },
    }),
    {
      name: 'viewedStoriesId', // key in localStorage
    }
  )
);

export const isStoryViewed = (id: number): boolean => {
  return useViewedStories.getState().isViewed(id);
};

export default useViewedStories;
