FROM ruby:3.4.3

ENV LANG=C.UTF-8 TZ=Asia/Tokyo

# 1) ネイティブ拡張ビルドに必要なライブラリ群をまとめてインストール
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      default-libmysqlclient-dev \
      libyaml-dev \
      libssl-dev \
      ca-certificates \
      curl gnupg \
      nodejs npm python3 cron && \
    rm -rf /var/lib/apt/lists/*

# 公式 Yarn を npm 経由でインストール
RUN npm install -g yarn

# 2) 作業ディレクトリ
WORKDIR /usr/src/app

# 3) Bundler バージョンを Gemfile.lock に合わせる
RUN gem install bundler -v 2.3.26

# 4) 依存ファイルを先行コピー → bundle/yarn インストール
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

# Node/Yarn 側の依存をインストールするために package.json もコピー
COPY package.json yarn.lock ./
RUN yarn install

# 5) アプリケーションコードをコピー
COPY . .

# 6) デフォルトのコマンドとして Puma を起動
EXPOSE 3000
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
