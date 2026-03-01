# frozen_string_literal: true

module Api
  class UsersController < Api::BaseController
    def index
      users = ApiUser.select(:id, :email, :name)
      render json: users.as_json(only: %i[id email name])
    end

    def show
      u = ApiUser.select(:id, :email, :name).find(params[:id])
      render json: u.as_json(only: %i[id email name])
    rescue ActiveRecord::RecordNotFound
      render json: { message: "not found" }, status: :not_found
    end

    def mypage
      user = current_api_user
      best_symbol = user.achievement_symbols.order(min_score: :desc).first

      render json: {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        title: user.achievement_symbols.order(min_score: :desc).first&.name,
        symbol_img: best_symbol&.img,
        symbols: user.achievement_symbols.pluck(:name)
      }
    end

    def create
      u = ApiUser.new(user_params)
      if u.save
        render json: u.slice(:id, :email, :name), status: :created
      else
        render json: { errors: u.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update_mypage
      user = current_api_user
      if user.update(user_update_params)
        render json: user.slice(:id, :name, :email), status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      u = ApiUser.find(params[:id])
      if u.update(user_update_params)
        render json: u.slice(*base_fields), status: :ok
      else
        render json: { errors: u.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      u = ApiUser.find(params[:id])
      u.destroy!
      head :no_content
    end

    private

    def base_fields
      f = %i[id email]
      f << :name if ApiUser.column_names.include?("name")
      f
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end

    def user_update_params
      permitted = [ :email ]
      permitted << :name if ApiUser.column_names.include?("name")
      permitted += %i[password password_confirmation]
      attrs = params.require(:user).permit(permitted).to_h
      attrs.compact_blank!
      # password が無いなら確認用も落とす（ノイズ防止）
      attrs.delete("password_confirmation") unless attrs.key?("password")
      attrs
    end
  end
end
