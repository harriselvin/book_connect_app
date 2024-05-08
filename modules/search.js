// search.js
export function populateAuthorOptions(authors) {
    const allAuthorsOption = document.createElement("option");
    allAuthorsOption.value = "any";
    allAuthorsOption.textContent = "All authors";
    const authorSelect = document.querySelector("[data-search-authors]");
    authorSelect.appendChild(allAuthorsOption);
  
    for (const authorId in authors) {
      const optionElement = document.createElement("option");
      optionElement.value = authorId;
      optionElement.textContent = authors[authorId];
      authorSelect.appendChild(optionElement);
    }
}
  
export function populateGenreOptions(genres) {
    const genreSelect = document.querySelector("[data-search-genres]");
    const allGenresOption = document.createElement("option");
    allGenresOption.value = "any";
    allGenresOption.innerText = "All Genres";
    genreSelect.appendChild(allGenresOption);

    for (const [genreId, genreName] of Object.entries(genres)) {
        const optionElement = document.createElement("option");
        optionElement.value = genreId;
        optionElement.textContent = genreName;
        genreSelect.appendChild(optionElement);
    }
}
  
  export function toggleSearchOverlay() {
    const searchOverlay = document.querySelector("[data-search-overlay]");
    searchOverlay.style.display = "block";
  }
  
  export function performSearch() {
    const authorSelect = document.querySelector("[data-search-authors]");
    const genreSelect = document.querySelector("[data-search-genres]");
    const searchQuery = document.getElementById("search-input").value.toLowerCase();
  
    const selectedAuthor = authorSelect.value;
    const selectedGenre = genreSelect.value;
  
    // Perform your search logic here
    // You can use the selectedAuthor, selectedGenre, and searchQuery variables to filter the data
  
    // Example search logic
    const searchResults = books.filter((book) => {
      const authorMatch =
        selectedAuthor === "any" || book.author === selectedAuthor;
      const genreMatch = selectedGenre === "any" || book.genre === selectedGenre;
      const titleMatch = book.title.toLowerCase().includes(searchQuery);
      return authorMatch && genreMatch && titleMatch;
    });
  
    // Display the search results
    const bookList = document.querySelector("[data-list-items]");
    bookList.innerHTML = ""; // Clear the existing book list
  
    const fragment = document.createDocumentFragment();
  
    for (const book of searchResults) {
      const preview = createPreview(book, authors);
      fragment.appendChild(preview);
    }
  
    bookList.appendChild(fragment);
  }
  