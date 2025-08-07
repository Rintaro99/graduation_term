class Api::BaseController < ActionController::API
    # protect_from_forgery with: :null_session
    before_action :require_login_api

    private

    def not_authenticated
        render json: { error: 'ログインしてください' }, status: :unauthorized
    end

    def require_login_api
        unless logged_in?
            not_authenticated
        end
    end
end
