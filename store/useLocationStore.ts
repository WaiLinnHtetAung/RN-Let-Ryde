import { create } from "zustand";
import { LocationStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationLongitude: null,
  destinationLatitude: null,
  destinationAddress: null,

  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

  setDestinationLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      destinationLongitude: latitude,
      destinationLatitude: longitude,
      destinationAddress: address,
    }));
  },
}));
