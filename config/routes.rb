Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  get "home/index"
  root "home#top"
  get  "signup", to: "users#new",    as: :signup
  post "signup", to: "users#create"
  resources :users, only: %i[new create]
  get "login", to: "user_sessions#new", as: :login
  post "login", to: "user_sessions#create"
  delete "logout", to: "user_sessions#destroy", as: :logout
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :password_resets, only: [ :new, :create, :edit, :update ]

  get "userpage", to: "users#userpage"

  get "start_quiz", to: "user_sessions#start_quiz", as: "start_quiz"
  get "quiz", to: "questions#show" # クイズ出題ページ
  resources :questions, only: [ :show ]

  # 回答チェック用のルート追加
  post "check_answer", to: "answers#check", as: "check_answer"
  # ★成績表示
  get "results", to: "results#show", as: "results"
  # ★クイズリセット（もう一度挑戦ボタン用）
  get "reset_quiz", to: "results#reset", as: "reset_quiz"

  # ランキング用
  resources :challenges, only: [ :new, :create ]
  get "ranking", to: "rankings#index"

  # 回答の自動保存
  post "check_answer", to: "answers#check"

  resource :mypage, only: [ :show, :edit, :update ], controller: "users"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # 利用規約とプライバシーポリシー
  get "terms", to: "pages#terms", as: :pages_terms
  get "privacy", to: "pages#privacy", as: :pages_privacy
  get "/data-deletion", to: "pages#data_deletion"

  # 投稿のルーティング
  resources :posts

  # snsログイン
  # get "/oauth/callback",  to: "oauths#callback"
  get "/oauth/:provider/callback", to: "oauths#callback", as: :auth_callback
  get "/oauth/:provider", to: "oauths#oauth", as: :auth_at_provider
  # get "/oauth/:provider", to: "oauths#oauth", as: :auth_at_provider
  # get "/oauth/callback", to: "oauths#callback"
  # 汎用的なルーティング（Google/Twitter/Facebookをすべて対応）
  # get '/auth/:provider/callback', to: 'omniauth_callbacks#generic'
  # get '/auth/:provider/callback', to: 'omniauth_callbacks#google', constraints: ->(req) { req.params[:provider] == 'google' }
  # get '/auth/:provider/callback', to: 'omniauth_callbacks#twitter', constraints: ->(req) { req.params[:provider] == 'twitter' }
  # get '/auth/:provider/callback', to: 'omniauth_callbacks#facebook', constraints: ->(req) { req.params[:provider] == 'facebook' }
  # Defines the root path route ("/")
  # root "posts#index"

  # railsApiのルーティング
  devise_for :api_users,
              class_name: 'ApiUser',
              path: 'api/api_users',
              defaults: { format: :json },
              controllers: {
                sessions: 'api/api_users/sessions',
                registrations: 'api/api_users/registrations'
              }
  namespace :api, defaults: { format: :json } do
    get '/ping', to: 'pings#index'
  end
end
