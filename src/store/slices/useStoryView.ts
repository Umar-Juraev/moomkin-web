import { create } from 'zustand';

export interface ViewedStoriesState {
  viewedStoriesId: number[];
  addViewed: (id: number) => void;
  removeViewed: (id: number) => void;
  toggleViewed: (id: number) => void;
  isViewed: (id: number) => boolean;
  clearViewed: () => void;
}

const VIEWED_STORIES_KEY = 'viewedStoriesId';

const saveToStorage = (ids: number[]) => {
  try {
    localStorage.setItem(VIEWED_STORIES_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Failed to save viewed stories to localStorage:', error);
  }
};

const loadFromStorage = (): number[] => {
  try {
    const saved = localStorage.getItem(VIEWED_STORIES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load viewed stories from localStorage:', error);
    return [];
  }
};

const useViewedStories = create<ViewedStoriesState>((set, get) => ({
  viewedStoriesId: loadFromStorage(),

  addViewed: (id) => {
    const current = get().viewedStoriesId;
    if (!current.includes(id)) {
      const updated = [...current, id];
      saveToStorage(updated);
      set({ viewedStoriesId: updated });
    }
  },

  removeViewed: (id) => {
    const updated = get().viewedStoriesId.filter(item => item !== id);
    saveToStorage(updated);
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
    saveToStorage([]);
    set({ viewedStoriesId: [] });
  },
}));

export const isStoryViewed = (id: number): boolean => {
  return useViewedStories.getState().isViewed(id);
};

export default useViewedStories;