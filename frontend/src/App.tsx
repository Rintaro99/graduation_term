import './App.css'
import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div style={{ padding: 16, maxWidth: 800, margin: '0 auto' }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 20, marginRight: 'auto' }}>Vite + React + Rails API</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/quiz">Quiz</Link>
          <Link to="/users">Users</Link>
          <Link to="/users/new">New</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* ここに子ルートが差し込まれる */}
      <Outlet />
    </div>
  )
}
