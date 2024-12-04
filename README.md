## Country Explorer

Country Explorer is a web application that allows users to explore information about countries worldwide. It offers features like keyword search, filtering by region or language, a favorites section, and detailed country views.

Setup Instructions
Clone the Repository:
First, clone the repository from GitHub:

git clone https://github.com/Tanzeera/Strivelabs-Frontend.git  
Navigate to the Project Folder:
Change to the project directory:

cd country-explorer  
Open the Project in VS Code:
Open the folder in Visual Studio Code:
code .  

Run with Live Server:
Make sure the Live Server extension is installed in VS Code.
Right-click the index.html file in the file explorer and select Open with Live Server.
The app will open in your default browser.

Note: While loading the page for the first time, the API call might fail to fetch countries due to network or caching issues. If no countries are displayed, try the following:
Refresh the page.
Perform an Empty Cache and Hard Reload in your browser.


Design Decisions
Filter Logic:
Filters for region and language are mutually exclusive, meaning only one filter can be applied at a time. This decision was made to avoid conflicting results.
The language filter works based on language codes (e.g., "en" for English, "fr" for French). It checks whether the selected language exists in a country's language object, which may contain multiple languages.
Search and Filter Integration:
The app supports searching by country name and filtering by region/language.
The search works in tandem with filters to refine the results. The logic ensures filters do not conflict with the search query, allowing users to easily narrow down results.
Favorite System:
Users can mark up to 5 countries as favorites.
The favorite countries are stored in the browser's localStorage so they persist across sessions.
This lightweight approach avoids server-side storage, keeping the application simple and fast.
Responsive Design:
The layout is designed to be responsive across different screen sizes, ensuring usability on desktops, tablets, and mobile devices.
Testing and Running the App
Manual Testing:
Open the app in a modern browser (Chrome, Firefox, or Safari).
Verify the following:
Search functionality works correctly.
Filters apply independently (i.e., only one filter at a time).
The favorite system works (add/remove up to 5 countries).
Clicking on a country card displays detailed information.
The "Load More" button loads additional countries.
Cross-Browser Testing:
Test across Chrome, Firefox, and Safari to ensure consistent behavior and UI rendering. Check for any discrepancies in layout or functionality, especially on mobile and tablet devices.

Compatibility and Browser Support
Supported Browsers:
Chrome
Firefox
Safari

Mobile and Tablet Responsiveness:
The application is fully responsive, with layouts optimized for devices ranging from small mobile screens to large desktop displays.
It uses flexbox and CSS Grid for layout, ensuring fluidity across screen sizes.

Known Issues:
Older versions of Internet Explorer may not fully support CSS features like flexbox. It is recommended to use modern browsers for the best experience.
Occasionally, the API call might fail on the first load. Refresh the page or clear the browser cache to resolve this.

Features
Search:
Type in the search bar to find countries by name.
Works in tandem with filters to narrow down results.

Filters:
Filter countries by region (e.g., Africa, Europe).
Filter countries by language (e.g., English, French).
Only one filter can be applied at a time.

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
View 10 countries initially and load 10 more by clicking "Load More".


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
