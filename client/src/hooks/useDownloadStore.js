import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { jsPDF } from "jspdf";

const useDownloadStore = create((set, get) => ({
  docId: null,
  docContent: null,

  updateId: async (id) => {
    set({ docId: id });

    try {
      const res = await axiosInstance.get(`/api/editor/generate-pdf/${id}`);
      set({ docContent: res.data.content });
    } catch (error) {
      console.error("Error fetching document content:", error);
    }
  },

  downloadDoc: async () => {
    try {
      const content = get().docContent;
      if (!content) {
        console.error("No content available for PDF generation.");
        return;
      }

      const doc = new jsPDF();
      const contentElement = document.createElement("div");

      // Apply custom styles for h2 and other elements
      contentElement.innerHTML = `
        <style>
          h1 { font-size: 22px; font-weight: bold; }
          h2 { font-size: 18px; font-weight: bold; color: #333; }
          p { font-size: 14px; }
        </style>
        ${content}
      `;

      document.body.appendChild(contentElement);

      await doc.html(contentElement, {
        callback: function (doc) {
          doc.save("document.pdf");
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 800,
      });

      document.body.removeChild(contentElement);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  },
}));

export default useDownloadStore;
