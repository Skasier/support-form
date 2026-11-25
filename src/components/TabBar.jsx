// Props: tabs (array of labels), activeIndex, onChange(index), ticketCount
export default function TabBar({ tabs, activeIndex, onChange, ticketCount }) {
  return (
    <nav className="tabs" aria-label="Support sections">
      {tabs.map((label, i) => (
        <button
          key={label}
          type="button"
          className={`tab ${activeIndex === i ? "tab--active" : ""}`}
          onClick={() => onChange(i)}
        >
          {label}
          {label === "Manage Tickets" && <span className="badge">{ticketCount}</span>}
        </button>
      ))}
    </nav>
  );
}