import { GET_GOODS } from "../../constants/api";
import { withApi } from "../../hoc-helpers/withApi";
import { Pagination } from "antd";
import { ListItem } from "./ListItem";
function ListOfGoods({ data, setPage, page, deleteItem }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-light wrapper-sort">
          <tr>
            <th>
              <button
                class="btn-sort btn btn-link w-100 h-100 text-decoration-none"
                data-sort="id"
              >
                id
              </button>
            </th>
            <th>
              <button
                class="btn-sort btn btn-link w-100 h-100 text-decoration-none"
                data-sort="title"
              >
                Наименование товара
              </button>
            </th>
            <th>
              <button
                class="btn-sort btn btn-link w-100 h-100 text-decoration-none"
                data-sort="category"
              >
                Категория
              </button>
            </th>
            <th>
              <button
                class="btn-sort btn btn-link w-100 h-100 text-decoration-none"
                data-sort="price"
              >
                Стоимость
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider table-goods">
          {data.goods.map((item) => {
            return <ListItem key={item.id} {...item} deleteItem={deleteItem} />;
          })}
        </tbody>
      </table>
      <Pagination
        onChange={(pageNumber) => {
          setPage(pageNumber);
        }}
        defaultCurrent={page}
        total={data.pages * data.goods.length}
      />
      {/* 
      <div class="modal">
        <div class="modal-dialog">
          <form class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" name="header">
                Добавить новый товар
              </h5>
              <button
                type="button"
                class="btn-close"
                aria-label="Закрыть модальное окно"
              ></button>
            </div>
            <div class="modal-body" data-id-good="">
              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <input
                    type="text"
                    class="form-control"
                    name="title"
                    placeholder="Наименование"
                    aria-label="Наименование товара"
                    required
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <input
                    type="text"
                    class="form-control"
                    name="category"
                    list="category"
                    placeholder="Категория"
                    aria-label="Категория товара(eng/rus)"
                    required
                  />
                  <datalist id="category"> </datalist>
                </div>
                <div class="col-12">
                  <textarea
                    type="text"
                    class="form-control"
                    name="description"
                    placeholder="Описание"
                    aria-label="Описание товара"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div class="col-12 col-sm-6">
                  <input
                    type="number"
                    class="form-control"
                    name="display"
                    step="0.01"
                    placeholder="Экран"
                    aria-label="Размер экрана"
                  />
                </div>
                <div class="col-12 col-sm-6">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    step="1"
                    name="price"
                    placeholder="Цена"
                    aria-label="Цена товара"
                    required
                  />
                </div>
              </div>
              <hr />
              <label
                tabindex="0"
                for="image"
                class="btn btn-primary d-block mx-auto"
              >
                Добавить изображение
              </label>
              <input
                class="visually-hidden"
                tabindex="-1"
                type="file"
                name="image"
                id="image"
                accept="image/png"
              />
              <input type="hidden" name="imagesave" />
              <div class="wrapper-preview">
                <img class="preview" />
              </div>
            </div>
            <div class="modal-footer">
              <input type="hidden" name="id" />
              <button type="submit" class="btn btn-primary modal-submit-btn">
                Добавить товар
              </button>
            </div>
          </form>
        </div>
      </div> */}

      {/* <svg style="display: none">
        <symbol
          id="edit"
          viewbox="0 0 30 30"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8.75 21.2663L14.2662 21.2475L26.3062 9.3225C26.7787 8.85 27.0387 8.2225 27.0387 7.555C27.0387 6.8875 26.7787 6.26 26.3062 5.7875L24.3237 3.805C23.3787 2.86 21.73 2.865 20.7925 3.80125L8.75 15.7288V21.2663V21.2663ZM22.5562 5.5725L24.5425 7.55125L22.5462 9.52875L20.5637 7.5475L22.5562 5.5725ZM11.25 16.7713L18.7875 9.305L20.77 11.2875L13.2337 18.7513L11.25 18.7575V16.7713Z" />
          <path d="M6.25 26.25H23.75C25.1288 26.25 26.25 25.1288 26.25 23.75V12.915L23.75 15.415V23.75H10.1975C10.165 23.75 10.1313 23.7625 10.0988 23.7625C10.0575 23.7625 10.0163 23.7513 9.97375 23.75H6.25V6.25H14.8088L17.3088 3.75H6.25C4.87125 3.75 3.75 4.87125 3.75 6.25V23.75C3.75 25.1288 4.87125 26.25 6.25 26.25Z" />
        </symbol>
        <symbol
          id="delete"
          viewbox="0 0 30 30"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.75 6H17.25C17.25 5.40326 17.0129 4.83097 16.591 4.40901C16.169 3.98705 15.5967 3.75 15 3.75C14.4033 3.75 13.831 3.98705 13.409 4.40901C12.9871 4.83097 12.75 5.40326 12.75 6V6ZM11.25 6C11.25 5.00544 11.6451 4.05161 12.3483 3.34835C13.0516 2.64509 14.0054 2.25 15 2.25C15.9946 2.25 16.9484 2.64509 17.6517 3.34835C18.3549 4.05161 18.75 5.00544 18.75 6H26.25C26.4489 6 26.6397 6.07902 26.7803 6.21967C26.921 6.36032 27 6.55109 27 6.75C27 6.94891 26.921 7.13968 26.7803 7.28033C26.6397 7.42098 26.4489 7.5 26.25 7.5H24.669L22.878 23.016C22.7514 24.1128 22.226 25.1248 21.4018 25.8594C20.5776 26.594 19.5121 26.9999 18.408 27H11.592C10.4879 26.9999 9.42242 26.594 8.59821 25.8594C7.77399 25.1248 7.2486 24.1128 7.122 23.016L5.331 7.5H3.75C3.55109 7.5 3.36032 7.42098 3.21967 7.28033C3.07902 7.13968 3 6.94891 3 6.75C3 6.55109 3.07902 6.36032 3.21967 6.21967C3.36032 6.07902 3.55109 6 3.75 6H11.25ZM13.5 12C13.5 11.8011 13.421 11.6103 13.2803 11.4697C13.1397 11.329 12.9489 11.25 12.75 11.25C12.5511 11.25 12.3603 11.329 12.2197 11.4697C12.079 11.6103 12 11.8011 12 12V21C12 21.1989 12.079 21.3897 12.2197 21.5303C12.3603 21.671 12.5511 21.75 12.75 21.75C12.9489 21.75 13.1397 21.671 13.2803 21.5303C13.421 21.3897 13.5 21.1989 13.5 21V12ZM17.25 11.25C17.0511 11.25 16.8603 11.329 16.7197 11.4697C16.579 11.6103 16.5 11.8011 16.5 12V21C16.5 21.1989 16.579 21.3897 16.7197 21.5303C16.8603 21.671 17.0511 21.75 17.25 21.75C17.4489 21.75 17.6397 21.671 17.7803 21.5303C17.921 21.3897 18 21.1989 18 21V12C18 11.8011 17.921 11.6103 17.7803 11.4697C17.6397 11.329 17.4489 11.25 17.25 11.25Z" />
        </symbol>
      </svg> */}
    </div>
  );
}
export default withApi(ListOfGoods, GET_GOODS);
