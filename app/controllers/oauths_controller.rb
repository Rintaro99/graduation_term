class OauthsController < ApplicationController
  skip_before_action :require_login

  # include Sorcery::Controller::Submodules::External

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
    Rails.logger.debug "[DEBUG] === callback called for #{provider} ==="

    # begin
    #   access_token = get_access_token(provider)
    #   Rails.logger.debug "[DEBUG] access_token.uid = #{access_token.uid}"
    #   Rails.logger.debug "[DEBUG] access_token.info.email = #{access_token.info.email}"
    # rescue => e
    #   Rails.logger.error "[ERROR] get_access_token failed: #{e.class} - #{e.message}"
    #   redirect_to root_path, alert: "#{provider.titleize}の認証に失敗しました"
    #   return
    # end
    # access_token = get_access_token(provider)

    # Rails.logger.debug "[DEBUG] access_token = #{access_token.inspect}"
    # Rails.logger.debug "[DEBUG] access_token.uid = #{access_token&.uid}"
    # Rails.logger.debug "[DEBUG] access_token.info.email = #{access_token&.info&.email}"
    # Rails.logger.debug "[DEBUG] access_token.raw_info = #{access_token&.raw_info&.inspect}"

    if @user = login_from(provider)
      auto_login(@user)
      redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    else
      access_token = get_access_token(provider)
      email = access_token.info.email
      uid   = access_token.uid
      
      @user = User.find_by(email: email)

      if @user
        @user.authentications.find_or_creat_by(provider: provider, uid: uid)
      else
        @user = create_from(provider)
      end
        # reset_session
        auto_login(@user)
        redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
    end
    rescue StandardError => e
      Rails.logger.error "[ERROR] create_from failed: #{e.class} - #{e.message}"
      redirect_to root_path, alert: "#{provider.titleize}でのログインに失敗しました"
    end
  end
end
