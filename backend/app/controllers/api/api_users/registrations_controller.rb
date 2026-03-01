# frozen_string_literal: true

module Api
  module ApiUsers
    class RegistrationsController < Devise::RegistrationsController
      skip_before_action :verify_authenticity_token
      # skip_before_action :authenticate_api_user!, only: [:create]
      # before_action :configure_permitted_parameters, only: [:create, :update]

      respond_to :json

      private

      def sign_up_params
        params.require(:api_user).permit(:name, :email, :password, :password_confirmation)
      end

      def account_update_params
        params.require(:api_user).permit(:name, :email, :password, :password_confirmation)
      end

      # 新規登録や更新のレスポンス
      def respond_with(resource, _opts = {})
        if resource.persisted?
          render json: {
            message: "ユーザー登録に成功しました。",
            user: resource
          }, status: :ok
        else
          render json: {
            message: "ユーザー登録に失敗しました。",
            errors: resource.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      # 退会（アカウント削除）時のレスポンス
      def respond_to_on_destroy
        render json: { message: "退会しました" }, status: :ok
      end

      # def configure_permitted_parameters
      #   devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :password, :password_confirmation])
      #   devise_parameter_sanitizer.permit(:account_update, keys: [:name, :email, :password, :password_confirmation])
      # end
    end
  end
end
