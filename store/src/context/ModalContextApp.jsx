import { createContext, useContext, useEffect, useState } from "react";
import { CREATE_ITEM, EDIT_ITEM, GET_ITEM } from "../constants/api";

const ModalContext = createContext({});

export function ModalContextApp({ children }) {
  const [isOpenModal, setOpenModal] = useState(false);
  const [activeItemId, setActiveItemId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  useEffect(() => {
    if (activeItemId) {
      (async () => {
        const res = await fetch(GET_ITEM + activeItemId).then((res) =>
          res.json()
        );
        setActiveItem(res);
        setOpenModal(true);
      })();
    }
  }, [activeItemId]);
  async function createItem(newItem) {
    try {
      const res = await fetch(CREATE_ITEM, {
        method: "POST",
        body: JSON.stringify(newItem),
      });
    } catch (err) {}
  }
  async function editItem(item) {
    try {
      const res = await fetch(EDIT_ITEM + item.id, {
        method: "PATCH",
        body: JSON.stringify(item),
      });
      setActiveItem(null);
      setActiveItemId(null);
    } catch (err) {}
  }
  return (
    <ModalContext.Provider
      value={{
        setOpenModal,
        isOpenModal,
        createItem,
        activeItem,
        setActiveItemId,
        editItem,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export const useModal = () => useContext(ModalContext);
