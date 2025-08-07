module Api
  class UserSessionsController < BaseController
    skip_before_action :require_login_api, only: %i[create]

    # POST /api/user_sessions
    def create
      email = params[:email] || params.dig(:user, :email)
      password = params[:password] || params.dig(:user, :password)
      user = login(email, password)

      if user
        render json: { message: "ログインしました", user: user.as_json([:id, :name, :email]) }, status: :ok
      else
        errors = []
        user_record = User.find_by(email: email)

        # メールアドレスのエラーチェック
        if email.blank?
          errors << "メールアドレスを入力してください"
        else user_record.nil?
          errors << "メールアドレスが登録されていません"
        end

        # パスワードのエラーチェック
        if password.blank?
          errors << "パスワードが入力されていません"
        else user_record && !User.authenticate(email, password)
          errors << "パスワードが間違っています"
        end

        render json:{ errors: errors }, status: :unprocessable_entity
      end
    end

    def destroy
      logout
      redirect json: { message: "ログアウトしました" }, status: :ok
    end
  end
end
