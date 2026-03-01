# 概要

本アプリは、「麟」という漢字に関するクイズに挑戦し、他ユーザーとスコアを競い合えるWebアプリです。
スコアに応じて称号やシンボルを獲得できるランキング機能を実装しています。
また、管理者である私のみが投稿できるブログ機能も搭載しています。

# 制作背景

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

### テスト

- RSpec
- FactoryBot
- Capybara

### その他

- rack-cors（フロント分離構成対応）
- SendGrid / Resend（メール送信）

# システム構成

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

# ER図

<img width="1011" height="611" alt="er drawio" src="https://github.com/user-attachments/assets/0f97f906-f778-4ef6-84e2-f13731f322bf" />


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


## 投稿機能
管理者権限のあるユーザーのみ、投稿できる機能を備えています。

[![Image from Gyazo](https://i.gyazo.com/618b5123b2afae2453341cbd4690820a.gif)](https://gyazo.com/618b5123b2afae2453341cbd4690820a)

一般ユーザーは、投稿された記事の閲覧、お気に入りをつける機能があります。

## 管理者権限

###　記事の投稿

[![Image from Gyazo](https://i.gyazo.com/6faeaa3fca91ed03cba481f2674a6991.png)](https://gyazo.com/6faeaa3fca91ed03cba481f2674a6991)

[![Image from Gyazo](https://i.gyazo.com/64ff7861f9e7a4044772d8b572902975.gif)](https://gyazo.com/64ff7861f9e7a4044772d8b572902975)

管理者は、記事一覧のページに「ユーザー一覧」(後ほど説明)と「新規投稿」ボタンがある。この新規投稿ボタンから投稿をすることができます。

<img width="787" height="452" alt="スクリーンショット 2026-03-02 0 20 52" src="https://github.com/user-attachments/assets/c016632b-0771-4b45-8d4a-659646b7a2d6" />

また、記事の詳細を見ると編集と削除する機能も管理者権限のあるユーザーのみ付与されています。

### ユーザー一覧

<img width="787" height="765" alt="スクリーンショット 2026-03-02 0 22 49" src="https://github.com/user-attachments/assets/ebfe77df-2d43-4190-a2c9-c270e57a0227" />

管理者のみ、登録されたユーザーの一覧を見ることができます。  
ここでは、ユーザー名、クイズのスコア、称号、シンボルが表示される仕組みとなっています。



https://github.com/user-attachments/assets/c1c3d929-9fdd-4b03-b21c-a4fd5df11a18



ユーザー一覧の詳細ページでは、上記の情報に加えどの記事をお気に入りにしたのかわかるようになっています。


# 工夫した点

- スコアに応じて称号・シンボルを付与する仕組みを実装
- ランキング機能を実装し、ユーザー同士がスコアを競い合える仕組みを導入
- フロントとバックを分離することで、表示とビジネスロジックの責務を明確にし、将来的な拡張性を意識した設計に。
