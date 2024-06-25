import { API_component } from "./api.js";

class Modal {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderModal(good = "") {
    const modalWindow = document.createElement("div");
    modalWindow.className = "modals";
    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialogs";
    const form = document.createElement("form");
    form.className = "modal-content";
    form.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" name="header">Добавить новый товар</h5>
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
      >Добавить изображение</label
    >
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
    `;

    modalDialog.append(form);
    modalWindow.append(modalDialog);
    document.querySelector(this.ROOT_element).prepend(modalWindow);
    
    this.addListenerModalWindow(modalWindow)
    form.image.addEventListener('change',async()=>{
        form.imagesave.value = await this.toBase64(form.image.files[0])
    })
    if(good){
      form.dataset.productId = good.id
      form.title.value = good.title
      form.category.value = good.category
      form.display.value = good.display
      form.description.value = good.description
      form.price.value = good.price
      form.imagesave.value = good.image
      this.showPreview(good.image, API_component.BASE_URL)
      form.querySelector('.modal-submit-btn').textContent = 'Изменить товар'
    }
    form.addEventListener('submit',()=>{
      event.preventDefault()
      this.formListener(form)
    })

  }
  formListener(form){
    event.preventDefault()
    const data = new FormData(form)
    const newGood = Object.fromEntries(data)
    newGood.image = newGood.imagesave
    delete newGood.imagesave

    if(form.dataset.productId){
      API_component.updateProduct(form.dataset.productId, newGood)
    }else{
      API_component.setNewGoods(newGood)
    }

  }
  removeModal(HTMLelement) {
    HTMLelement.remove();
  }
  addListenerModalWindow(HTMLelement){
    HTMLelement.addEventListener('click',()=>{
      if(event.target.classList.contains('modals') || event.target.classList.contains('btn-close')){
        this.removeModal(HTMLelement)
      }
    })
  }
  addListener(HTMLelement) {
    document.querySelector(HTMLelement).addEventListener("click", () => {
      this.renderModal();
    });
  }
  toBase64(image){
    return new Promise((resolve, reject) => {
      const file = new FileReader()
      file.addEventListener('loadend',()=>{
        this.showPreview(file.result)
        resolve(file.result)
      })
      file.readAsDataURL(image)
    })
  }
  showPreview(src, BASE_URL){
    document.querySelector('.preview').style.display = 'block'
    document.querySelector('.preview').src = BASE_URL ? BASE_URL+'/'+src : src
  }
}

const MODAL_component = new Modal(".table-responsive");
export { MODAL_component };
