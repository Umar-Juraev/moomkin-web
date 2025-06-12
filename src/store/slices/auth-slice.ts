// import { User } from '@/lib/types/user';
import { StateCreator } from 'zustand';

/**
 * Auth State interface
 */
// export interface AuthState {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   error: string | null;

//   login: (user: User) => void;
//   logout: () => void;
//   setLoading: (isLoading: boolean) => void;
//   setError: (error: string | null) => void;
// }

/**
 * Auth slice for the store
 */
// export const createAuthSlice: StateCreator<AuthState> = (set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,

//   login: (user) => set({ user, isAuthenticated: true, error: null }),
//   logout: () => set({ user: null, isAuthenticated: false }),
//   setLoading: (isLoading) => set({ isLoading }),
//   setError: (error) => set({ error }),
// });
