import axios from "axios";

export async function getRanking() {
  const token = localStorage.getItem("auth_token");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log("🌐 API_BASE:", API_BASE);
  console.log("🪶 token:", token);
  // const res = await axios.get(`${API_BASE}/api/rankings`, {
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : "",
  //   },
  // });
  // console.log("🏁 ランキングAPIレスポンス:", res.data);
  // return res.data;
  try {
    const res = await axios.get(`${API_BASE}/api/rankings`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("🏁 ランキングAPIレスポンス:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ ランキングAPIエラー:", err);
  }
}
