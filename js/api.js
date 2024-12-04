const API_URL = "https://restcountries.com/v3.1";
const PROXY_URL = "https://api.allorigins.win/get?url=";

export async function fetchAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");

    if (!response.ok) {
      // Read the response text to get more details
      const errorDetails = await response.text();
      throw new Error(`Error: ${response.status} - ${response.statusText} - ${errorDetails}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;  // Re-throw to propagate to the caller
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
