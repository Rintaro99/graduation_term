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
    Rails.logger.debug "[DEBUG] === CALLBACK for #{provider} ==="

    begin
      if @user = login_from(provider)
        auto_login(@user)
        Rails.logger.debug "[DEBUG] session[:user_id] = #{session[:user_id]}"  # ←ここ！
        redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
        Rails.logger.debug "[DEBUG] login_from success: #{@user.inspect}"
      else
        access_token = get_access_token(provider)
        email = access_token.info.email
        uid   = access_token.uid

        @user = User.find_by(email: email)

        if @user
          @user.authentications.find_or_create_by(provider: provider, uid: uid)
        else
          @user = create_from(provider)
        end

        auto_login(@user)
        Rails.logger.debug "[DEBUG] session[:user_id] = #{session[:user_id]}"  # ←ここ！
        redirect_to userpage_path, notice: "#{provider.titleize}でログインしました"
      end
    rescue => e
      Rails.logger.error "[ERROR] OAuth login failed: #{e.class} - #{e.message}"
      redirect_to root_path, alert: "#{provider.titleize}でのログインに失敗しました"
    end
  end

end
