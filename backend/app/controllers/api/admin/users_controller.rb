# frozen_string_literal: true

module Api
  module Admin
    class UsersController < Api::BaseController
      before_action :require_admin! # 管理者専用
      before_action :set_user, only: %i[update destroy]

      # ユーザー一覧
      def index
        users = ApiUser.includes(:achievement_symbols)

        render json: users.map { |user|
          best_score = user.api_challenges.maximum(:score) || 0
          best_symbol = AchievementSymbol.where("min_score <= ?", best_score)
                                         .order(min_score: :desc)
                                         .first
          {
            id: user.id,
            name: user.name,
            email: user.email,
            score: best_score,
            symbols: user.achievement_symbols.pluck(:name),
            title: best_symbol&.name,
            symbol_img: best_symbol&.img
          }
        }
      end

      def show
        user = ApiUser.find(params[:id])
        favorites = user.api_post_favorites.includes(:api_post)

        best_score = user.api_challenges.maximum(:score) || 0
        best_symbol = AchievementSymbol.where("min_score <= ?", best_score)
                                       .order(min_score: :desc)
                                       .first

        render json: {
          id: user.id,
          name: user.name,
          email: user.email,
          score: best_score,
          symbols: user.achievement_symbols.pluck(:name),
          title: best_symbol&.name,
          symbol_img: best_symbol&.img,
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
  end
end
