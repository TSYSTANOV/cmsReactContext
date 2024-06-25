import { MdOutlineDeleteOutline } from "react-icons/md";
import { useModal } from "../../context/ModalContextApp";
export function ListItem({ category, id, title, price, deleteItem }) {
  const { setActiveItemId } = useModal();
  return (
    <tr
      className="table-row table-goods-item"
      onClick={() => {
        setActiveItemId(id);
      }}
    >
      <td>{id}</td>
      <td>{title}</td>
      <td>{category}</td>
      <td className="text-end">{price} &#8381;</td>
      <td className="d-flex">
        <button
          className="btn-table btn-delete"
          onClick={() => {
            deleteItem(id);
          }}
        >
          <MdOutlineDeleteOutline />
        </button>
      </td>
    </tr>
  );
}
