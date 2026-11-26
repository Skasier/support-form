import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TabBar from "./components/TabBar/TabBar";
import SupportForm from "./components/Form/SupportForm";
import TicketConfirmation from "./components/Confirmation/TicketConfirmation";
import TicketList from "./components/TicketList/TicketList";
import TicketDetail from "./components/TicketDetail/TicketDetail";
import { initialTickets } from "./data/Ticket";
import "./SupportRequest.css";

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
  // The tickets live here so every page sees the same list
  const [tickets, setTickets] = useState(initialTickets);

  // Change some fields of one ticket
  function updateTicket(id, changes) {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  }

  // Called by the support form. Returns the new ticket.
  function addTicket({ title, category, description }) {
    const now = new Date().toISOString();
    const ticket = {
      id: Math.max(...tickets.map((t) => t.id)) + 1, // a real server would assign this
      title,
      category,
      status: "In progress",
      unread: false,
      createdAt: now,
      updatedAt: now,
      agents: [],
      messages: [
        {
          id: 1,
          from: "user",
          time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          text: description,
        },
      ],
    };
    setTickets((prev) => [...prev, ticket]);
    return ticket;
  }

  // The badge counts tickets with an unread reply
  const unreadCount = tickets.filter((t) => t.unread).length;

  return (
    <div className="support-app">
      <TabBar tabs={TABS} ticketCount={unreadCount} />

      <Routes>
        <Route path="/" element={<SupportForm onAddTicket={addTicket} />} />
        <Route path="/submitted" element={<TicketConfirmation />} />
        <Route path="/tickets" element={<TicketList tickets={tickets} />} />
        <Route path="/tickets/:id" element={<TicketDetail tickets={tickets} onUpdate={updateTicket} />} />
        <Route path="/articles" element={<Placeholder title="Help Articles" />} />
        <Route path="/bot" element={<Placeholder title="Support Bot" />} />
      </Routes>
    </div>
  );
}