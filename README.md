
# Country Explorer

**Country Explorer** is a web application that allows users to explore information about countries worldwide. It offers features like keyword search, filtering by region or language, a favorites section, detailed country views, and dynamic UI elements for a seamless experience.

## Live Website

You can access the live website hosted on Netlify at:  
[Country Explorer](https://your-netlify-url.com)

## Setup Instructions

1. **Clone the Repository:**  
   First, clone the repository from GitHub:

   ```bash
   git clone https://github.com/Tanzeera/Strivelabs-Frontend.git
   ```

2. **Navigate to the Project Folder:**  
   Change to the project directory:

   ```bash
   cd country-explorer
   ```

3. **Open the Project in VS Code:**  
   Open the folder in Visual Studio Code:

   ```bash
   code .
   ```

4. **Run with Live Server:**  
   Make sure the Live Server extension is installed in VS Code.  
   Right-click the `index.html` file in the file explorer and select **Open with Live Server**.  
   The app will open in your default browser.

**Note:** While loading the page for the first time, the API call might fail to fetch countries due to network or caching issues. If no countries are displayed, try the following:

- Refresh the page.
- Perform an **Empty Cache and Hard Reload** in your browser.

## Design Decisions

- **Filters Logic:**  
  Filters for region and language can now be applied simultaneously. Previously, only one filter could be applied at a time. The updated logic allows users to narrow down the search by both region and language for better flexibility.

- **Search and Filter Integration:**  
  The app supports searching by country name and filtering by region or language. The search bar dynamically filters results, showing up to 5 matching countries with a "View All" option to display all results. **Pagination** is now considered when the "View All" option is used for larger search result sets.

- **Favorites Section:**  
  Users can mark up to 5 countries as favorites. These favorites are stored in the browser's `localStorage`, ensuring persistence across sessions. The favorites section dynamically shows up when the first favorite is added and displays prominently on the right side of the screen for easier access.

## Features

- **Search:**
  - Type in the search bar to find countries by name.
  - The search dynamically filters results, showing up to 5 suggestions. The "View All" option will display all matches as cards.
  - Filters (region and language) apply along with search to refine results further.

- **Filters:**
  - Filter countries by region (e.g., Africa, Europe).
  - Filter countries by language (e.g., English, French).
  - Both filters can now be applied simultaneously.

- **Favorites:**
  - Mark up to 5 countries as favorites.
  - Favorites are saved in `localStorage` and persist across sessions.
  - The favorites section dynamically appears when the first favorite is added.
  - The favorites list is displayed on the right side of the screen for easier access.

- **Country Details:**
  - Clicking a country card opens a detailed view with:
    - Flag
    - Capital
    - Population
    - Languages
    - Region
    - Area
  - A "Back" link to return to the list view without losing the original results.

- **Load More:**
  - View 10 countries initially and load 10 more by clicking "Load More".
  - The "Load More" button does not appear after selecting "View All" when there are no more countries to list.

- **Pagination:**
  - Pagination now works even with the "View All" option, ensuring that results beyond 10 are properly handled.

- **Reset Button:**
  - The **Reset Button** was added to allow users to clear the search, filters, and favorites, effectively resetting the app's state. This is particularly useful for users who want to start fresh without manually clearing each setting.

## Testing and Running the App

**Manual Testing:**
- Open the app in a modern browser (Chrome, Firefox, or Safari).
- Verify the following:
  - Search functionality works correctly.
  - Filters apply simultaneously (both region and language).
  - The favorite system works (add/remove up to 5 countries).
  - Clicking on a country card displays detailed information.
  - The "Load More" button loads additional countries.

**Cross-Browser Testing:**
- Test across Chrome, Firefox, and Safari to ensure consistent behavior and UI rendering.
- Check for any discrepancies in layout or functionality.

## Compatibility and Browser Support

- **Supported Browsers:**
  - Chrome
  - Firefox
  - Safari

## Future Improvements

- **Multiple Filters:**  
  Allow users to apply both region and language filters simultaneously (now implemented).

- **Pagination or Infinite Scroll:**  
  Implement pagination or infinite scroll for better performance when dealing with larger datasets (considered with the "Load More" button).

- **Enhanced User Feedback:**  
  Provide more informative messages for the user (e.g., when trying to add more than 5 favorites).

- **Performance Improvements:**  
  Improve performance for users, especially in terms of rendering the lists and dynamic updates.

## Acknowledgments

Country data is sourced from the REST Countries API.

## Summary of Changes Covered:

- **Layout Adjustments:**  
  Made the country list view symmetric with 5 items per row, ensuring a visually balanced presentation.

- **Favorites Section:**  
  Repositioned the favorites list to the right of the page for easier access.

- **Favorites Limit:**  
  Implemented a warning message when attempting to add more than 5 favorites.

- **Country Details Page:**  
  Fixed the issue where country details were opening in a modal on the same route, now opening in a new route (fixing tab issues for a better experience).

- **Load More Fix:**  
  Addressed the issue where "Load More" would add extra countries unexpectedly when returning to the list view.

- **Search and Filters:**  
  Fixed search interaction and added visual cues to identify active filters.

- **Responsiveness:**  
  Addressed mobile responsiveness, fixing horizontal scroll issues caused by the filters.

- **Filters and Search Integration:**  
  Fixed the issue where search results would ignore filters when applied after a search term was entered.
