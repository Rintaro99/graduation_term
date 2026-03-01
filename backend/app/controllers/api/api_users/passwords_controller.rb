# frozen_string_literal: true

module Api
  module ApiUsers
    class PasswordsController < Api::BaseController
      skip_before_action :authenticate_api_user!, only: %i[create update]
      skip_before_action :verify_authenticity_token, raise: false
      respond_to :json

      wrap_parameters format: []
      # GET /resource/password/new
      # def new
      #   super
      # end

      # POST /api/api_users/password
      def create
        ApiUser.send_reset_password_instructions(email: params[:api_user][:email])
        render json: {
          message: 'パスワード再設定用のメールを送信しました。メールをご確認ください。'
        }, status: :ok
      rescue StandardError => e
        # 万が一の例外も安全なメッセージに統一
        Rails.logger.error "Password reset error: #{e.message}"
        render json: {
          message: 'パスワード再設定用のメールを送信しました。メールをご確認ください。'
        }, status: :ok
        # user = ApiUser.send_reset_password_instructions(resource_params)

        # if user.errors.empty?
        #   render json: { message: "リセット用のメールを送信しました。" }, status: :ok
        # else
        #   render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        # end
      end

      # GET /resource/password/edit?reset_password_token=abcdef
      # def edit
      #   super
      # end

      # PUT /resource/password
      def update
        Rails.logger.debug "RESET PARAMS: #{params.inspect}"
        Rails.logger.debug "RESET TOKEN (raw): #{params[:api_user][:reset_password_token]}"
        user = ApiUser.reset_password_by_token(resource_params)

        if user.errors.empty?
          user.unlock_access! if user.respond_to?(:unlock_access!) && user.unlock_access!
          render json: { message: 'パスワードを更新しました' }, status: :ok
        else
          Rails.logger.error "RESET ERRORS: #{user.errors.full_messages.inspect}"
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # protected

      # def after_resetting_password_path_for(resource)
      #   super(resource)
      # end

      # The path used after sending reset password instructions
      # def after_sending_reset_password_instructions_path_for(resource_name)
      #   super(resource_name)
      # end

      private

      def resource_params
        params.require(:api_user).permit(:email, :password, :password_confirmation, :reset_password_token)
      end
    end
  end
end
