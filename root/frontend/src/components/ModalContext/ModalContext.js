import { createContext, useContext, useState } from "react";

export const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
