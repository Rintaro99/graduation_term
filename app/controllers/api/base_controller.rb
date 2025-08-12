class Api::BaseController < ActionController::API
    before_action :authenticate_api_user! 

    private

    def unauthorized_response
        render json: { error: '認証に失敗しました' }, status: :unauthorized
    end
end
