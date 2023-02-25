import { useState, createContext } from "react";

export const ModalContext = createContext(null);

export function ModalProvider(props) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <ModalContext.Provider value={[isModalOpen, setIsModalOpen]}>
      {props.children}
    </ModalContext.Provider>
  );
}
