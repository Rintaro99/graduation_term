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
    access_token = get_access_token(provider)

    Rails.logger.debug "[DEBUG] access_token.uid = #{access_token.uid}"
    Rails.logger.debug "[DEBUG] access_token.info.email = #{access_token.info.email}"

    if @user = login_from(provider)
      Rails.logger.debug "[DEBUG] login_from success: #{@user.inspect}"
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    else
      begin
        @user = create_from(provider)
        Rails.logger.debug "[DEBUG] access_token.uid = #{access_token.uid}"
        Rails.logger.debug "[DEBUG] access_token.info.email = #{access_token.info.email}"
        Rails.logger.debug "[DEBUG] access_token.raw_info = #{access_token.raw_info.inspect}"
        reset_session
        auto_login(@user)
        redirect_to userpage_path, notice: "#{provider.titleize}で新規登録しました"
      rescue StandardError => e
        logger.error "[OauthsController#callback] #{e.message}"
        logger.error "[OauthsController#callback] #{e.message}"
        redirect_to root_path, alert: "#{provider.titleize}でのログインに失敗しました"
      end
    end
  end
end
