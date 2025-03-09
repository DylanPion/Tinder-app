import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setUser: (user: any) => set({ user }),
}));
