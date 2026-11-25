import { useState } from "react";
import TabBar from "./components/TabBar";
import SupportForm from "./components/SupportForm";
import "./SupportRequest.css";

const TABS = ["Make a support request", "Manage Tickets", "Help Articles", "Support Bot"];

export default function SupportRequest() {
  const [activeTab, setActiveTab] = useState(0);
  const openTickets = 2;

  return (
    <div className="support-app">
      <TabBar
        tabs={TABS}
        activeIndex={activeTab}
        onChange={setActiveTab}
        ticketCount={openTickets}
      />

      {activeTab === 0 ? (
        <SupportForm />
      ) : (
        <section className="panel">
          <h1>{TABS[activeTab]}</h1>
          <p className="hint">This section isn't built yet.</p>
        </section>
      )}
    </div>
  );
}