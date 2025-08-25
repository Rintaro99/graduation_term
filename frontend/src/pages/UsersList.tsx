import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../api/users";

export default function UsersList() {
  const { data, isLoading, error } = useQuery({ queryKey: ["users"], queryFn: listUsers });

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;

  if (error) {
    const msg =
      (error as any)?.response?.data?.message ||
      (error as any)?.response?.data?.errors?.join(", ") ||
      (error as Error).message ||
      "エラーが発生しました";
    return <div style={{ color: "crimson", padding: 16 }}>{msg}</div>;
  }

  if (!data?.length) return <div style={{ padding: 16 }}>ユーザーがいません</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Users</h2>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {data.map((u) => (
          <li key={u.id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <div style={{ fontWeight: 600 }}>{u.name ?? "(no name)"}</div>
            <div style={{ opacity: 0.8 }}>{u.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}