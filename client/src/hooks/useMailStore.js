import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const useMailStore = create((set, get) => ({
  docId: null,
  updateDocId: (id) => set({ docId: id }),
  sendInvite: async (user, link) => {
    const id = get().docId;
    try {
      const res = await axiosInstance.post(`/api/mail/invite`, {user, link});
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useMailStore;
