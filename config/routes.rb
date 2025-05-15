Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?

  get "home/index"
  root "home#top"
  get  "signup", to: "users#new",    as: :signup
  post "signup", to: "users#create"
  resources :users, only: %i[new create]
  get 'login', to: 'user_sessions#new', as: :login
  post 'login', to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy', as: :logout
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :password_resets, only: [:new, :create, :edit, :update]

  get 'userpage', to: 'users#userpage'

  get 'start_quiz', to: 'user_sessions#start_quiz', as: 'start_quiz'

  get 'quiz', to: 'questions#show' # クイズ出題ページ
  resources :questions, only: [:show] # （任意）show単体でルート残してもOK
  # 回答チェック用のルート追加
  post 'check_answer', to: 'answers#check', as: 'check_answer'


  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # Defines the root path route ("/")
  # root "posts#index"
end
