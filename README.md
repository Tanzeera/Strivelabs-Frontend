## Country Explorer
Country Explorer is a web application that allows users to explore information about countries worldwide. It offers features like keyword search, filtering by region or language, a favorites section, and detailed country views.

Setup Instructions
Clone the Repository:

First, clone the repository from GitHub:
bash
Copy code
git clone https://github.com/Tanzeera/Strivelabs-Frontend.git
Navigate to Project Folder:

Change to the project directory:
bash
Copy code
cd country-explorer
Open the HTML File:

Open the index.html file in your preferred browser (Chrome, Firefox, Safari, etc.) to run the application.
No server setup is required as this is a static web application.

Design Decisions
Filter Logic:

Filters for region and language are mutually exclusive, meaning only one filter can be applied at a time. This decision was made to avoid conflicting results.
The language filter works based on language codes (e.g., "en" for English, "fr" for French). The filter checks whether the selected language exists in a country's language object, which may contain multiple languages.
Search and Filter Integration:

The app supports searching by country name and filtering by region/language. The search works in tandem with filters to refine the results.
The logic ensures that the filters do not conflict with the search query, allowing users to easily narrow down results.
Favorite System:

Users can mark up to 5 countries as favorites. The favorite countries are stored in the browser's localStorage so they persist across sessions. This approach avoids any server-side storage, keeping the application lightweight.
Responsive Design:

The layout is designed to be responsive across different screen sizes. The app adjusts for desktop, tablet, and mobile views to ensure a seamless user experience.
Testing and Running the App
To test and ensure everything works as expected:

Manual Testing:

Open the app in a modern browser (Chrome, Firefox, or Safari).
Verify the following:
Search functionality works correctly.
Filters apply independently (i.e., only one filter at a time).
The favorite system works (can add/remove up to 5 countries).
Clicking on a country card correctly displays detailed information.
The "Load More" button loads additional countries.
Cross-Browser Testing:

Test across Chrome, Firefox, and Safari to ensure consistent behavior and UI rendering.
Check for any discrepancies in how each browser handles layout, especially on mobile and tablet devices.
Compatibility and Browser Support
Supported Browsers:

The app is tested and works across major browsers:
Chrome
Firefox
Safari
Mobile and Tablet Responsiveness:

The application is fully responsive, with optimized layouts for devices ranging from small mobile screens to large desktop displays.
It uses flexbox and CSS Grid for layout, making it fluid across screen sizes.
Exceptions:

There are no major exceptions in terms of browser compatibility. However, older versions of Internet Explorer might not support some CSS properties (such as flexbox), so it's recommended to use modern browsers for the best experience.
Features
Search:

Type in the search bar to find countries by name.
The search query works in tandem with filters.
Filters:

Filter countries by region (e.g., Africa, Europe).
Filter countries by language (e.g., English, French).
Only one filter can be applied at a time. Filters work together with the search.
Favorites:

Mark up to 5 countries as favorites.
Favorites are saved in localStorage and persist across sessions.
Country Details:

Clicking a country card opens a detailed view with:
Flag
Capital
Population
Languages
Region
Area
Load More:

View 10 countries initially and load 10 more upon clicking "Load More".
Technologies Used
HTML5 and CSS3: For layout, styling, and responsiveness.
JavaScript (ES6): For dynamic functionality such as search, filters, and favorites.
LocalStorage: For saving user preferences (favorites) between sessions.
Flexbox and CSS Grid: For responsive layout.
Known Limitations
Filter Limitation:
The region and language filters are mutually exclusive. Selecting one filter clears the other.
Favorites Limit:
The favorites system is capped at 5 countries.
Future Improvements
Allow users to select multiple filters (e.g., region + language).
Implement pagination or infinite scroll for better performance with large data sets.
Add advanced error handling and loading states.
Optimize the app for even better mobile performance.
Acknowledgments
Country data is sourced from the REST Countries API.
