import { create } from "zustand";

const useAuthStore = create((set) => ({
  // isSignin: true,
  // iSsignout: false,
  // signin: () => set((state) => ({ isSignin: false, iSsignout: true })),
  // signout: () => set((state) => ({ iSsignout: false, isSignin: true })),
  invite : false,
  showInvite : () => set({invite : true}),
  revomeInvite : () => set({invite : false}),
}));

export default useAuthStore;
