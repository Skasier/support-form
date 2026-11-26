import { Routes, Route } from "react-router-dom";
import TabBar from "./components/TabBar/TabBar";
import SupportForm from "./components/Form/SupportForm";
import TicketConfirmation from "./components/Confirmation/TicketConfirmation";
import "./SupportRequest.css";

// The main support request app, with a tab bar and routes for each section.
const TABS = [
  { label: "Make a support request", path: "/" },
  { label: "Manage Tickets", path: "/tickets" },
  { label: "Help Articles", path: "/articles" },
  { label: "Support Bot", path: "/bot" },
];

function Placeholder({ title }) {
  return (
    <section className="panel">
      <h1>{title}</h1>
      <p className="hint">This section isn't built yet.</p>
    </section>
  );
}

export default function SupportRequest() {
  const openTickets = 2;

  return (
    <div className="support-app">
      <TabBar tabs={TABS} ticketCount={openTickets} />
      <Routes>
        <Route path="/" element={<SupportForm />} />
        <Route path="/submitted" element={<TicketConfirmation />} />
        <Route
          path="/tickets"
          element={<Placeholder title="Manage Tickets" />}
        />
        <Route
          path="/articles"
          element={<Placeholder title="Help Articles" />}
        />
        <Route path="/bot" element={<Placeholder title="Support Bot" />} />
      </Routes>
    </div>
  );
}
