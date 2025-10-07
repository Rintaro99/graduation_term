import axios from "axios";

export async function getRanking() {
  const token = localStorage.getItem("auth_token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const res = await axios.get(`${API_BASE}/api/rankings`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data;
}
