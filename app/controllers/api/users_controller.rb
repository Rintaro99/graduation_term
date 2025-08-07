module Api
  class UsersController < BaseController
    skip_before_action :require_login, only: %i[create]
    # before_action :set_user, only: [ :show, :edit, :update, :userpage ]

    # GET /api/users/:id
    def show
      user = current_user
      if user
        user.update_symbols! if user.respond_to?(:update_symbols!)
        render json: user.as_json(only: [:id, :name, :email])
      else
        render json: {error: "認証が必要です"}, status: :unauthorized
      end
    end

    # PATCH/PUT /api/users/:id
    def update
      user = current_user
      if user.update(user_params)
        render json: { message: "更新しました", user: user.as_json(only: [:id, :name, :email]) }, status: :ok
      else
        render json: { errors: user.errors.full_massages }, status: :unprocessable_entity
      end
    end

    # POST /api/users
    def create
      user = User.new(user_params)
      if user.save
        render json: { message: "ユーザー登録成功", user: user.as_json(only: [:id, :name, :email]) }
      else
        render json: { errors: user.errors.full_massages }, status: :unprocessable_entity
      end
    end

    # GET /api/userpage
    def userpage
      user = current_user
      if user
        render json: user.as_json(only: [:id, :namne, :email])
      else
        render json: { error: "認証が必要です" }, status: :unauthorized
      end
    end

    private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation, :terms_of_service)
    end
  end
end
