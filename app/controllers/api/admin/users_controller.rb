class Api::Admin::UsersController < Api::BaseController
  before_action :require_admin!  # 管理者専用
  before_action :set_user, only: [:update, :destroy]

  # ユーザー一覧
  def index
    users = ApiUser.includes(:achievement_symbols)

    render json: users.map { |user|
      {
        id: user.id,
        name: user.name,
        email: user.email,
        score: user.api_challenges.sum(:score), # 合計スコア
        symbols: user.achievement_symbols.pluck(:name),
        title: user.achievement_symbols.order(min_score: :desc).first&.name
      }
    }
  end

  def show
    user = ApiUser.find(params[:id])
    favorites = user.api_post_favorites.includes(:api_post)

    render json: {
      id: user.id,
      name: user.name,
      email: user.email,
      score: user.api_challenges.sum(:score),
      symbols: user.achievement_symbols.pluck(:name),
      title: user.achievement_symbols.order(min_score: :desc).first&.name,
      favorites: favorites.map do |fav|
        {
          id: fav.id,
          created_at: fav.created_at, # ← お気に入り登録日時
          post: {
            id: fav.api_post.id,
            title: fav.api_post.title,
            content: fav.api_post.content,
            created_at: fav.api_post.created_at, # ← 投稿の作成日時を追加
            api_user: {
              id: fav.api_post.api_user.id,
              name: fav.api_post.api_user.name,
              email: fav.api_post.api_user.email
            }
          }
        }
      end
    }
  end


  # ユーザー更新（例: 名前やメールアドレス）
  def update
    if @user.update(user_params)
      render json: { message: "更新しました", user: @user }
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # ユーザー削除
  def destroy
    @user.destroy
    render json: { message: "削除しました" }
  end

  private

  def set_user
    @user = ApiUser.find(params[:id])
  end

  def user_params
    params.require(:api_user).permit(:name, :email)
  end
end
