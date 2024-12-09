import { fetchAllCountries, searchCountries, fetchCountryDetails } from "./api.js";
import { renderCountries, renderFavorites } from "./ui.js";

let countries = [];
let displayedCount = 0;
export let currentSearchResults = [];
export const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.getElementById("search-bar").addEventListener("input", handleSearch);
document.getElementById("load-more").addEventListener("click", loadMore);
document.getElementById("region-filter").addEventListener("change", handleFilter);
document.getElementById("language-filter").addEventListener("change", handleFilter);
document.getElementById("countries-container").addEventListener("click", handleCountryClick);

function toggleFavorite(countryName) {
  const index = favorites.indexOf(countryName);
  const messageContainer = document.getElementById("message-container");
  const messageText = document.getElementById("message-text");

  if (index > -1) {
    favorites.splice(index, 1);
  } else if (favorites.length < 5) {
    favorites.push(countryName);
  } else {
    messageText.textContent = "You can only add up to 5 favorites!";
    messageContainer.style.display = "flex";
    return;
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites(favorites);
}

document.getElementById("close-message").addEventListener("click", () => {
  const messageContainer = document.getElementById("message-container");
  messageContainer.style.display = "none";
});

async function init() {
  countries = await fetchAllCountries();
  currentSearchResults = countries.slice(0, 10);
  renderCountries(currentSearchResults, favorites);
  displayedCount = 10;
  renderFavorites(favorites);
}

function handleSearch(event) {
  const query = event.target.value.trim();
  const regionSelect = document.getElementById("region-filter");
  const languageSelect = document.getElementById("language-filter");
  const region = regionSelect.value;
  const language = languageSelect.value;

  let filteredCountries = countries;

  if (region) {
    filteredCountries = filteredCountries.filter(country => country.region === region);
  }
  if (language) {
    filteredCountries = filteredCountries.filter(country =>
      Object.values(country.languages || {}).some(lang => lang.toLowerCase() === language.toLowerCase())
    );
  }
  if (query) {
    filteredCountries = filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderCountries(filteredCountries, favorites);
}

function handleFilter() {
  const regionSelect = document.getElementById("region-filter");
  const languageSelect = document.getElementById("language-filter");
  const query = document.getElementById("search-bar").value.trim();

  const region = regionSelect.value;
  const language = languageSelect.value;

  let filteredCountries = countries;

  if (region) {
    filteredCountries = filteredCountries.filter(country => country.region === region);
  }
  if (language) {
    filteredCountries = filteredCountries.filter(country =>
      Object.values(country.languages || {}).some(lang => lang.toLowerCase() === language.toLowerCase())
    );
  }
  if (query) {
    filteredCountries = filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  renderCountries(filteredCountries, favorites);
}

function loadMore() {
  displayedCount += 10;
  renderCountries(countries.slice(0, displayedCount), favorites);
}

async function handleCountryClick(event) {
  const target = event.target;

  if (target.classList.contains("favorite-btn")) {
    const countryName = target.dataset.name;
    toggleFavorite(countryName);

    const isFavorite = favorites.includes(countryName);
    target.textContent = isFavorite ? "❤️" : "🤍";

    renderFavorites(favorites);
    return;
  }

  const card = target.closest(".country-card");
  if (card) {
    const countryName = card.dataset.name;
    const countryDetails = await fetchCountryDetails(countryName);

    // Open the country details page in a new tab
    const detailsUrl = `country-details.html?name=${encodeURIComponent(countryName)}`;
    window.open(detailsUrl, '_blank');  // Navigate to the country details page
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await init();
});
