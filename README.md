# graduation_term

■サービス概要
私の名前が麟太郎というのですが、この「麟」という感じが難しく、他の人に間違った字で書かれることが多いため、「麟」の字に関するクイズや豆知識などを提供し、利用した人が「麟」の字を書けるようなアプリです。

■ このサービスへの思い・作りたい理由
よく「麟」の文字を「凛」と間違えて認識されたり、「鱗」と間違って書かれることが多いため、このサービスを思いつきました。

■ ユーザー層について
初対面の人

■サービスの利用イメージ
私自身のことを印象的に覚えてもらえる、

■ ユーザーの獲得について
名刺や自己紹介ページなどにサービスのサイトのQRコードやURLを載せ、私自身を知ってもらうのに面白みを付与する。

■ サービスの差別化ポイント・推しポイント
「麟」という一文字に注目することに面白みがある。
ユーザー登録機能を実装し、全国ランキングを見れるようにしてユーザー同士競い合える。
私のことについて知ってもらえる。

■ 機能候補
MVPリリース：
サインアップ、ログイン、ログアウト機能(sorcery)
クイズ関連→問題出題、正誤判定、フィードバック、ポイント加算などのロジック機能を追加
ランキング集計→SQLの集計やActiveRecordのクエリで、ユーザーごとのポイントやバッジ情報を表示

本リリース：
Action Cableを活用し、リアルタイムのチャット、通知、ライブランキング更新などを実装。
ソーシャルログイン(googleなど)を利用して、よりスムーズなユーザー登録・ログインを実現。
Redisを活用し、ランキングやコンテンツの負荷分散を実行。
ActiveJobを用いて、スコア計算や通知配信、定期的なデータ集計などを非同期処理で実行。
Google Analyticsなどを導入し、ユーザーの利用状況やコンテンツの人気度を把握。

本リリース時：
予約状況のリアルタイム反映、AR体験機能

■ 機能の実装方針予定
Google Maps API、決済API、WebSocket/ActionCable、Three.jsまたはA-Frame(パノラマビュー)、AR.js(拡張現実)
