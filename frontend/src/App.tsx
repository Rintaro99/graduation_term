import './App.css'
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import LogoutButton from "./components/LogoutButton";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";

export default function App() {
  console.log("DEBUG Dropdown:", Dropdown);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth_token")
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [isLoggedIn]);

  return (
    <div className="">
      <header className="flex justify-between items-center px-10">
        <Link to="/">
          <img src="../public/top_page_logo.jpg" alt="トップページへ" className='w-15'/>
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
                to="/user/edit"
                className='text-blue-800 underline'
              >
                プロフィール編集
              </Link>
              <LogoutButton 
                asLink onLogout={() => setIsLoggedIn(false)}
              />
            </Dropdown>
            {menuOpen && (
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
            )}
          </div>
        )}
      </header>

      <Outlet context={{ setIsLoggedIn }} />
    </div>
  );
}
