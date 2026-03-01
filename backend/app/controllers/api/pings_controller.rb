module Api
  class PingsController < Api::BaseController
    before_action :authenticate_api_user!

    def index
      render json: { message: "ログイン中のユーザーのみ見れる情報です！", user: current_api_user }
    end
  end
end
