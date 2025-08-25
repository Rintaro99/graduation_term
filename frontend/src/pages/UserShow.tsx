import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { getUser } from "../api/users";

export default function UserShow() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  if (isLoading) return <div style={{ padding: 16 }}>Loading...</div>;
  if (error) {
    const msg =
      (error as any)?.response?.data?.message ||
      (error as Error).message ||
      "エラーが発生しました";
    return <div style={{ color: "crimson", padding: 16 }}>{msg}</div>;
  }
  if (!data) return <div style={{ padding: 16 }}>見つかりませんでした</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>User Detail</h2>
      <div><b>ID:</b> {data.id}</div>
      <div><b>Email:</b> {data.email}</div>
      <div><b>Name:</b> {data.name ?? "(no name)"}</div>
      <div style={{ marginTop: 16 }}>
        <Link to="/users">← Back to Users</Link>
      </div>
    </div>
  );
}
