export function showMoreItems(startIndex, endIndex, books, authors) {
    const fragment = document.createDocumentFragment();
    const extracted = books.slice(startIndex, endIndex);
  
    for (const { author, image, title, id, description, published } of extracted) {
      const preview = document.createElement("dl");
      preview.className = "preview";
      preview.dataset.id = id;
      preview.dataset.title = title;
      preview.dataset.image = image;
      preview.dataset.subtitle = `${authors[author]} (${new Date(published).getFullYear()})`;
      preview.dataset.description = description;
  
      preview.innerHTML = /*html*/ `
        <div>
          <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
          <dt class='preview__title'>${title}<dt>
          <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`;
      fragment.appendChild(preview);
    }
  
    const bookList = document.querySelector("[data-list-items]");
    bookList.appendChild(fragment);
  }
  