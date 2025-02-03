# Linkedin Sales Navigator Data Scraper Chrome Extension

This project is a Chrome extension designed to scrape data from LinkedIn's Sales Navigator. It extracts relevant information such as names, profile URLs, industries, employee counts, and more, and allows users to download the data in CSV format. The extension is built using React and leverages Chrome's scripting and storage APIs for data extraction and management.

## Features

- **Scrape Account Data**: Extract detailed information from LinkedIn's Sales Navigator Account pages, including names, profile URLs, industries, employee counts, and more.
- **Scrape Lead List Data**: Extract data from LinkedIn's Sales Navigator Lead List pages, including names, profile URLs, designations, and outreach activities.
- **CSV Export**: Convert scraped data into CSV format for easy analysis and storage.
- **Chrome Storage Integration**: Save scraped data locally within the Chrome browser for later retrieval.
- **User-Friendly Interface**: Simple and intuitive UI for easy navigation and operation.

## Quick Start and Use

<h3>1. Download the project as .zip</h3>
   <img width="500" height="250" alt="likedin data scrapper extension" src="./public/images/download_linkedin_scrapper_zip.png" />

<h3>2. unzip the projec folder</h3>
<h3>3. Load the Extension in Chrome</h3>

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `dist` directory from the project.
   <br /> <br />
   <img width="480" height="300" alt="load likedin data scrapper extension" src="./public/images/upload_extension.png" />
   <img width="400" height="250" alt="likedin data scrapper extension" src="./public/images/linkedin_sales_navigator_adon.png" />
   <img width="450" height="220" alt="likedin sales navigator data scrapper extension" src="./public/images/linkedin_sales_navigator_scrapper.png" />

## Installation Guide

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/qtecsolution/Linkedin-Sales-Navigator-Scraper.git
   cd Linkedin-Sales-Navigator

   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Build the Extension**:

   ```bash
   npm run build
   ```

## Load the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right corner.
3. Click **Load unpacked** and select the `dist` directory from the project.

## Usage

1. **Navigate to LinkedIn**:

   - Open LinkedIn Sales Navigator and navigate to either the **Account** or **Lead List** page you wish to scrape.

    <img width="450" height="220" alt="likedin data scrapper extension" src="./public/images/linkedin_scrapper_using_extension.png" />

2. **Scrape Data**:

   - Click on the extension icon in the Chrome toolbar.
   - Select either **Scrap This Table** for Account data or **Scrap This Table** for Lead List data.
   - Ensure you scroll to the bottom of the page to load all data before scraping.

3. **Download CSV**:

   - After scraping, click **Download CSV** to save the data to your computer.

4. **Clear Data**:

   - Use the **Clear Data** button to remove all scraped data from the extension's storage.

## Contribute

This is an open source project and contributions are welcome. If you are interested in contributing, please follow this steps:

1. **Fork the Repository**:

   - Fork the project on GitHub.

2. **Create a Branch**:

   - Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b feature/your-feature-name

   ```

3. **Submit a Pull Request**:

   - Open a pull request from your branch to the main repository. Provide a detailed description of your changes.

   <b>Our Team will review and merge your request</b>
