import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('API Error:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
