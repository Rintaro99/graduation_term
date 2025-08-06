module Api
  class UsersController < BaseController
    def index
      Rails.logger.debug "[DEBUG] UsersController#index called"
      render json: User.all
    end
  end
end
