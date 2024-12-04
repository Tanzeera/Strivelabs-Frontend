import { fetchAllCountries, searchCountries, fetchCountryDetails } from "./api.js";
import { renderCountries, renderFavorites, renderCountryDetails } from "./ui.js";

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
  if (index > -1) {
    favorites.splice(index, 1);
  } else if (favorites.length < 5) {
    favorites.push(countryName);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites(favorites);
}

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

  // Apply active filter
  if (region) {
    filteredCountries = filteredCountries.filter(
      (country) => country.region === region
    );
  } else if (language) {
    filteredCountries = filteredCountries.filter((country) =>
      Object.values(country.languages || {}).some(
        (lang) => lang.toLowerCase() === language.toLowerCase()
      )
    );
  }

  // Apply search query
  if (query) {
    filteredCountries = filteredCountries.filter((country) =>
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

  // Apply region filter if selected
  if (region && !language) {
    languageSelect.value = ""; // Clear the language filter
    filteredCountries = filteredCountries.filter(
      (country) => country.region === region
    );
  }

  // Apply language filter if selected
  if (language && !region) {
    regionSelect.value = ""; // Clear the region filter
    filteredCountries = filteredCountries.filter((country) =>
      Object.values(country.languages || {}).some(
        (lang) => lang.toLowerCase() === language.toLowerCase()
      )
    );
  }

  // Apply search query if present
  if (query) {
    filteredCountries = filteredCountries.filter((country) =>
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
    renderCountryDetails(countryDetails);
  }
}

window.addEventListener("load", async () => { await init(); });  
