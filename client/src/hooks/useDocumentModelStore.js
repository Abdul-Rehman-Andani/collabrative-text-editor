import { create } from "zustand";

const useDocumentModelStore = create((set) => ({
  isDocumentModel: false,
  openDocumentModel: () => set({ isDocumentModel: true }),  
  closeDocumentModel: () => set({ isDocumentModel: false }), 
}));

export default useDocumentModelStore;
