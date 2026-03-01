# frozen_string_literal: true

class CustomDeviseMailer < Devise::Mailer
  default template_path: "custom_devise_mailer"

  def reset_password_instructions(record, token, opts = {})
    # 本番用にフロントのURLを指定
    @reset_password_url = if Rails.env.production?
                            "https://how-to-write-rin.vercel.app/reset-password?reset_password_token=#{token}"
    else
                            "http://localhost:5173/reset-password?reset_password_token=#{token}"
    end
    super(record, token, opts)
  end
end
