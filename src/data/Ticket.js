// Fake data. A real app would load this from an API.

// Helper: a date "days" ago at a given time, so the sample data never goes out of date
const ago = (days, hours, minutes) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
};

// "2026-11-17T09:12:00Z" -> "17 Nov, 09:12"
export function formatDate(iso) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const STATUSES = ["Waiting for you", "In progress", "Resolved"];

export const initialTickets = [
  {
    id: 1042,
    title: "Receipt printer offline",
    category: "Printer",
    status: "Waiting for you",
    unread: true,
    createdAt: ago(9, 9, 12),
    updatedAt: ago(9, 10, 5),
    agents: ["SK", "MT"],
    messages: [
      { id: 1, from: "user", time: "09:12", text: "Since this morning the kitchen printer does not print receipts. It shows as connected in Settings but nothing comes out. Restarting the till did not help." },
      { id: 2, from: "support", author: "SK", time: "09:31", text: "Thanks Joe. Is the printer's light green or orange?" },
      { id: 3, from: "user", time: "09:40", text: "It's orange.", seen: true },
      { id: 4, from: "support", author: "MT", time: "10:05", note: "Needs your reply", text: "Could you send a photo of the printer's back panel, showing which cable is plugged into the network port?" },
      { id: 5, from: "user", time: "10:12", text: "I'll take a photo now." },
    ],
  },
  {
    id: 1039,
    title: "Card machine declines",
    category: "Payments",
    status: "In progress",
    unread: true,
    createdAt: ago(10, 18, 40),
    updatedAt: ago(9, 8, 51),
    agents: ["SK"],
    messages: [
      { id: 1, from: "user", time: "18:40", text: "The card machine declines every contactless payment." },
      { id: 2, from: "support", author: "SK", time: "08:51", text: "We're checking your terminal settings now." },
    ],
  },
  {
    id: 1031,
    title: "Menu prices not updating",
    category: "Menu",
    status: "In progress",
    unread: false,
    createdAt: ago(11, 14, 2),
    updatedAt: ago(11, 14, 2),
    agents: [],
    messages: [
      { id: 1, from: "user", time: "14:02", text: "I changed the prices but the till still shows the old ones." },
    ],
  },
  {
    id: 1027,
    title: "Driver app login",
    category: "Deliveries",
    status: "Resolved",
    unread: false,
    createdAt: ago(14, 11, 30),
    updatedAt: ago(12, 16, 20),
    agents: ["MT"],
    messages: [
      { id: 1, from: "user", time: "11:30", text: "Our drivers can't log in to the app." },
      { id: 2, from: "support", author: "MT", time: "12:10", text: "We've reset the accounts. Try the new temporary passwords." },
      { id: 3, from: "user", time: "16:20", text: "That worked, thanks!" },
    ],
  },
];