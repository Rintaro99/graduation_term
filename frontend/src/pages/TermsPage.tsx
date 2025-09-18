import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function TermsPage() {
  return (
    <div className="mt-10 sm:mt-15">
      <h2 className="text-2xl sm:text-4xl">利用規約</h2>
      <p className="mt-3 sm:mt-5 text-sm sm:text-base">
        本利用規約（以下「本規約」といいます。）は、
        <br />
        りんって書ける？（以下「当サービス」といいます。）の利用条件を定めるものです。
        <br />
        ユーザーは、本サービスを利用することにより、本規約に同意したものとみなされます。
      </p>

      <p className="mt-8 sm:mt-13 text-xl sm;text-2xl">
        第1条（適用）
      </p>
      <p className="mt-2 sm:mt-5 text-sm sm:text-base">
        本規約は、ユーザーと当サービスの運営者との間のサービス利用に関わる一切の関係に適用されます。
      </p>

      <p className="mt-5 sm:mt-13 text-xl sm;text-2xl">
        第2条（利用登録）
      </p>
      <ol className="mt-2 sm;mt-5 text-left text-sm sm:text-base list-decimal list-outside pl-3 sm:pl-15">
        <li>
          <p>
            ユーザーは、本規約に同意の上、所定の方法により利用登録を行うものとします。
          </p>
        </li>
        <li>
          <p>
            登録時に虚偽の情報を提供することを禁止します。
          </p>
        </li>
      </ol>

      <p className="mt-5 sm:mt-13 text-xl sm;text-2xl">
        第3条（アカウント管理）
      </p>
      <ol className="mt-2 sm;mt-5 text-left text-sm sm:text-base list-decimal list-outside pl-3 sm:pl-15">
        <li>
          <p>ユーザーは、自己の責任においてアカウントおよびパスワードを管理するものとします。</p>
        </li>
        <li>
          <p>アカウントを第三者に譲渡、貸与することはできません。</p>
        </li>
        
      </ol>

      <Button as={ Link } to="/" color="pink" className="mt-10 sm:mt-15 inline-flex">トップページへ戻る</Button>
    </div>
  );
}
