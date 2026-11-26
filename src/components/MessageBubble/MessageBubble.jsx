import "./MessageBubble.css";


export default function MessageBubble({ message }) {
  const mine = message.from === "user";

  return (
    <div className={`bubble-row ${mine ? "bubble-row--mine" : ""}`}>
      <div className={`bubble ${mine ? "bubble--mine" : "bubble--support"}`}>
        <p className="bubble-meta">
          {mine ? "You" : `Support · ${message.author}`} · {message.time}
          {message.note && ` · ${message.note}`}
          {mine && message.seen && " · Seen"}
        </p>
        <p className="bubble-text">{message.text}</p>
      </div>
    </div>
  );
}
