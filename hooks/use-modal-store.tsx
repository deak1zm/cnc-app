import { create } from "zustand";

type ModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProductModal = create<ModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
