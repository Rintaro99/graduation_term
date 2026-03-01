class CustomDeviseMailer < Devise::Mailer
  default template_path: "custom_devise_mailer"

  def reset_password_instructions(record, token, opts = {})
    # 本番用にフロントのURLを指定
    if Rails.env.production?
      @reset_password_url = "https://how-to-write-rin.vercel.app/reset-password?reset_password_token=#{token}"
    else
      @reset_password_url = "http://localhost:5173/reset-password?reset_password_token=#{token}"
    end
    super(record, token, opts)
  end
end
