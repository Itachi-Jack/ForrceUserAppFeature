import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSellerStore = create(
  persist(
    (set) => ({
      sellerPreference: {
        min: 0,
        max: 0,
        radius: 1,
        type: "All Sellers",
      },

      setSellerPreference: (data) =>
        set((state) => ({
          sellerPreference: {
            ...state.sellerPreference,
            ...data,
          },
        })),

      preferredSellers: [],

      addSeller: (seller) =>
        set((state) => ({
          preferredSellers: [...state.preferredSellers, seller],
        })),
    }),

    {
      name: "seller-storage", // key in storage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);