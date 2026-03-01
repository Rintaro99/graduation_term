# **概要**

本アプリは、「麟」という漢字に関するクイズに挑戦し、他ユーザーとスコアを競い合えるWebアプリです。
スコアに応じて称号やシンボルを獲得できるランキング機能を実装しています。
また、管理者である私のみが投稿できるブログ機能も搭載しています。

# **制作背景**

自分自身を表現できる名刺代わりのアプリを作りたいと考えました。
私の名前に含まれる「麟」という漢字は、「鱗」や「凛」などに間違えられることが多く、その経験をきっかけに、名前を覚えてもらうためのアプリを作ろうと思いました。
また、プログラミングスクールで学んだ技術を活かし、設計から本番環境構築まで一貫して開発することにも挑戦しました。

# 技術スタック

## フロントエンド

- React 19（TypeScript）
- Vite
- Tailwind CSS
- Flowbite / DaisyUI

## バックエンド

- Ruby 3.4.3
- Ruby on Rails 7.2（APIモード）
- PostgreSQL

### 認証

- Devise
- devise-jwt（JWT認証）

SPAとの相性を考慮し、ステートレスなJWT認証を採用しています。

### テスト

- RSpec
- FactoryBot
- Capybara

### その他

- rack-cors（フロント分離構成対応）
- SendGrid / Resend（メール送信）

# **システム構成**

## 開発環境

- Docker Compose
- Rails（APIモード）
- PostgreSQL（Dockerコンテナ）

Dockerを用いてアプリケーションとデータベースを分離し、ローカル環境差異を防いでいます。

## 本番環境

- フロントエンド：Vercel
- バックエンド：Render（Web Service）
- データベース：Render PostgreSQL
- 認証：JWT（Devise）
- 環境変数管理：Render / Vercel

# 機能説明

## ユーザーページ→クイズチャレンジ

<img width="826" height="517" alt="スクリーンショット 2026-03-01 23 50 53" src="https://github.com/user-attachments/assets/0d70db53-6882-43c2-8cc8-57899c724454" />

新規登録、ログインを行うと、ユーザーページ(初期)になります。
この状態では、称号とシンボルは無し。

[![Image from Gyazo](https://i.gyazo.com/f76fdca3f1d1158841369c0d67c205ee.gif)](https://gyazo.com/f76fdca3f1d1158841369c0d67c205ee)

クイズ問題では、問題→解説→問題→解説→...という流れで、答えた問題と解答、解説が交互に表示されていく仕組みです。

[![Image from Gyazo](https://i.gyazo.com/3277f8f0b6e6cf9b307a0efb0b3edd1e.gif)](https://gyazo.com/3277f8f0b6e6cf9b307a0efb0b3edd1e)

そして、全10問答えるとそのスコアに応じたシンボルと称号が与えられます。
そのシンボルと称号は、自分のユーザーページに表示されるようになります。

[![Image from Gyazo](https://i.gyazo.com/1d2d1e897418ea61fe35450f52728eef.png)](https://gyazo.com/1d2d1e897418ea61fe35450f52728eef)


## ランキング機能

[![Image from Gyazo](https://i.gyazo.com/601bd00ac515a635cf87dc7a1570941a.png)](https://gyazo.com/601bd00ac515a635cf87dc7a1570941a)

ランキング機能では、他のユーザー名前の称号、シンボル、スコアがランキング順で表示されます。
ランキング表の自分の位置は色でハイライトされ、どの順位か一目でわかるようになっています。


## プロフィール編集、パスワードリセット

[![Image from Gyazo](https://i.gyazo.com/4d3a7dd596b510e2eab1caa47523ae61.png)](https://gyazo.com/4d3a7dd596b510e2eab1caa47523ae61)

プロフィール編集は右上のハンバーガーメニューから行います。

[![Image from Gyazo](https://i.gyazo.com/fdd884729f8c1ac904c212238f74b930.png)](https://gyazo.com/fdd884729f8c1ac904c212238f74b930)

ここで名前とメールアドレスの変更が可能となります。

<img width="1116" height="465" alt="スクリーンショット 2026-03-02 0 10 49" src="https://github.com/user-attachments/assets/95da5001-b94d-446b-81f8-c681cff800c8" />

[![Image from Gyazo](https://i.gyazo.com/f1211619e68e2b57856520cd7effd68d.png)](https://gyazo.com/f1211619e68e2b57856520cd7effd68d)




パスワードリセットは入力したメールアドレスにパスワードリセット用URLを添付したメールを送り、そこからパスワード変更を行います。


# 工夫した点

- スコアに応じて称号・シンボルを付与する仕組みを実装
- ランキング機能を実装し、ユーザー同士がスコアを競い合える仕組みを導入
- フロントとバックを分離することで、表示とビジネスロジックの責務を明確にし、将来的な拡張性を意識した設計に。

# 今後の改善点

- UI/UXの改善  
直感的に操作できる導線設計や、アニメーションの最適化を行う
- 問題数の増加、難易度別挑戦機能の実装  
継続的に楽しめるコンテンツ量を確保する
- データベースの構築を、RenderからAWSに移行  
データベースをRenderからAWSへ移行し、EC2やRDSを含めた構成を実践することで、アプリケーションだけでなくインフラ全体を学習する
