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
    ? { backgroundColor: "rgb(252 165 165 / var(--tw-bg-opacity, 1))" }
    : {};

  return (
    <tr style={rowStyle}>
      <td className="text-sm sm:text-base" style={rankStyle}>{rank}</td>
      <td className="text-sm sm:text-base" style={rankStyle}>{name}</td>
      <td className="text-sm sm:text-base" style={rankStyle}>{title || "-"}</td>
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
      <td className="text-sm sm:text-base" style={rankStyle}>{score}</td>
    </tr>
  );
}
