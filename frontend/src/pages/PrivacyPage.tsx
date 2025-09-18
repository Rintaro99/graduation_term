import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function PrivacyPage() {
  return (
    <div className="mt-10 sm:mt-15">
      <h2 className="text-2xl sm:text-4xl">プライバシーポリシー</h2>
        <p className="mt-3 sm:mt-5 text-sm sm:text-base">
          りんって書ける？<br className="sm:hidden"/>（以下「当サービス」といいます。）は、
          <br />
          ユーザーの個人情報を適切に取り扱うことが重要であると認識し、
          <br />
          以下の方針に基づき個人情報を保護します。
        </p>

        <p className="mt-7 sm:mt-13 text-xl sm:text-2xl">
          第1条（収集する情報）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-base">    
          当サービスは、ユーザーが利用登録を行う際に、メールアドレスなどを収集することがあります。<br />
          また、利用状況の把握のため、CookieやIPアドレス等のアクセス情報を取得する場合があります。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第2条（利用目的）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          収集した個人情報は、以下の目的のために利用します。
        </p>
        <ul className="mt-3 sm:mt-5 list-disc list-outside text-left text-sm sm:text-base mx-auto inline-block">
          <li>
            <p>本サービスの提供、運営</p>
          </li>
          <li>
            <p>ユーザーへの連絡、問い合わせ対応</p>
          </li>
          <li>
            <p>サービス改善のための利用状況の分析</p>
          </li>
          <li>
            <p>不正利用防止のための確認</p>
          </li>
        </ul>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第3条（第三者提供）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          運営者は、法令に基づく場合を除き、ユーザーの個人情報を第三者に提供することはありません。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第4条（業務委託）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          運営者は、サーバー運営等の業務を外部に委託する場合があります。<br />
          この場合、適切な委託先を選定し、個人情報が安全に管理されるよう監督します。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第5条（安全管理）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          運営者は、個人情報の漏洩、紛失、改ざん等を防止するため、適切な安全管理措置を講じます。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第6条（ユーザーの権利）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          ユーザーは、自己の個人情報について、開示・訂正・削除を請求することができます。<br />
          その際は、下記お問い合わせ先までご連絡ください。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第7条<br className="sm:hidden" />（プライバシーポリシーの変更）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          運営者は、必要に応じて本ポリシーを変更できるものとします。<br />
          変更後の内容は、本サービス上に掲載した時点で効力を生じます。
        </p>

        <p className="mt-5 sm:mt-13 text-xl sm:text-2xl">
          第8条（お問い合わせ窓口）
        </p>
        <p className="mt-3 sm:mt-5 text-sm sm:text-sm"> 
          本ポリシーに関するお問い合わせは、以下のメールアドレスまでお願いいたします。<br />
          メールアドレス：rin.910491@gmail.com
        </p>
        <div>
          <Button as={ Link } to="/" color="pink" className="mt-10 sm:mt-15 inline-flex">トップページへ戻る</Button>
        </div>
    </div>
  );
}
