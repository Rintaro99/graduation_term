# frozen_string_literal: true
module Api
  module ApiUsers
    class SessionsController < Devise::SessionsController
      skip_before_action :require_login, only: [:create, :destroy] 
      skip_before_action :verify_authenticity_token
      before_action :configure_sign_in_params, only: [:create]

      respond_to :json

      private

      # ログイン成功時のレスポンス
      def respond_with(resource, _opts = {})
        token = request.env['warden-jwt_auth.token']
        render json: {
          status: { code: 200, message: 'Logged in successfully.' },
          token: token,
          data: {
            id: resource.id,
            email: resource.email,
            name: resource.name
          }
        }, status: :ok
      end

      # ログアウト時のレスポンス
      def respond_to_on_destroy
        head :no_content
      end

      private

      def configure_sign_in_params
        devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
      end
      
      # before_action :configure_sign_in_params, only: [:create]

      # GET /resource/sign_in
      # def new
      #   super
      # end

      # POST /resource/sign_in
      # def create
      #   super
      # end

      # DELETE /resource/sign_out
      # def destroy
      #   super
      # end

      # protected

      # If you have extra params to permit, append them to the sanitizer.
      # def configure_sign_in_params
      #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
      # end
    end
  end
end
