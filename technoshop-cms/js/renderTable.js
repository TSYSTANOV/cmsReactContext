import { API_component } from "./api.js";
import { MODAL_component } from "./modal.js";
import { GOODS_component } from "./renderGoods.js";
class Table {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderTable() {
    const table = document.createElement("table");
    table.className = "table table-bordered";
    table.innerHTML = `    
             <thead class="table-light wrapper-sort">
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
          </thead>`;
    const tableBody = document.createElement("tbody");
    tableBody.className = "table-group-divider table-goods";
    table.append(tableBody);
    GOODS_component.renderGoods(tableBody);
    document.querySelector(this.ROOT_element).prepend(table);
    this.addListener(table)
  }
  addListener(HTMLelement){
    HTMLelement.addEventListener('click',async ()=>{
      if(event.target.closest('.btn-delete')){

        API_component.deleteProduct(event.target.closest('tr').dataset.id)
        return
      }
      const data = await API_component.getSingleGood(event.target.parentNode.dataset.id)
      MODAL_component.renderModal(data)
    })
  }
}

const TABLE_component = new Table(".table-responsive");
export { TABLE_component };
