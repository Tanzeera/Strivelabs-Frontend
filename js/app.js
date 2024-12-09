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
document.getElementById("reset-button").addEventListener("click", resetState);

// Save the current state to localStorage
function saveState() {
  localStorage.setItem("displayedCount", displayedCount);
  localStorage.setItem("currentSearchResults", JSON.stringify(currentSearchResults));
}

// Restore the state from localStorage
function restoreState() {
  const savedCount = localStorage.getItem("displayedCount");
  const savedResults = localStorage.getItem("currentSearchResults");

  if (savedCount && savedResults) {
    displayedCount = parseInt(savedCount, 10);
    currentSearchResults = JSON.parse(savedResults);
  } else {
    displayedCount = 10;
    currentSearchResults = countries.slice(0, displayedCount);
  }
}

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
  restoreState(); // Restore the state if available
  renderCountries(currentSearchResults, favorites);
  renderFavorites(favorites);
}

async function handleSearch(event) {
  const query = event.target.value.trim();
  const dropdown = document.getElementById("search-dropdown");

  if (!query) {
    dropdown.style.display = "none";
    return;
  }

  const searchResults = await searchCountries(query);
  
  // Limit to 5 results for dropdown suggestions
  const suggestions = searchResults.slice(0, 5);

  // Create dropdown items dynamically
  dropdown.innerHTML = suggestions
    .map(
      (country) => `
      <li class="dropdown-item" data-name="${country.name.common}">
        ${country.name.common}
      </li>`
    )
    .join("");

  // Add "View All" at the bottom of the dropdown
  dropdown.innerHTML += `
    <li class="dropdown-item view-all" data-query="${query}">
      View All
    </li>`;

  dropdown.style.display = "block";
}

document.getElementById("search-dropdown").addEventListener("click", async (event) => {
  const target = event.target;

  if (target.classList.contains("dropdown-item")) {
    const countryName = target.dataset.name;
    if (countryName) {
      // Handle clicking on a country suggestion
      const detailsUrl = `country-details.html?name=${encodeURIComponent(countryName)}`;
      window.open(detailsUrl, '_blank'); // Open country details in a new tab
    } else if (target.classList.contains("view-all")) {
      // Handle "View All" interaction
      const query = target.dataset.query;
      const allResults = await searchCountries(query);
      console.log(allResults);
      currentSearchResults = allResults;
      renderCountries(currentSearchResults, favorites);
      document.getElementById("search-dropdown").style.display = "none";
    }
  }
});

// Close dropdown if clicked outside
document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("search-dropdown");
  if (!dropdown.contains(event.target) && event.target.id !== "search-bar") {
    dropdown.style.display = "none";
  }
});

// CSS for dropdown
const style = document.createElement("style");
style.innerHTML = `
  #search-dropdown {
    position: absolute;
    top: 50px;
    left: 10px;
    right: 10px;
    max-height: 200px;
    overflow-y: auto;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    padding: 0;
    margin: 0;
    z-index: 10;
    display: none;
  }

  .dropdown-item {
    padding: 10px;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #f4f4f4;
  }

  .view-all {
    font-weight: bold;
    text-align: center;
    color: blue;
  }
`;
document.head.appendChild(style);

// Add event listener for the dropdown button to toggle visibility of the list
document.querySelectorAll('.custom-dropdown-btn').forEach(dropdownBtn => {
  dropdownBtn.addEventListener('click', function () {
    const dropdown = this.closest('.custom-dropdown');
    dropdown.classList.toggle('open');  // Toggle visibility of the dropdown list
    dropdown.classList.toggle('active');  // Toggle active class for visual styling
  });
});

// Add event listener for each dropdown list item (filter option)
document.querySelectorAll('.custom-dropdown-list li').forEach(item => {
  item.addEventListener('click', function () {
    const dropdown = this.closest('.custom-dropdown');
    const value = this.dataset.value;  // Get the value of the selected item
    const button = dropdown.querySelector('.custom-dropdown-btn');  // Get the dropdown button
    
    // Update the button text to reflect the selected value
    button.textContent = this.textContent;

    // Add 'active-filter' class to the selected item
    dropdown.querySelectorAll('li').forEach(li => li.classList.remove('active-filter'));
    this.classList.add('active-filter');

    // Add 'active-filter' class to the dropdown button
    button.classList.add('active-filter');

    // Close the dropdown after selecting an option
    dropdown.classList.remove('open');  // Hide the dropdown list
    dropdown.classList.add('active');   // Mark the dropdown as active to show styling

    // Trigger the filter function based on the selected value
    handleFilter();
  });
});

// Close the dropdown when clicking outside
document.addEventListener('click', function (event) {
  document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open');  // Close dropdown if clicked outside
      dropdown.classList.remove('active'); // Remove active class if clicked outside
    }
  });
});

function handleFilter() {
  const regionSelect = document.querySelector("#region-filter .custom-dropdown-btn").textContent.trim();
  const languageSelect = document.querySelector("#language-filter .custom-dropdown-btn").textContent.trim();
  const query = document.getElementById("search-bar").value.trim();

  let filteredCountries = countries;

  if (regionSelect !== "All Regions") {
    filteredCountries = filteredCountries.filter(country => country.region === regionSelect);
  }
  if (languageSelect !== "All Languages") {
    filteredCountries = filteredCountries.filter(country =>
      Object.values(country.languages || {}).some(lang => lang.toLowerCase() === languageSelect.toLowerCase())
    );
  }
  if (query) {
    filteredCountries = filteredCountries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
  }

  currentSearchResults = filteredCountries.slice(0, displayedCount); // Update the filtered results
  renderCountries(currentSearchResults, favorites);
  saveState(); // Save the updated state
}


function loadMore() {
  displayedCount += 10;
  currentSearchResults = countries.slice(0, displayedCount); // Update the current results
  renderCountries(currentSearchResults, favorites);
  saveState(); // Save the updated state
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
    saveState(); // Save the state before navigating to the details page
    const detailsUrl = `country-details.html?name=${encodeURIComponent(countryName)}`;
    window.open(detailsUrl, '_blank'); // Open the country details page in a new tab
  }
}


function resetState() {
  localStorage.removeItem("displayedCount");
  localStorage.removeItem("currentSearchResults");
  localStorage.removeItem("favorites");
  window.location.reload(); // Reload the page to reset
}


window.addEventListener("DOMContentLoaded", async () => {
  await init();
});
