import { create } from 'zustand';

export default create((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  isRequesting: false,
  setIsRequesting: (isRequesting) => set({ isRequesting }),

  replaceError: {
    "TypeError: Cannot read properties of undefined (reading 'id')":
      'Twitter account not found or suspended.',
    "Cannot read properties of undefined (reading 'id')":
      'Twitter account not found or suspended.',
  },
}));
