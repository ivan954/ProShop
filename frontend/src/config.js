export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://unleashed-shade-parka.glitch.me" // Make sure this exactly matches your Glitch URL
    : "http://localhost:5000";
