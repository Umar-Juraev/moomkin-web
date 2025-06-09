import { StateCreator } from 'zustand';

/**
 * UI State interface
 */
export interface UiState {
  // UI theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Sidebar state
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Modal state
  activeModal: string | null;
  openModal: (modalId: string) => void;
  closeModal: () => void;

  // Toast notifications
  toasts: Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;

  // Filter Discount
  filterDiscount: {
    category_id: string | null;
    company_id: string | null;
  };
  setFilterDiscount: (filter: { category_id: string | null; company_id: string | null }) => void;
  resetFilterDiscount: () => void;
}


export const createUiSlice: StateCreator<UiState> = (set) => ({
  // Theme
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

  // Sidebar
  isSidebarOpen: false,
  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  // Modal
  activeModal: null,
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),

  // Toasts
  toasts: [],
  addToast: (type, message) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now().toString(), type, message }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),

  // Filter Discount
  filterDiscount: {
    category_id: null,
    company_id: null,
  },
  setFilterDiscount: (filter) => set({ filterDiscount: filter }),
  resetFilterDiscount: () => set({ filterDiscount: { category_id: null, company_id: null } }),
});
