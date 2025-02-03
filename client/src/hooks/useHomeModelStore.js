import { create } from "zustand";

const useHomeModelStore = create((set) => ({
  isHomeModel: false,
  openHomeModel: () => set({ isHomeModel: true }),  
  closeHomeModel: () => set({ isHomeModel: false }), 
}));

export default useHomeModelStore;
