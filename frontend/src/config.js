export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-app-name.adaptable.app"
    : "http://localhost:5000";
