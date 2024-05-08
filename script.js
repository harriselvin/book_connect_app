// script.js
import { books, authors, genres } from "./modules/data.js";
import { setTheme } from "./modules/theme.js";
import {
  createPreview,
  showPreviewDetails,
  closePreview,
} from "./modules/preview.js";
import {
  populateAuthorOptions,
  populateGenreOptions,
  toggleSearchOverlay,
  performSearch,
} from "./modules/search.js";
import { showMoreItems } from "./modules/showMore.js";

// Defined variables
const matches = books;
let page = 1;
let range = books.length;

// Check if source is valid
if (!books || !Array.isArray(books)) {
  throw new Error("Source required");
}

// Check if range is valid
if (!range || range.length < 2) {
  throw new Error("Range must be an array with two numbers");
}

// Set theme colors based on user selection
const dataSettingsTheme = document.querySelector("[data-settings-theme]");
const saveButton = document.querySelector(
  "body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary"
);

saveButton.addEventListener("click", (event) => {
  event.preventDefault();

  setTheme(dataSettingsTheme.value);

  if (typeof appOverlays !== "undefined") {
    appOverlays.settingsOverlay.close();
  }
});

// Create a new document fragment called "fragment"
const fragment = document.createDocumentFragment();
let startIndex = 0;
let endIndex = 36;

for (let i = startIndex; i < endIndex; i++) {
  const preview = createPreview(books[i], authors);
  fragment.appendChild(preview);
}

const settingButton = document.querySelector("[data-header-settings]");
const settingCancel = document.querySelector("[data-settings-cancel]");
settingButton.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "block";
});
settingCancel.addEventListener("click", (event) => {
  document.querySelector("[data-settings-overlay]").style.display = "none";
});

const detailsClose = document.querySelector("[data-list-close]");
detailsClose.addEventListener("click", closePreview);

const bookClick = document.querySelector("[data-list-items]");
bookClick.addEventListener("click", showPreviewDetails);

// Search functionality
populateAuthorOptions(authors);
populateGenreOptions(genres);

const searchButton = document.querySelector("[data-header-search]");
searchButton.addEventListener("click", () => {
  toggleSearchOverlay();
  performSearch(books, authors); // Pass books and authors as arguments
});

const searchCancel = document.querySelector("[data-search-cancel]");
searchCancel.addEventListener("click", (event) => {
  document.querySelector("[data-search-overlay]").style.display = "none";
});

// Show more button
const showMoreButton = document.querySelector("[data-list-button]");
const numItemsToShow = Math.min(books.length - endIndex);
const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`;
showMoreButton.innerHTML = showMoreButtonText;
showMoreButton.addEventListener("click", () => {
    startIndex += 36;
    endIndex += 36;
    const startIndex1 = startIndex;
    const endIndex1 = endIndex;
    const extracted = books.slice(startIndex1, endIndex1);

    showMoreItems(startIndex, endIndex, books, authors);

    // Update the text of the "Show More" button to display how many more items will be displayed
    const numItemsToShow = Math.min(books.length - endIndex);
    const showMoreButtonText = `Show More <span style="opacity: 0.5">(${numItemsToShow})</span>`;
    showMoreButton.innerHTML = showMoreButtonText;

});

const bookList = document.querySelector("[data-list-items]");
bookList.appendChild(fragment);

