
# Country Explorer

**Country Explorer** is a web application that allows users to explore information about countries worldwide. It offers features like keyword search, filtering by region or language, a favorites section, and detailed country views.

### Live Website
You can access the live website hosted on Netlify at:  
[Country Explorer](https://celadon-kheer-9c0b72.netlify.app/)

## Setup Instructions

### Clone the Repository:
First, clone the repository from GitHub:

```bash
git clone https://github.com/Tanzeera/Strivelabs-Frontend.git
```

### Navigate to the Project Folder:
Change to the project directory:

```bash
cd country-explorer
```

### Open the Project in VS Code:
Open the folder in Visual Studio Code:

```bash
code .
```

### Run with Live Server:
Make sure the Live Server extension is installed in VS Code.  
Right-click the `index.html` file in the file explorer and select **Open with Live Server**.  
The app will open in your default browser.

**Note:** While loading the page for the first time, the API call might fail to fetch countries due to network or caching issues. If no countries are displayed, try the following:  
- Refresh the page.  
- Perform an **Empty Cache and Hard Reload** in your browser.

---

## Design Decisions

### Filter Logic:
Filters for region and language are mutually exclusive, meaning only one filter can be applied at a time. This decision was made to avoid conflicting results. However, we are revisiting this logic for future updates to allow multiple filters at once, based on user feedback.

### Search and Filter Integration:
The app supports searching by country name and filtering by region or language. The search bar dynamically filters results, showing up to 5 matching countries with a "View All" option to display all results.

### Favorite System:
Users can mark up to 5 countries as favorites. The favorite countries are stored in the browser's localStorage, so they persist across sessions. The favorite countries are displayed on the right of the page for easier access.

---

## Testing and Running the App

### Manual Testing:
Open the app in a modern browser (Chrome, Firefox, or Safari).  
Verify the following:
- Search functionality works correctly.
- Filters apply independently (i.e., only one filter at a time).
- The favorite system works (add/remove up to 5 countries).
- Clicking on a country card displays detailed information.
- The "Load More" button loads additional countries.

### Cross-Browser Testing:
Test across Chrome, Firefox, and Safari to ensure consistent behavior and UI rendering.  
Check for any discrepancies in layout or functionality.

---

## Compatibility and Browser Support

### Supported Browsers:
- Chrome
- Firefox
- Safari

---

## Features

### Search:
- Type in the search bar to find countries by name.
- The search dynamically filters results, showing up to 5 suggestions. The "View All" option will display all matches as cards.
- Filters apply along with search to refine results further.

### Filters:
- Filter countries by region (e.g., Africa, Europe).
- Filter countries by language (e.g., English, French).
- Only one filter can be applied at a time (for now, but improvements are planned).
- Filtered results are dynamically updated based on the search query.

### Favorites:
- Mark up to 5 countries as favorites.
- The favorites are saved in localStorage and persist across sessions.
- The favorites are now displayed prominently on the right side of the screen for easier access (was previously placed at the bottom).

### Country Details:
Clicking a country card opens a detailed view with:
- Flag
- Capital
- Population
- Languages
- Region
- Area
- A "Back" link to return to the list view without losing the original results.

### Load More:
- View 10 countries initially and load 10 more by clicking "Load More".
- Issue fixed where the "Load More" button would incorrectly appear on the Details page, and the list now resets when returning from the Details view.

---

## Future Improvements
- **Multiple Filters**: Allow users to apply both region and language filters simultaneously.
- **Pagination or Infinite Scroll**: Implement pagination or infinite scroll for better performance when dealing with larger datasets.
- **Enhanced User Feedback**: Provide more informative messages for the user (e.g., when trying to add more than 5 favorites).
- **Performance Improvements**: Improve performance for users, especially in terms of rendering the lists and dynamic updates.

---

## Acknowledgments
Country data is sourced from the [REST Countries API](https://restcountries.com/).

--- 

### Summary of Changes Covered:
- **Layout Adjustments**: Made the country list view symmetric with 5 items per row, ensuring a visually balanced presentation.
- **Favorites Section**: Repositioned the favorites list to the right of the page for easier access.
- **Favorites Limit**: Implemented a warning message when attempting to add more than 5 favorites.
- **Country Details Page**: Fixed the issue where country details were opening in a modal on the same route, now opening in a new route.
- **Load More Fix**: Addressed the issue where "Load More" would add extra countries unexpectedly when returning to the list view.
- **Search and Filters**: Fixed search interaction and added visual cues to identify active filters.

--- 
