class Api::BaseController < ActionController::API
  before_action :authenticate_api_user!

  # よくある例外をJSONで統一
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActionController::ParameterMissing, with: :render_bad_request
  # Warden例外が投げられた場合だけ捕まえる（環境差吸収）
  rescue_from Warden::NotAuthenticated, with: :render_unauthorized if defined?(Warden::NotAuthenticated)

  # 任意: 401時のJSON整形を自前でやりたいときだけ rescue を使う
  rescue_from Warden::NotAuthenticated, with: :user_not_authenticated

  private
  def user_not_authenticated
    render json: { error: "認証されていません" }, status: :unauthorized
  end

  def render_not_found(e)
    render json: { error: "not_found", message: e.message }, status: :not_found
  end

  def render_bad_request(e)
    render json: { error: "bad_request", message: e.message }, status: :bad_request
  end

  def render_unauthorized(_e)
    render json: { error: "unauthorized" }, status: :unauthorized
  end
end
