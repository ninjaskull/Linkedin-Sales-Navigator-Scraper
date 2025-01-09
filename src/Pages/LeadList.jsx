import { useState } from "react";
import Papa from "papaparse";
const LeadList = () => {
  const [loading, setLoading] = useState(true);
  const [csvData, setCsvData] = useState("");
  const [tableSheetCount, setTableSheetCount] = useState(0);

  const fetchLeadData = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const tableElement = document.querySelector("table");
          if (tableElement) {
            return {
              tableHTML: tableElement.outerHTML, // Return the table as HTML
            };
          }
          return { tableHTML: "No table found" }; // Fallback if no table is present
        },
      });

      const data = response[0].result;
      setLoading(false);

      if (data.tableHTML !== "No table found") {
        convertTableToCsv(data.tableHTML); // Convert to CSV after fetching
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  const convertTableToCsv = async (tableHTML) => {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = tableHTML;

      const table = tempDiv.querySelector("table");
      const headers = Array.from(table.querySelectorAll("thead th"));
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      // Extract headers and find the dynamic index of "Outreach Activity"
      const headerArray = headers.map((header) => header.textContent.trim());

      // Insert "Designation" header after "Name"
      headerArray.splice(1, 0, "Profile URL");
      headerArray.splice(2, 0, "Designation");

      const outreachActivityIndex = headerArray.indexOf("Outreach activity");

      // Extract rows
      const dataArray = rows.map((row) => {
        const cells = Array.from(row.querySelectorAll("td"));

        // Find the name in the first cell
        const nameCell = cells[0]?.querySelector("a span");
        const name = nameCell ? nameCell.textContent.trim() : "Name not found";

        // Extract the profile link
        const profileLinkElement = cells[0]?.querySelector("a");
        const profileLink = profileLinkElement
          ? profileLinkElement.getAttribute("href")
          : "Link not found";

        // Extract the Designation
        const designationCell = cells[0]?.querySelector(
          "div[data-anonymize='job-title']"
        );
        const designation = designationCell
          ? designationCell.textContent.trim()
          : "Designation not found";

        // Find the outreach activity dynamically
        const outreachActivityCell = cells[
          outreachActivityIndex - 2
        ]?.querySelector("button span.lists-table__outreach-activity-text");
        const outreachActivity = outreachActivityCell
          ? outreachActivityCell.textContent.trim()
          : "Outreach Activity Not Found";

        // Map the rest of the row
        const rowData = cells.map((cell, index) => {
          // Replace dynamic columns with extracted data
          if (index === 0) return name;
          if (index === outreachActivityIndex - 2) return outreachActivity;
          return cell.textContent.trim();
        });

        // Insert "Profile URL" and "Designation" columns after the Name
        rowData.splice(1, 0, `https://www.linkedin.com${profileLink}`);
        rowData.splice(2, 0, designation);

        return rowData;
      });

      // Retrieve existing data from storage
      const previousData = await new Promise((resolve) => {
        chrome.storage.local.get(["scrapedData"], (result) => {
          resolve(result.scrapedData || []);
        });
      });

      // Add the header if not already included in the storage
      const isHeaderIncluded =
        previousData.length > 0 &&
        previousData[0].every((header, index) => header === headerArray[index]);

      const combinedData = isHeaderIncluded
        ? [...previousData, ...dataArray]
        : [headerArray, ...previousData, ...dataArray];

      chrome.storage.local.set({ scrapedData: combinedData });

      // Update table sheet count
      setTableSheetCount(combinedData.length - 1);
    } catch (error) {
      console.error("Error converting table to CSV", error);
    }
  };

  const unperseData = async () => {
    // Retrieve all data from storage
    const data = await new Promise((resolve) => {
      chrome.storage.local.get(["scrapedData"], (result) => {
        resolve(result.scrapedData || []);
      });
    });

    if (data.length > 0) {
      const csv = Papa.unparse(data);
      setCsvData(csv);
    } else {
      console.error("No data available to convert to CSV");
    }
  };

  const downloadCsv = () => {
    if (!csvData) {
      console.error("No CSV data available for download");
      return;
    }

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "table_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    clearData();
  };

  const clearData = () => {
    chrome.storage.local.remove("scrapedData", () => {
      setCsvData("");
      setTableSheetCount(0);
      console.log("Scraped data cleared.");
    });
  };

  return (
    <div className="p-2 space-y-3">
      <h1 className="text-medium text-sm flex gap-2 items-center justify-center">
      <span className="h-1 w-1 rounded-full bg-black"></span>
        Scrap data from{" "}
        <a
          href="https://www.linkedin.com/sales/lists/people"
          target="_blank"
          className="text-blue-400 underline font-medium"
        >
          Lead List
        </a>{" "}
      </h1>
      {/* {loading && (
        <p className="my-2 text-sm animate-pulse text-center">Data is Loading...</p>
      )} */}
      <div className="text-center">
        <button
          onClick={fetchLeadData}
          className="py-2 px-4 bg-sky-600 rounded-lg cursor-pointer text-white"
        >
          Scrap This Table
        </button>
        {tableSheetCount > 0 && (
          <button
            onClick={unperseData}
            className="py-2 px-4 bg-sky-600 rounded-lg cursor-pointer text-white mt-3"
          >
            Convert to CSV
          </button>
        )}
        <p className="my-2 text-blue-700">Total Rows: {tableSheetCount}</p>

        {csvData && (
          <div className="flex flex-col gap-2">
            <button
              onClick={downloadCsv}
              className="py-2 px-4 bg-green-600 rounded-lg cursor-pointer text-white"
            >
              Download CSV
            </button>
            <button
              onClick={clearData}
              className="py-2 px-4 bg-red-600 rounded-lg cursor-pointer text-white"
            >
              Clear Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadList;
