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
      reset_session
      auto_login(@user)
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
      return
    end

    # アクセストークンとユーザーデータを取得
    access_token = get_access_token(provider)
    email = access_token.info.email
    uid   = access_token.uid

    # メールでユーザー確認
    if (user = User.find_by(email: email))
      user.authentications.find_or_create_by(provider: provider, uid: uid)
      reset_session
      auto_login(user)
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    else
      # 4. 新規作成
      @user = create_from(provider)
      reset_session
      auto_login(@user)
      redirect_to userpage_path, notice: "#{provider.titleize}で新規登録しました"
    end
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end
end
