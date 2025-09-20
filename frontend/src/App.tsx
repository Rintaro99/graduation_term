import './App.css'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import LogoutButton from "./components/LogoutButton";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import type { User } from "./types/User";

console.log("✅ Runtime ENV TEST:", import.meta.env);


export default function App() {
  console.log("🌍 ENV TEST:", import.meta.env.VITE_API_BASE_URL);
  (window as any).__DEBUG_API_BASE_URL__ = import.meta.env.VITE_API_BASE_URL;
  console.log("DEBUG Dropdown:", Dropdown);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth_token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log("🌍 Runtime ENV VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
    (window as any).__DEBUG_API_BASE_URL__ = import.meta.env.VITE_API_BASE_URL;
    if (!isLoggedIn) return;

    const token = localStorage.getItem("auth_token");
    if (!token) return;

    const baseURL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseURL}/api/mypage`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser)
      .catch(console.error);
    }, [isLoggedIn]);

  return (
    <div className="py-5 px-4">
      <header className="flex justify-between items-center ">
        <Link to="/">
          <img src="/top_page_logo.jpg" alt="トップページへ" className='w-10 sm:w-15'/>
        </Link>

        {isLoggedIn && (
          <div style={{ position: "relative" }}>
            {/* ハンバーガーボタン */}
            {/* <button
              onClick={() => setMenuOpen(!menuOpen)}
              className='w-8 h-7 flex flex-col justify-around bg-transparent border-0 cursor-pointer'
            >
              <span className='w-8 bg-white h-0.5'></span>
              <span className='w-8 bg-white h-0.5'></span>
              <span className='w-8 bg-white h-0.5'></span>
            </button> */}

            <Dropdown
              dismissOnClick={true}
              renderTrigger={() => (
                <button
                  className="w-8 h-7 flex flex-col justify-around bg-transparent border-0 cursor-pointer"
                >
                  <span className="w-8 bg-white h-0.5"></span>
                  <span className="w-8 bg-white h-0.5"></span>
                  <span className="w-8 bg-white h-0.5"></span>
                </button>
              )}
              className='w-50'
            >
              {/* ドロップダウンメニュー */}
              <Link
                to="/user"
                className='text-blue-800 underline block'
              >
                トップに戻る
              </Link>
              <Link
                to="/user/edit"
                className='text-blue-800 underline'
              >
                プロフィール編集
              </Link>
              <Link
                to="/posts"
                className="block px-4 text-blue-800 underline"
              >
                りんの日常
              </Link>
              {user && user.admin === true && (
                <>
                  <Link to="/admin/users" className="block px-4 text-blue-800 underline">
                    ユーザー管理
                  </Link>
                </>
              )}
              <LogoutButton 
                asLink onLogout={() => setIsLoggedIn(false)}
              />
            </Dropdown>
            {/* {menuOpen && (
              <nav
                style={{
                  position: "absolute",
                  top: "100%",
                  right: -100,
                  background: "#333",
                  border: "1px solid #333",
                  borderRadius: 4,
                  padding: 8,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  minWidth: 160,
                }}
              >
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li style={{ marginBottom: 8 }}>
                    <Link to="/user/edit" onClick={() => setMenuOpen(false)}>
                      プロフィール編集
                    </Link>
                  </li>
                  <li>
                    <LogoutButton asLink onLogout={() => setIsLoggedIn(false)} />
                  </li>
                </ul>
              </nav>
            )} */}
          </div>
        )}
      </header>

      <Outlet context={{ setIsLoggedIn }} />
    </div>
  );
}
