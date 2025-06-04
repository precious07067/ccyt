import axios from "axios";

export const getToken = (type) =>
  type == "user"
    ? `Bearer ${localStorage.getItem("token")}`
    : type == "admin"
    ? `Bearer ${localStorage.getItem("admin")}`
    : "";

export const npcAPI = axios.create({
  baseURL: "https://pcb2-lvlf.onrender.com/api/users",
  // baseURL: "https://pncb.onrender.com/api/users/",
  headers: {
    site: "npc",
  },
  // baseURL: "http://localhost:5000/api/users/",
});

export const adminAPI = axios.create({
  baseURL: "https://pcb2-lvlf.onrender.com/api/admin",
  // baseURL: "https://pncb.onrender.com/api/admin/",
  headers: {
    site: "npc",
  },
  // baseURL: "http://localhost:5000/api/admin/",
});
