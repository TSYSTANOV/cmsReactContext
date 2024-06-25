import { useEffect, useState } from "react";
import { useModal } from "../../context/ModalContextApp";
import { API_SERVER } from "../../constants/api";

export function Modal() {
  const { isOpenModal, setOpenModal, createItem, activeItem, editItem } =
    useModal();

  const [formData, setFormData] = useState({
    title: "",
    id: "",
    description: "",
    display: "",
    price: "",
    category: "",
    image: "",
  });
  console.log(formData);
  useEffect(() => {
    if (activeItem) {
      setFormData(activeItem);
    }
  }, [activeItem]);
  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFormData((prev) => {
        return { ...prev, image: reader.result };
      });
    });
    reader.readAsDataURL(e.target.files[0]);
  };
  const submit = (e) => {
    e.preventDefault();
    if (activeItem.title) {
      editItem(formData);
    } else {
      createItem(formData);
    }
    setOpenModal(false);
    e.target.reset();
    setFormData({});
  };
  if (isOpenModal) {
    return (
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={submit}>
            <div className="modal-header">
              <h5 className="modal-title" name="header">
                {activeItem.title ? activeItem.title : "Добавить новый товар"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Закрыть модальное окно"
                onClick={() => {
                  setOpenModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <input
                    value={formData.title}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, title: e.target.value };
                      });
                    }}
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Наименование"
                    aria-label="Наименование товара"
                    required
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="category"
                    list="category"
                    placeholder="Категория"
                    aria-label="Категория товара(eng/rus)"
                    value={formData.category}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, category: e.target.value };
                      });
                    }}
                    required
                  />
                  <datalist id="category"> </datalist>
                </div>
                <div className="col-12">
                  <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Описание"
                    aria-label="Описание товара"
                    rows="5"
                    value={formData.description}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, description: e.target.value };
                      });
                    }}
                    required
                  ></textarea>
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    name="display"
                    step="0.01"
                    placeholder="Экран"
                    aria-label="Размер экрана"
                    value={formData.display}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, display: e.target.value };
                      });
                    }}
                  />
                </div>
                <div className="col-12 col-sm-6">
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    step="1"
                    name="price"
                    placeholder="Цена"
                    aria-label="Цена товара"
                    required
                    value={formData.price}
                    onChange={(e) => {
                      setFormData((prev) => {
                        return { ...prev, price: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
              <hr />
              <label
                tabIndex="0"
                htmlFor="image"
                className="btn btn-primary d-block mx-auto"
              >
                {activeItem.title
                  ? "Изменить/Добавить изображение"
                  : "Добавить изображение"}
              </label>
              <input
                className="visually-hidden"
                tabIndex="-1"
                type="file"
                name="image"
                id="image"
                accept="image/png"
                onChange={imageHandler}
              />
              <input type="hidden" name="imagesave" />
              <div className="wrapper-preview">
                <img
                  className="preview"
                  src={
                    formData.image && formData.image.startsWith("img")
                      ? API_SERVER + formData.image
                      : formData.image
                  }
                  style={{ display: "block" }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <input type="hidden" name="id" />
              <button
                type="submit"
                className="btn btn-primary modal-submit-btn"
              >
                {activeItem.title ? "Изменить товар" : "Добавить товар"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
