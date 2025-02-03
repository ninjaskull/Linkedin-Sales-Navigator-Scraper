import { TiUserAdd, TiContacts } from "react-icons/ti";
import { useState } from "react";
import LeadList from "./Pages/LeadList";
import AccountList from "./Pages/AccountList";

function App() {
  const [pageView, setPageView] = useState("Lead List");

  return (
    <div className="min-h-[20rem] min-w-[15rem] bg-blue-100">
      <section className="flex items-center">
        <button
          onClick={() => setPageView("Lead List")}
          className={`flex items-center gap-2 w-full py-2 px-4 hover:bg-[#014180] duration-300 ${
            pageView == "Lead List"
              ? "bg-[#014180] text-white"
              : "bg-[#015a80] text-[#98b2c8]"
          }`}
        >
          <TiContacts size={20} />
          <p className={`font-semibold tracking-wider`}>Lead List</p>
        </button>
        <button
          onClick={() => setPageView("Account List")}
          className={`flex items-center gap-2 w-full py-2 px-4 hover:bg-[#014180] duration-300 ${
            pageView == "Account List"
              ? "bg-[#014180] text-white"
              : "bg-[#015a80] text-[#98b2c8]"
          }`}
        >
          <TiUserAdd size={20} />
          <p className={`font-semibold tracking-wider`}>Accounts</p>
        </button>
      </section>

      <section className="mt-4">
        {pageView === "Lead List" ? (
          <LeadList />
        ) : pageView === "Account List" ? (
          <AccountList />
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
