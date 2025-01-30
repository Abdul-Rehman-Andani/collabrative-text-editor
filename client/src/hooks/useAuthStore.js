import { create } from "zustand";

const useAuthStore = create((set) => ({
  isSignin: true,
  iSsignout: false,
  signin: () => set((state) => ({ isSignin: false, iSsignout: true })),
  signout: () => set((state) => ({ iSsignout: false, isSignin: true })),
}));

export default useAuthStore;
