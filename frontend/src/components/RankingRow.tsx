type Props = {
  rank: number;
  name: string;
  title?: string;
  symbolUrl?: string;
  score: number;
  isMe?: boolean;
};

export default function RankingRow({ rank, name, title, symbolUrl, score, isMe }: Props) {
  // 順位ごとの文字スタイル
  let rankStyle: React.CSSProperties = {};

  if (rank === 1) {
    rankStyle = { color: "gold", fontWeight: "bold", fontSize: "1.2em" };
  } else if (rank === 2) {
    rankStyle = { color: "silver", fontWeight: "bold", fontSize: "1.1em" };
  } else if (rank === 3) {
    rankStyle = { color: "#cd7f32", fontWeight: "bold", fontSize: "1.05em" }; // 銅
  }

  // 自分の行なら背景ハイライト
  const rowStyle: React.CSSProperties = isMe
    ? { backgroundColor: "#f0f8ff" }
    : {};

  return (
    <tr style={rowStyle}>
      <td style={rankStyle}>{rank}</td>
      <td style={rankStyle}>{name}</td>
      <td style={rankStyle}>{title || "-"}</td>
      <td>
        {symbolUrl ? (
          <img
            src={symbolUrl}
            alt={title || "シンボル"}
            className="w-13 mx-auto"
          />
        ) : (
          "-"
        )}
      </td>
      <td style={rankStyle}>{score}</td>
    </tr>
  );
}
