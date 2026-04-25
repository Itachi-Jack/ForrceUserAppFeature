import { create } from 'zustand';
export const useSellerStore = create((set) => ({
  preference: {
    type: "All Sellers",
    radius: 1,
  },

  setPreference: (data) =>
    set((state) => ({
      preference: {
        ...state.preference,
        ...data,
      },
    })),

  config: {
    min: 1,
    max: 25,
  },

  setConfig: (min, max) =>
    set({
      config: { min, max },
    }),
}));