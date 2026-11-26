import { NavLink } from "react-router-dom";
import "./TabBar.css";

// navigation tabs for the support request sections
export default function TabBar({ tabs, ticketCount }) {
  return (
    <nav className="tabs" aria-label="Support sections">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/"} 
          className={({ isActive }) => `tab ${isActive ? "tab--active" : ""}`}
        >
          {tab.label}
          {tab.label === "Manage Tickets" && <span className="badge">{ticketCount}</span>}
        </NavLink>
      ))}
    </nav>
  );
}