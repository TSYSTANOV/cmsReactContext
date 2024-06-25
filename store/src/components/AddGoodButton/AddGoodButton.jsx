import { useModal } from "../../context/ModalContextApp";

function AddGoodButton() {
  const { setOpenModal } = useModal();
  return (
    <button
      type="button"
      className="modal-open-btn btn btn-success d-block mb-3 ms-auto"
      onClick={() => {
        setOpenModal(true);
      }}
    >
      Добавить товар
    </button>
  );
}
export { AddGoodButton };
