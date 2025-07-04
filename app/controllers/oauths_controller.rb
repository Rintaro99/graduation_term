class OauthsController < ApplicationController
    skip_before_action :require_login

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
    provider = params[:provider]

    if @user = login_from(provider)
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    else
      begin
        @user = create_from(provider)
        reset_session
        auto_login(@user)
        Rails.logger.debug "[DEBUG] after auto_login: current_user=#{current_user.inspect}"
        redirect_to root_path, notice: "#{provider.titleize}で新規登録しました"
      rescue StandardError => e
        logger.error "[OauthsController#callback] #{e.message}"
        redirect_to root_path, alert: "#{provider.titleize}でのログインに失敗しました"
      end
    end
  end
end
