import { currentSearchResults, favorites } from "./app.js";

export function renderCountries(countries, favorites) {
  const container = document.getElementById("countries-container");
  container.innerHTML = countries.map((country) =>
    createCountryCard(country, favorites)
  ).join("");
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

export function renderCountryDetails(country) {
  const container = document.getElementById("countries-container");
  container.innerHTML = `
    <div class="country-details">
      <button id="back-button">← Back</button>
      <h1>${country.name.common}</h1>
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
      <p><strong>Top Level Domain:</strong> ${country.tld.join(", ")}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
    </div>
  `;

  document.getElementById("back-button").addEventListener("click", () => {
    renderCountries(currentSearchResults, favorites);
  });
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
  renderCountries(currentSearchResults, favorites);
}

function createFavoriteCard(countryName) {
  return `
    <div class="favorite-country">
      <h3>${countryName}</h3>
      <button class="remove-favorite-btn" data-name="${countryName}">Remove</button>
    </div>
  `;
}
