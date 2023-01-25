import { create } from 'zustand';

export default create((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  isRequesting: false,
  setIsRequesting: (isRequesting) => set({ isRequesting }),
}));
