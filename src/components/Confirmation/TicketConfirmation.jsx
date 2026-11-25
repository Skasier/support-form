import "./TicketConfirmation.css";

const SUPPORT_PHONE = "0777777777";

// Props: ticket (object), onNavigate(tabIndex)
export default function TicketConfirmation({ ticket, onNavigate }) {
  // Each row of the details table. Adding a row = adding one line here.
  const rows = [
    ["Ticket", `#${ticket.id}`],
    ["Subject", ticket.subject],
    ["Category", ticket.category],
    ["Submitted by", ticket.submittedBy],
    ["Status", ticket.status],
  ];

  return (
    <section className="panel">
      <h1>Ticket submitted</h1>
      <p className="hint">Thanks, we have your request.</p>

      <div className="confirm-card">
        <div className="confirm-head">
          <span className="tick" aria-hidden="true">✓</span>
          <div>
            <h2>Your ticket has been sent</h2>
            <p>Our team will reply in the Support Centre.</p>
          </div>
          <p className="confirm-note">A confirmation has been sent to your email.</p>
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
          <span>Average first reply: under 30 minutes.</span>
          <span className="urgent">If it's urgent call us on {SUPPORT_PHONE}</span>
        </div>

        <div className="actions">
          <button type="button" className="btn btn--outline" onClick={() => onNavigate(1)}>
            View my tickets
          </button>
          <button type="button" className="btn btn--primary" onClick={() => onNavigate(1)}>
            Go to Manage tickets
          </button>
        </div>
      </div>
    </section>
  );
}