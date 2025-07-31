class OauthsController < ApplicationController
  skip_before_action :require_login
  include Sorcery::Controller::Submodules::External

  def oauth
    login_at(params[:provider])
    # provider = params[:provider]
    # Rails.logger.debug "[DEBUG] provider=#{provider.inspect}"

    # begin
    #   login_at(provider) # ← これが内部でredirectするので、**自分で redirect_to しない！**
    # rescue => e
    #   Rails.logger.error "[ERROR] login_at failed: #{e.class} - #{e.message}"
    #   raise
    # end
  end

  def callback
    provider = auth_params[:provider]
    # 既存のユーザーをプロバイダ情報を元に検索し、存在すればログイン
    if (@user = login_from(provider))
      auto_login(@user)
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    else
      # すでにメールアドレスでユーザーが存在するか確認
      user = User.find_by(email: access_token.info.email)
      if user
        user.authentications.create(provider: provider, uid: access_token.uid)
        auto_login(user)
      else
        @user = create_from(provider)
        auto_login(@user)
      end
    end
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end

  def signup_and_login(provider)
    @user = create_from(provider)
    reset_session
    auto_login(@user)
    # provider = params[:provider]
    # Rails.logger.debug "[DEBUG] === CALLBACK for #{provider} ==="

    # if (@user = login_from(provider))
    #   auto_login(@user)
    #   Rails.logger.debug "[DEBUG] login_from success: #{@user.inspect}"
    # else
    #   begin
    #     access_token = get_access_token(provider)
    #     email = access_token[:info][:email]
    #     uid   = access_token[:uid]

    #     @user = User.find_by(email: email)

    #     if @user
    #       @user.authentications.create(provider: provider, uid: uid)
    #     else
    #       @user = create_from(provider)
    #     end

    #     reset_session
    #     auto_login(@user)
    #     redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"

    #   rescue ActiveRecord::RecordNotUnique
    #     flash[:alert] = "すでに同じメールアドレスが登録されています。別のログイン方法を試してください。"
    #     redirect_to root_path
    #   end
    # end

    # Rails.logger.debug "[DEBUG] session[:user_id] = #{session[:user_id]}"
    # redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
  # rescue => e
  #   Rails.logger.error "[ERROR] OAuth login failed: #{e.class} - #{e.message}"
  #   redirect_to root_path, alert: "#{provider.titleize}でのログインに失敗しました"
  # end

  # def callback
  #   provider = auth_params[:provider]
  #   # 既存のユーザーをプロバイダ情報を元に検索し、存在すればログイン
  #   if (@user = login_from(provider))
  #     redirect_to root_path, notice:"#{provider.titleize}アカウントでログインしました"
  #   else
  #     begin
  #       # ユーザーが存在しない場合はプロバイダ情報を元に新規ユーザーを作成し、ログイン
  #       signup_and_login(provider)
  #       redirect_to root_path, notice:"#{provider.titleize}アカウントでログインしました"
  #     rescue
  #       redirect_to root_path, alert:"#{provider.titleize}アカウントでのログインに失敗しました"
  #     end
  #   end
  # end

  # private

  # def auth_params
  #   params.permit(:code, :provider)
  # end

  # def signup_and_login(provider)
  #   @user = create_from(provider)
  #   reset_session
  #   auto_login(@user)
  end
end
