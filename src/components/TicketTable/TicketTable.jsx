import { Link } from "react-router-dom";
import StatusPill from "../StatusPill/StatusPill";
import { formatDate } from "../../data/Ticket";
import "./TicketTable.css";

// Props: tickets (array, already filtered and sorted)
export default function TicketTable({ tickets }) {
  if (tickets.length === 0) {
    return <p className="hint">No tickets match your filters.</p>;
  }

  return (
    <>
      <p className="table-count">
        {tickets.length} {tickets.length === 1 ? "ticket" : "tickets"} · Newest first
      </p>

      <div className="table-wrap">
        <table className="tickets">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Messages</th>
              <th>Created</th>
              <th>Last updated</th>
              <th><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className={t.unread ? "unread" : ""}>
                <td>
                  <span className={`dot ${t.unread ? "" : "dot--hidden"}`} />
                  #{t.id}
                </td>
                <td className="title">{t.title}</td>
                <td>{t.category}</td>
                <td><StatusPill status={t.status} /></td>
                <td>{t.messages.length}</td>
                <td>{formatDate(t.createdAt)}</td>
                <td>{formatDate(t.updatedAt)}</td>
                <td>
                  <Link to={`/tickets/${t.id}`} className="btn btn--primary btn--small">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
