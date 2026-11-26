import FormField from "../FormFild/FormField"; // reused from the support form
import { STATUSES } from "../../data/Ticket";
import "./TicketFilters.css";

// Props: filters ({ search, status, date }), onChange(name, value)
export default function TicketFilters({ filters, onChange }) {
  function handle(e) {
    onChange(e.target.name, e.target.value);
  }

  return (
    <div className="filters">
      <FormField id="search" label="Search tickets">
        <input id="search" name="search" placeholder="Search by ID or subject"
          value={filters.search} onChange={handle} />
      </FormField>

      <FormField id="status" label="Status">
        <select id="status" name="status" value={filters.status} onChange={handle}>
          <option value="all">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </FormField>

      <FormField id="date" label="Date">
        <select id="date" name="date" value={filters.date} onChange={handle}>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="all">All time</option>
        </select>
      </FormField>
    </div>
  );
}
