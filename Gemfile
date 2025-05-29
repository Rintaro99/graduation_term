source "https://rubygems.org"

ruby "3.4.3"

gem "rails", "~> 7.2.2", ">= 7.2.2.1"
gem "sprockets-rails"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem "bootsnap", require: false
gem "tzinfo-data", platforms: %i[ windows jruby ]

group :development do
  gem "web-console"
  gem "letter_opener_web", "2.0.0"
end

group :development, :test do
  # MySQL ドライバ（ローカル開発・テスト用）
  gem "mysql2", ">= 0.5.3", "< 0.6.0"
  # もしテストで sqlite3 を使いたければ残しても OK
  gem "sqlite3"
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "error_highlight", ">= 0.4.0", platforms: [ :ruby ]
  gem "brakeman", require: false
  gem "rubocop", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rails-omakase", require: false
  gem "capybara"
  gem "selenium-webdriver"
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'faker'
end

group :production do
  # Heroku 本番では Postgres を使う
  gem "pg"
end

gem "sorcery", "0.16.3"

gem "importmap-rails"

gem "config"

gem "rails-i18n", "~> 7.0"
