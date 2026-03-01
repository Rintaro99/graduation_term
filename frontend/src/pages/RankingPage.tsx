import { useEffect, useState } from "react";
import { getRanking } from "../api/ranking";
import RankingRow from "../components/RankingRow";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

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
    <div className="mt-5 sm:mt-15 w-full max-w-150 mx-auto grid">
      <h2 className="text-3xl sm:text-5xl text-slate-300" style={{ fontFamily: "'Dela Gothic One', cursive" }}>ランキング</h2>

      <table border={1} cellPadding={8} className="mt-7 w-full mx-auto">
        <thead>
          <tr>
            <th className="text-sm sm:text-base">順位</th>
            <th className="text-sm sm:text-base">名前</th>
            <th className="text-sm sm:text-base">称号</th>
            <th className="text-sm sm:text-base">シンボル</th>
            <th className="text-sm sm:text-base">スコア</th>
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

      <h3 className="mt-5">あなたの順位</h3>
      <p className="mt-3 text-lg text-red-300">
        {myRank ? (
          <>
            {myRank}位 <br />
            <span>スコア: {myScore}</span>
          </>
        ) : (
          "まだスコアがありません"
        )}
      </p>
      <Button as={ Link }  to="/user" className="mt-5 mx-auto bg-cyan-700 hover:bg-cyan-800" style={{ fontFamily: "'Dela Gothic One', cursive" }}>トップに戻る</Button>
    </div>
  );
}
