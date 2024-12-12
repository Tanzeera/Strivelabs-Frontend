import { fetchAllCountries, searchCountries, fetchCountryDetails } from "./api.js";
import { renderCountries, renderFavorites } from "./ui.js";

let countries = [];
export let displayedCount = 0;
export let currentSearchResults = [];
export const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.getElementById("search-bar").addEventListener("input", handleSearch);
document.getElementById("load-more").addEventListener("click", loadMore);
document.getElementById("region-filter").addEventListener("change", handleFilter);
document.getElementById("language-filter").addEventListener("change", handleFilter);
document.getElementById("countries-container").addEventListener("click", handleCountryClick);
document.getElementById("reset-button").addEventListener("click", resetState);


function saveState() {
  localStorage.setItem("displayedCount", displayedCount);
  localStorage.setItem("currentSearchResults", JSON.stringify(currentSearchResults));
}


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

   updateDisplayedCountries();
}

function updateDisplayedCountries() {
  const query = document.getElementById("search-bar").value.trim();
  const regionSelect = document.querySelector("#region-filter .custom-dropdown-btn").textContent.trim();
  const languageSelect = document.querySelector("#language-filter .custom-dropdown-btn").textContent.trim();

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
  currentSearchResults = filteredCountries;
  const container = document.getElementById("countries-container");
  container.innerHTML = ""; 
  renderCountries(currentSearchResults.slice(0, displayedCount), favorites);
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.style.display = displayedCount < currentSearchResults.length ? "block" : "none";
  saveState();
}
document.getElementById("close-message").addEventListener("click", () => {
  const messageContainer = document.getElementById("message-container");
  messageContainer.style.display = "none";
});

async function init() {
  countries = await fetchAllCountries();
  restoreState(); 
  applyFiltersAndSearch("");
  renderFavorites(favorites);

}

async function handleSearch(event) {
  const query = event.target.value.trim();
  const dropdown = document.getElementById("search-dropdown");


  if (!query) {
    dropdown.style.display = "none";
    return;
  }


  const regionSelect = document.querySelector("#region-filter .custom-dropdown-btn").textContent.trim();
  const languageSelect = document.querySelector("#language-filter .custom-dropdown-btn").textContent.trim();

  let filteredCountries = countries;


  if (regionSelect !== "All Regions") {
    filteredCountries = filteredCountries.filter(country => country.region === regionSelect);
  }


  if (languageSelect !== "All Languages") {
    filteredCountries = filteredCountries.filter(country =>
      Object.values(country.languages || {}).some(lang => lang.toLowerCase() === languageSelect.toLowerCase())
    );
  }


  const searchResults = await searchCountries(query);
  const filteredSearchResults = filteredCountries.filter(country =>
    searchResults.some(result => result.name.common.toLowerCase() === country.name.common.toLowerCase())
  );


  const suggestions = filteredSearchResults.slice(0, 5);


  dropdown.innerHTML = "";

  if (suggestions.length === 0) {

    dropdown.innerHTML = '<span class="no-results">No results found</span>';
  } else {

    dropdown.innerHTML = suggestions
      .map(
        (country) => `
        <li class="dropdown-item" data-name="${country.name.common}">
          ${country.name.common}
        </li>`
      )
      .join("");


    if (filteredSearchResults.length > 10) {
      const viewAllButton = document.createElement("li");
      viewAllButton.classList.add("dropdown-item", "view-all");
      viewAllButton.textContent = "View All";
      viewAllButton.dataset.query = query;
      dropdown.appendChild(viewAllButton);
    }
  }

  dropdown.style.display = "block";
}

document.getElementById("search-dropdown").addEventListener("click", async (event) => {
  const target = event.target;

  if (target.classList.contains("dropdown-item")) {
    const countryName = target.dataset.name;
    if (countryName) {
   
      const detailsUrl = `country-details.html?name=${encodeURIComponent(countryName)}`;
      window.location.href = detailsUrl;
    } else if (target.classList.contains("view-all")) {

      const query = target.dataset.query;
      await handleViewAllClick(query);
      
     
      const loadMoreButton = document.getElementById("load-more");
      loadMoreButton.style.display = "block";  
    }
  }
});


document.addEventListener("click", (event) => {
  const dropdown = document.getElementById("search-dropdown");
  if (!dropdown.contains(event.target) && event.target.id !== "search-bar") {
    dropdown.style.display = "none";
  }
});

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

  #search-dropdown .no-results {
    padding: 750px;
    font-size: 20px;
    color: #777;
    text-align: center;
    font-style: italic;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    width: 100%;
    box-sizing: border-box;
  }
`;
document.head.appendChild(style);


document.querySelectorAll('.custom-dropdown-btn').forEach(dropdownBtn => {
  dropdownBtn.addEventListener('click', function () {
    const dropdown = this.closest('.custom-dropdown');
    dropdown.classList.toggle('open');  
    dropdown.classList.toggle('active'); 
  });
});


document.querySelectorAll('.custom-dropdown-list li').forEach(item => {
  item.addEventListener('click', function () {
    const dropdown = this.closest('.custom-dropdown');
    const value = this.dataset.value;  
    const button = dropdown.querySelector('.custom-dropdown-btn'); 
    
 
    button.textContent = this.textContent;

    
    dropdown.querySelectorAll('li').forEach(li => li.classList.remove('active-filter'));
    this.classList.add('active-filter');


    button.classList.add('active-filter');

 
    dropdown.classList.remove('open'); 
    dropdown.classList.remove('active');  


    handleFilter();
  });
});

document.addEventListener('click', function (event) {
  document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('open'); 
      dropdown.classList.remove('active'); 
    }
  });
});

function handleFilter() {
  const query = document.getElementById("search-bar").value.trim();
  applyFiltersAndSearch(query);
}

function applyFiltersAndSearch(query = "") {
  const regionSelect = document.querySelector("#region-filter .custom-dropdown-btn").textContent.trim();
  const languageSelect = document.querySelector("#language-filter .custom-dropdown-btn").textContent.trim();

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

  currentSearchResults = filteredCountries;


  const container = document.getElementById("countries-container");
  container.innerHTML = ""; 

  
  if (filteredCountries.length > 10) {
    displayedCount = 10;
    renderCountries(filteredCountries.slice(0, 10), favorites);  
    document.getElementById("load-more").style.display = "block";  
  } else {
    displayedCount = filteredCountries.length;
    renderCountries(filteredCountries, favorites);  
    document.getElementById("load-more").style.display = "none";  
  }

  saveState();
}

function loadMore() {

  const filteredResults = currentSearchResults.slice(displayedCount, displayedCount + 10);
  displayedCount += 10;


  renderCountries(filteredResults, favorites);  


  saveState();


  const loadMoreButton = document.getElementById("load-more");
  if (displayedCount >= currentSearchResults.length) {
    loadMoreButton.style.display = "none";
  }
}

async function handleViewAllClick(query) {
  const regionSelect = document.querySelector("#region-filter .custom-dropdown-btn").textContent.trim();
  const languageSelect = document.querySelector("#language-filter .custom-dropdown-btn").textContent.trim();

  let filteredCountries = countries;


  if (regionSelect !== "All Regions") {
    filteredCountries = filteredCountries.filter(country => country.region === regionSelect);
  }


  if (languageSelect !== "All Languages") {
    filteredCountries = filteredCountries.filter(country =>
      Object.values(country.languages || {}).some(lang => lang.toLowerCase() === languageSelect.toLowerCase())
    );
  }


  const allResults = filteredCountries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  currentSearchResults = allResults;
  displayedCount = 10; 


  const container = document.getElementById("countries-container");
  container.innerHTML = ""; 

  
  renderCountries(currentSearchResults.slice(0, 10), favorites);

  
  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.style.display = currentSearchResults.length > 10 ? "block" : "none";

  const dropdown = document.getElementById("search-dropdown");
  dropdown.style.display = "none";
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

  
    const state = {
      query: document.getElementById("search-bar").value.trim(),
      region: document.getElementById("region-filter").value,
      language: document.getElementById("language-filter").value,
      displayedCount,
      favorites,
    };
    localStorage.setItem("countryExplorerState", JSON.stringify(state));

  
    const detailsUrl = `country-details.html?name=${encodeURIComponent(countryName)}`;
    window.location.href = detailsUrl;
  }
}

function resetState() {
  localStorage.removeItem("displayedCount");
  localStorage.removeItem("currentSearchResults");
  localStorage.removeItem("favorites");
  window.location.reload(); 
}

window.addEventListener("DOMContentLoaded", async () => {
  await init();
});
