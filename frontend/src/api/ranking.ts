import axios from "axios";

export async function getRanking() {
  const token = localStorage.getItem("auth_token");
  const res = await axios.get("/api/rankings", {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data;
}
