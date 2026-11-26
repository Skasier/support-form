import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import StatusPill from "../StatusPill/StatusPill";
import MessageBubble from "../MessageBubble/MessageBubble";
import { formatDate } from "../../data/Ticket";
import "./TicketDetail.css";

// Props: tickets (full list), onUpdate(id, changes)
export default function TicketDetail({ tickets, onUpdate }) {
  const { id } = useParams(); // the :id from the URL /tickets/:id
  const navigate = useNavigate();
  const ticket = tickets.find((t) => t.id === Number(id));

  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  // Opening a ticket marks it as read (removes the red dot)
  useEffect(() => {
    if (ticket?.unread) onUpdate(ticket.id, { unread: false });
  }, [ticket, onUpdate]);

  // Scroll to the newest message whenever one is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages.length]);

  if (!ticket) {
    return (
      <section className="panel">
        <h1>Ticket not found</h1>
        <p className="hint"><Link to="/tickets">Back to your tickets</Link></p>
      </section>
    );
  }

  const resolved = ticket.status === "Resolved";

  function handleSend(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const message = {
      id: Date.now(),
      from: "user",
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(),
    };

    onUpdate(ticket.id, {
      messages: [...ticket.messages, message],
      updatedAt: new Date().toISOString(),
      // once you've replied you're no longer the one being waited on
      status: ticket.status === "Waiting for you" ? "In progress" : ticket.status,
    });
    setText("");
  }

  function handleResolve() {
    onUpdate(ticket.id, { status: "Resolved", updatedAt: new Date().toISOString() });
  }

  return (
    <section className="panel">
      <div className="detail-head">
        <button type="button" className="back" aria-label="Back to tickets" onClick={() => navigate("/tickets")}>
          ←
        </button>
        <h1>#{ticket.id} · {ticket.title}</h1>
        <StatusPill status={ticket.status} />
        {!resolved && (
          <button type="button" className="btn btn--success" onClick={handleResolve}>
            ✓ Mark as resolved
          </button>
        )}
      </div>

      <div className="meta">
        <span className="chip">{ticket.category}</span>
        <span className="chip">Created {formatDate(ticket.createdAt)}</span>
        <span className="chip">Updated {formatDate(ticket.updatedAt)}</span>
        {ticket.agents.map((initials, i) => (
          <span key={initials} className={`avatar avatar--${i % 2}`}>{initials}</span>
        ))}
      </div>

      <div className="chat">
        <p className="system-note">Ticket created on the website · {formatDate(ticket.createdAt)}</p>
        {ticket.messages.map((m) => <MessageBubble key={m.id} message={m} />)}
        <div ref={bottomRef} />
      </div>

      <form className="composer" onSubmit={handleSend}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={resolved ? "This ticket is resolved" : "Write the message..."}
          aria-label="Message"
          disabled={resolved}
        />
        {/* Not wired up yet: a good exercise is to reuse FileDropzone's logic here */}
        <button type="button" className="icon-btn" aria-label="Attach a file" disabled={resolved}>↑</button>
        <button type="submit" className="btn btn--primary" disabled={resolved}>Send</button>
      </form>
    </section>
  );
}
