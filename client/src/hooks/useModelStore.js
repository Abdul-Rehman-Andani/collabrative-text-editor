import { create } from "zustand";

const useModelStore = create((set) => ({
  isModel: false,
  openModel: () => set({ isModel: true }), 
  closeModel: () => set({ isModel: false }), 
}));

export default useModelStore;
