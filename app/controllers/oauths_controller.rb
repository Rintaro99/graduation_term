class OauthsController < ApplicationController
  skip_before_action :require_login
  include Sorcery::Controller::Submodules::External

  def oauth
    login_at(params[:provider])
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

    begin
      # create_fromでユーザー作成（内部でtokenも取得）
      @user = create_from(provider)
      reset_session
      auto_login(@user)
      redirect_to userpage_path, notice: "#{provider.titleize}で新規登録しました"
    rescue ActiveRecord::RecordNotUnique
      flash[:alert] = "すでにこのメールアドレスが登録されています。別の方法でログインしてください。"
      redirect_to root_path
    end
  end

  private

  def auth_params
    params.permit(:code, :provider)
  end
end
