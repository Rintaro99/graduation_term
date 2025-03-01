# graduation_term

■サービス概要
今働いているライブハウスのホームページの作成。
一般的なwebサイトに加え、予約&決済機能、SNSとの連携、会場のバーチャルツアー機能、AR機能などを追加し、webアプリケーションの要素も取り入れる。

■ このサービスへの思い・作りたい理由
既存のホームページもあるのですが、情報更新のしづらさ、問い合わせ情報の見やすさなど、管理者側が不便に感じているため。
また、利用者側も情報の見やすさや問い合わせ方法などがわかりづらいと感じているため。
そのような声を働いている中でよく耳にするので、作りたいと思いました。

■ ユーザー層について
ライブを聴きにくるユーザー、ライブをしたいと思っているアーティスト、それを管理する管理者。

■サービスの利用イメージ
管理者：
ユーザーの予約の問い合わせか、アーティストの出演の問い合わせか、分別が簡単にできる。
情報の更新が簡単にできる。
アーティスト：
出演の依頼フォーム、ステージや使える機材の見やすさ、どのようなジャンルのアーティストが出演しているか把握できるように
ユーザー：
ライブ情報の検索、予約フォーム

■ ユーザーの獲得について
ライブハウス自身のSNSで宣伝、出演アーティストにSNSなどでリンクを貼り付けてもらう、

■ サービスの差別化ポイント・推しポイント
予約・チケット購入連携：
予約状況の管理やチケット購入機能を実装。
ライブ情報をユーザーがフィルタリングや検索できるようにする。
バーチャルツアーやAR体験:
ライブハウス内部を360度パノラマで見れる機能を実装し、初めて来る人でも雰囲気を感じられる。
SNSフィードの埋め込み:
TwitterやInstagramのハッシュタグを自動で取得し、ライブの様子やファンの反応をリアルタイムに表示
AR（拡張現実）機能:
スマホをかざすと会場内のオブジェクトや過去のライブのシーンがARで表示される仕組み。
＊この機能は暫定的、なくてもいいかも

■ 機能候補
MVPリリース時:
フード&ドリンク情報、ライブ情報(フィルター機能や検索機能でイベント情報を素早く確認できるようにする)、アクセス情報、予約フォーム、出演依頼フォーム、チケット購入の基本機能、バーチャルツアー機能、SNSフィードの埋め込み
本リリース時：
予約状況のリアルタイム反映、AR体験機能

■ 機能の実装方針予定
Google Maps API、決済API、WebSocket/ActionCable、Three.jsまたはA-Frame(パノラマビュー)、AR.js(拡張現実)
