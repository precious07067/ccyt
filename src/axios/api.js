import axios from "axios";

export const getToken = (type) =>
  type == "user"
    ? `Bearer ${localStorage.getItem("token")}`
    : type == "admin"
    ? `Bearer ${localStorage.getItem("admin")}`
    : "";

export const npcAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/users`,
  headers: {
    site: "npc",
  },
});

export const adminAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`,
  headers: {
    site: "npc",
  },
});
