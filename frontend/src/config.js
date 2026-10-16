// Set REACT_APP_API_URL at build time to point at the deployed backend
export const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://unleashed-shade-parka.glitch.me"
    : "http://localhost:5000");
