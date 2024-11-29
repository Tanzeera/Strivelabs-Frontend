const API_URL = "https://restcountries.com/v3.1";

export async function fetchAllCountries() {
  try {
    console.log("Inside fetchAllCountries");
    const response = await fetch(`${API_URL}/all`);
    if (!response.ok) throw new Error("Failed to fetch countries");
    return response.json();
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

export async function searchCountries(query) {
  try {
    console.log("Inside searchCountries");
    const response = await fetch(`${API_URL}/name/${query}`);
    if (!response.ok) throw new Error("Failed to fetch countries by name");
    return response.json();
  } catch (error) {
    console.error("Error searching countries:", error);
    return [];
  }
}

export async function fetchCountryDetails(countryName) {
  try {
    console.log("Inside fetchCountryDetails");
    const response = await fetch(`${API_URL}/name/${countryName}`);
    if (!response.ok) throw new Error("Failed to fetch country details");
    const countries = await response.json();
    return countries[0]; // Assuming the first result is the most relevant
  } catch (error) {
    console.error("Error fetching country details:", error);
    return null;
  }
}
