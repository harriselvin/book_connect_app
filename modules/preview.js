// Importing 'authors' data
import { authors } from "./data.js";

// Defining the 'BookPreview' component
class BookPreview extends HTMLElement {
  connectedCallback() {
    const book = JSON.parse(this.getAttribute("data-book"));

    this.innerHTML = `
      <dl class="preview" data-id="${book.id}" data-title="${
      book.title
    }" data-image="${book.image}" data-subtitle="${
      authors[book.author]
    } (${new Date(book.published).getFullYear()})" data-description="${
      book.description
    }" data-genre="${book.genres}">
        <div>
          <img class="preview__image" src="${book.image}" alt="book pic"/>
        </div>
        <div class="preview__info">
          <dt class="preview__title">${book.title}</dt>
          <dt class="preview__author">By ${authors[book.author]}</dt>
        </div>
      </dl>
    `;
  }
}

// Defining the 'BookOverlay' component
class BookOverlay extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div data-list-active>
        <h2 data-list-title></h2>
        <h3 data-list-subtitle></h3>
        <p data-list-description></p>
        <img data-list-image/>
        <img data-list-blur/>
      </div>
    `;
  }
}

customElements.define("book-preview", BookPreview);
customElements.define("book-overlay", BookOverlay);

// Creates new instance of 'book-preview'
export function createPreview(book) {
  const preview = document.createElement("book-preview");
  preview.setAttribute("data-book", JSON.stringify(book));

  return preview;
}
  
  export function showPreviewDetails(event) {
    const overlay = document.querySelector("[data-list-active]");
    const title = document.querySelector("[data-list-title]");
    const subtitle = document.querySelector("[data-list-subtitle]");
    const description = document.querySelector("[data-list-description]");
    const image = document.querySelector("[data-list-image]");
    const imageBlur = document.querySelector("[data-list-blur]");
  
    if (event.target.dataset.id) {
      overlay.style.display = "block";
    }
  
    if (event.target.dataset.description) {
      description.innerHTML = event.target.dataset.description;
    }
  
    if (event.target.dataset.subtitle) {
      subtitle.innerHTML = event.target.dataset.subtitle;
    }
  
    if (event.target.dataset.title) {
      title.innerHTML = event.target.dataset.title;
    }
  
    if (event.target.dataset.image) {
      image.setAttribute("src", event.target.dataset.image);
      imageBlur.setAttribute("src", event.target.dataset.image);
    }
  }
  
  export function closePreview() {
    const overlay = document.querySelector("[data-list-active]");
    overlay.style.display = "none";
  }
  
