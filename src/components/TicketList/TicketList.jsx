import { useState } from "react";
import StatCard from "../StatsCard/StatsCard";
import TicketFilters from "../TicketFilters/TicketFilters";
import TicketTable from "../TicketTable/TicketTable";
import "./TicketList.css";

// Props: tickets (the full list from SupportRequest)
export default function TicketList({ tickets }) {
  const [filters, setFilters] = useState({ search: "", status: "all", date: "30" });

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  // The numbers in the cards are worked out from the data
  const resolved = tickets.filter((t) => t.status === "Resolved").length;
  const awaiting = tickets.filter((t) => t.status === "Waiting for you").length;
  const active = tickets.length - resolved;

  // Apply the filters, then sort newest first
  const text = filters.search.trim().toLowerCase().replace("#", "");
  const cutoff = Date.now() - Number(filters.date) * 24 * 60 * 60 * 1000;

  const visible = tickets
    .filter((t) => {
      const matchesSearch = !text || String(t.id).includes(text) || t.title.toLowerCase().includes(text);
      const matchesStatus = filters.status === "all" || t.status === filters.status;
      const matchesDate = filters.date === "all" || new Date(t.updatedAt) >= cutoff;
      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <section className="panel">
      <h1>Your tickets</h1>

      <div className="stats">
        <StatCard value={resolved} label="Resolved" />
        <StatCard value={awaiting} label="Awaiting your reply" />
        <StatCard value={active} label="Active tickets" />
      </div>

      <TicketFilters filters={filters} onChange={handleFilterChange} />
      <TicketTable tickets={visible} />

      <p className="hint list-note">
        A red dot means support has replied since you last opened the ticket.
      </p>
    </section>
  );
}