import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://unleashed-shade-parka.glitch.me"
      : "http://localhost:5000",
});

export default instance;
