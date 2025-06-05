import axios from "axios";

export const getToken = (type) =>
  type == "user"
    ? `Bearer ${localStorage.getItem("token")}`
    : type == "admin"
    ? `Bearer ${localStorage.getItem("admin")}`
    : "";

export const npcAPI = axios.create({
  baseURL: "https://citib.vercel.app/api/users",
  headers: {
    site: "npc",
  },
});

export const adminAPI = axios.create({
  baseURL: "https://citib.vercel.app/api/admin",
  headers: {
    site: "npc",
  },
});
