class CustomDeviseMailer < Devise::Mailer
  default template_path: "custom_devise_mailer"

  def reset_password_instructions(record, token, opts = {})
    # Reactフロント用のURLに差し替え
    @token = token
    super(record, token, opts)
  end
end
