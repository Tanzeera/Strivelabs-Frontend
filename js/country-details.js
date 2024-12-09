import { fetchCountryDetails } from "./api.js";

document.addEventListener("DOMContentLoaded", async () => {
  const countryName = localStorage.getItem('selectedCountry');  // Retrieve the selected country name
  if (!countryName) {
    // If no country is selected, redirect to the main page
    window.location.href = 'index.html'; 
    return;
  }

  const countryDetails = await fetchCountryDetails(countryName);
  renderCountryDetails(countryDetails);
});

function renderCountryDetails(country) {
  const container = document.getElementById("country-details");

  container.innerHTML = `
    <h1>${country.name.common}</h1>
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}" />
    <p><strong>Top Level Domain:</strong> ${country.tld.join(", ")}</p>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Region:</strong> ${country.region}</p>
    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
    <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(", ")}</p>
  `;

  document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = 'index.html';  // Redirect back to the main page
  });
}
