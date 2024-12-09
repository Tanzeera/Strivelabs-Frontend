import { fetchCountryDetails } from "./api.js";

async function loadCountryDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("name");

  if (!countryName) {
    console.error("No country specified in the URL.");
    return;
  }

  try {
    const countryDetails = await fetchCountryDetails(countryName);
    renderCountryDetails(countryDetails);
  } catch (error) {
    console.error("Error fetching country details:", error);
  }
}

function renderCountryDetails(country) {
  const detailsContainer = document.getElementById("country-details");
  
  // Example rendering logic
  detailsContainer.innerHTML = `
    <h1>${country.name.common}</h1>
    <p>Region: ${country.region}</p>
    <p>Population: ${country.population}</p>
    <p>Languages: ${Object.values(country.languages || {}).join(", ")}</p>
    <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
    <img src="${country.flags.svg}" alt="${country.name.common} flag" />
  `;
}

function changePage() {
    window.location.href("country-details.html");
}

window.addEventListener("DOMContentLoaded", loadCountryDetails);
