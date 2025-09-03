import { useEffect, useState } from "react";
import { getRanking } from "../api/ranking";
import RankingRow from "../components/RankingRow";
import { Link } from "react-router-dom";

type UserRank = {
  name: string;
  score: number;
  title?: string;
  symbol_url?: string;
};

export default function RankingPage() {
  const [topUsers, setTopUsers] = useState<UserRank[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [myScore, setMyScore] = useState<number | null>(null);
  const [myName, setMyName] = useState<string>("");

  useEffect(() => {
    getRanking().then((data) => {
      setTopUsers(data.top_users);
      setMyRank(data.my_rank);
      setMyScore(data.my_score);
      setMyName(data.my_name);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>ランキング</h2>
      <h3>上位10名</h3>

      <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>順位</th>
            <th>名前</th>
            <th>称号</th>
            <th>シンボル</th>
            <th>スコア</th>
          </tr>
        </thead>
        <tbody>
          {topUsers.map((u, i) => (
            <RankingRow
              key={i}
              rank={i + 1}
              name={u.name}
              title={u.title}
              symbolUrl={u.symbol_url}
              score={u.score}
              isMe={u.name === myName}
            />
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 20 }}>あなたの順位</h3>
      <p>{myRank ? `${myRank}位 (スコア: ${myScore})` : "まだスコアがありません"}</p>
      <div style={{ marginTop: 20 }}>
        <Link to="/user">トップに戻る</Link>
      </div>
    </div>
  );
}
