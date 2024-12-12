import { currentSearchResults, favorites, displayedCount } from "./app.js";

export function renderCountries(countries, favorites) {
  const container = document.getElementById("countries-container");


  countries.forEach((country) => {
    container.innerHTML += createCountryCard(country, favorites);
  });
}

function createCountryCard(country, favorites) {
  const isFavorite = favorites.includes(country.name.common);
  const favoriteIcon = isFavorite ? "❤️" : "🤍";

  return `
    <div class="country-card" data-name="${country.name.common}">
      <div class="country-image">
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
      </div>
      <h2>${country.name.common}</h2>
      <button class="favorite-btn" data-name="${country.name.common}">
        ${favoriteIcon}
      </button>
    </div>
  `;
}

export function renderFavorites(favorites) {
  const container = document.getElementById("favorites-container");

  if (favorites.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "block";
  container.innerHTML = favorites.map(createFavoriteCard).join("");

  container.querySelectorAll(".remove-favorite-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const countryName = event.target.dataset.name;
      removeFavorite(countryName);
    });
  });
}

function removeFavorite(countryName) {
  const index = favorites.indexOf(countryName);
  if (index > -1) {
    favorites.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));


  renderFavorites(favorites);


  const container = document.getElementById("countries-container");
  container.innerHTML = ""; 


  renderCountries(currentSearchResults.slice(0, displayedCount), favorites);
}

function createFavoriteCard(countryName) {
  return `
    <div class="favorite-country">
      <h3>${countryName}</h3>
      <button class="remove-favorite-btn" data-name="${countryName}">Remove</button>
    </div>
  `;
}
