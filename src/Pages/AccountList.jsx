import { useEffect } from "react";

const AccountList = () => {
  //   const [loading, setLoading] = useState(true);
  //   const [csvData, setCsvData] = useState("");
  //   const [tableSheetCount, setTableSheetCount] = useState(0);

  const fetchListData = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      const response = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          // Select all list items
          const listItems = document.querySelectorAll(
            ".artdeco-list .artdeco-list__item"
          );
          console.log(listItems);
          const extractedData = Array.from(listItems).map((item) => {
            // Extract data from the list item
            const nameElement = item.querySelector(
              ".artdeco-entity-lockup__title a"
            );
            const name = nameElement ? nameElement.textContent.trim() : "N/A";

            const profileLink = nameElement
              ? `https://www.linkedin.com${nameElement.getAttribute("href")}`
              : "N/A";

            const industryElement = item.querySelector(
              ".artdeco-entity-lockup__subtitle span[data-anonymize='industry']"
            );
            const industry = industryElement
              ? industryElement.textContent.trim()
              : "N/A";

            const employeesElement = item.querySelector(
              "a.li-i18n-linkto._view-all-employees_1derdc"
            );
            const employees = employeesElement
              ? employeesElement.textContent.trim()
              : "N/A";

            const aboutElement = item.querySelector(
              "dd.t-12.t-black--light.mb3 div span:nth-child(2)"
            );
            const about = aboutElement
              ? aboutElement.textContent.trim().replace("…see more", "").trim()
              : "N/A";

            return {
              Name: name,
              ProfileURL: profileLink,
              Industry: industry,
              Employees: employees,
              About: about,
            };
          });

          return extractedData;
        },
      });

      const data = response[0].result;
      console.log("Scraped Data:", data);

      // Save data in storage
      chrome.storage.local.set({ scrapedListData: data });

      return data;
    } catch (error) {
      console.error("Error scraping list data", error);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return <div>This is account list</div>;
};
export default AccountList;
