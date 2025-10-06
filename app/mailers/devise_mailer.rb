require "resend"

class DeviseMailer < Devise::Mailer
  default from: ENV["MAILER_SENDER"]

  def reset_password_instructions(record, token, opts = {})
    resend = Resend::Client.new(api_key: ENV["RESEND_API_KEY"])
    reset_link = edit_api_user_password_url(reset_password_token: token)

    Rails.logger.info "=== RESEND KEY START ==="
    Rails.logger.info ENV["RESEND_API_KEY"].inspect
    Rails.logger.info "=== RESEND KEY END ==="

    response = resend.emails.send({
      from: ENV["MAILER_SENDER"],
      to: record.email,
      subject: "パスワードリセットのご案内",
      html: <<~HTML
        <p>以下のリンクからパスワードをリセットしてください:</p>
        <p><a href="#{reset_link}">こちらをクリック</a></p>
      HTML
    })

    Rails.logger.info "Resend response: #{response.inspect}"
  end
end
