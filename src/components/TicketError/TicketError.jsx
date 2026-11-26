import { useLocation, useNavigate, Navigate } from "react-router-dom";
import "./TicketError.css";

const SUPPORT_PHONE = "0777777777";

export default function TicketError() {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state?.ticket;

  if (!ticket) return <Navigate to="/" replace />;

  const rows = [
    ["Ticket", `#${ticket.id}`],
    ["Subject", ticket.subject],
    ["Category", ticket.category],
    ["Submitted by", ticket.submittedBy],
    ["Status", ticket.status],
  ];

  return (
    <section className="panel">
      <h1>Ticket not submitted</h1>
      <p className="hint">Something went wrong. Your details are saved.</p>

      <div className="confirm-card">
        <div className="confirm-head">
          <span className="tick" aria-hidden="true">
            X
          </span>
          <div>
            <h2>We couldn't submit your ticket</h2>
            <p>Nothing was sent. Your draft has not been submitted.</p>
          </div>
        </div>

        <dl className="details">
          {rows.map(([label, value]) => (
            <div className="details-row" key={label}>
              <dt>{label}</dt>
              <dd className={label === "Status" ? "status" : ""}>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="info-bar">
          <span>Check your connection and try again. If it keeps failing, call supoport on {SUPPORT_PHONE}</span>
          {/* <span className="urgent">
            If it's urgent call us on {SUPPORT_PHONE}
          </span> */}
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => navigate("/tickets")}
          >
            View my tickets
          </button>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => navigate("/tickets")}
          >
            Go to Manage tickets
          </button>
        </div>
      </div>
    </section>
  );
}
