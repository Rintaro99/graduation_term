class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: %i[new create]

  def new
    @user = User.new
  end

  def create
    # Rails.logger.debug "🌐 ログイン試行 email: #{params[:email]}"
    # @user = login(params[:email], params[:password])
    # Rails.logger.debug "🌐 Sorcery login result: #{@user.inspect}"

    email = params[:user][:email]
    password = params[:user][:password]
    # Rails.logger.debug "🌐 ログイン試行 email: #{email}"
    @user = login(email, password)
    # Rails.logger.debug "🌐 Sorcery login result: #{@user.inspect}"

    if @user
      redirect_to userpage_path, notice: "ログインしました"
    else
      @user = User.new(email: email)
      user_record = User.find_by(email: email)

      # メールアドレスのエラーチェック
      if email.blank?
        @user.errors.add(:email, "を入力してください")
      end

      if email.present? && user_record.nil?
        @user.errors.add(:email, "が登録されていません")
      end

      # パスワードのエラーチェック
      if password.blank?
        @user.errors.add(:password, "を入力してください")
      end

      if user_record && password.present? && !User.authenticate(email, password)
        @user.errors.add(:password, "が間違っています")
      end

      render :new, status: :unprocessable_entity
    end
  end

  # def create
  #   @user = User.new(email: params[:email]) # 入力保持用
  #   user_record = User.find_by(email: params[:email])

  #   # ↓↓↓ ここからエラーチェック
  #   if params[:email].blank?
  #     @user.errors.add(:email, 'を入力してください')
  #   elsif user_record.nil?
  #     @user.errors.add(:email, 'が登録されていません')
  #   elsif params[:password].blank?
  #     @user.errors.add(:password, 'を入力してください')
  #   elsif !User.authenticate(params[:email], params[:password])
  #     @user.errors.add(:password, 'が間違っています')
  #   else
  #     login(params[:email], params[:password])
  #     return redirect_to userpage_path, notice: 'ログインしました'
  #   end

  # ↑ どこかでエラーが発生したら
  #   render :new
  # end

  def start_quiz
    session[:answered_questions] = []
    redirect_to quiz_path
  end

  def destroy
    logout
    redirect_to root_path, status: :see_other
  end
end
