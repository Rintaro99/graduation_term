import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function TermsPage() {
  return (
    <div className="mt-15">
      <h2 className="text-4xl">利用規約</h2>
      <p className="mt-5 text-base">
        本利用規約（以下「本規約」といいます。）は、
        <br />
        りんって書ける？（以下「当サービス」といいます。）の利用条件を定めるものです。
        <br />
        ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
      </p>

      <p className="mt-13 text-2xl">
        第1条（適用）
      </p>
      <p className="mt-5">
        本規約は、ユーザーと当サービスの運営者との間のサービス利用に関わる一切の関係に適用されます。
      </p>

      <p className="mt-10 text-2xl">
        第2条（利用登録）
      </p>
      <p className="mt-5 text-left pl-10">
        1. ユーザーは、本規約に同意の上、所定の方法により利用登録を行うものとします。<br />
        2. 登録時に虚偽の情報を提供することを禁止します。
      </p>

      <p className="mt-10 text-2xl">
        第3条（アカウント管理）
      </p>
      <p className="mt-5 text-left pl-10">
        1. ユーザーは、自己の責任においてアカウントおよびパスワードを管理するものとします。<br />
        2. アカウントを第三者に譲渡、貸与することはできません。
      </p>


      <Button as={ Link } to="/" color="pink" className="mt-15 inline-flex">トップページへ戻る</Button>
    </div>
  );
}
