FROM ruby:3.1.4-slim

# ① Gem の bin ディレクトリを PATH に追加
ENV PATH=/usr/local/bundle/bin:$PATH

ENV LANG=C.UTF-8 TZ=Asia/Tokyo

# 必要なパッケージを追加で入れる
RUN apt-get update -qq \
 && apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      nodejs \
      npm \
      yarn \
      git \
      default-libmysqlclient-dev \
 && rm -rf /var/lib/apt/lists/*

# 先に Rails や依存 gem をインストール
RUN gem install rails \
    pg \
    puma \
    sprockets-rails \
    importmap-rails

WORKDIR /usr/src/app
