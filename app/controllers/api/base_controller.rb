class Api::BaseController < ActionController::API
  before_action :authenticate_api_user!

  # 任意: 401時のJSON整形を自前でやりたいときだけ rescue を使う
  rescue_from Warden::NotAuthenticated, with: :user_not_authenticated

  private
  def user_not_authenticated
    render json: { error: '認証されていません' }, status: :unauthorized
  end
end