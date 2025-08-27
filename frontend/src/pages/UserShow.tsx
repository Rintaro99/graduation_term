import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../api/users";


export default function UserShow() {
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", id],
    queryFn: () => getUser(id!),
    enabled: !!id,
  });

  const del = useMutation({
    mutationFn: () => deleteUser(id!),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      navigate("/users");
    },
  });

//   const deleting = (del as any).isPending ?? (del as any).isLoading;

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
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <Link to={`/users/${id}/edit`}><button>Edit</button></Link>
        <button
          onClick={() => { if (confirm("本当に削除しますか？")) del.mutate(); }}
          disabled={del.isPending}
        >
          {del.isPending ? "Deleting..." : "Delete"}
        </button>
        <Link to="/users">Back</Link>
      </div>
    </div>
  );
}
