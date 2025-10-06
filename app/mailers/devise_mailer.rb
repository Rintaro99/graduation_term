require "resend"

class DeviseMailer < Devise::Mailer
  default from: ENV["MAILER_SENDER"]

  def reset_password_instructions(record, token, opts = {})
    Resend.api_key = ENV["RESEND_API_KEY"]  # ←ここがポイント！

    reset_link = edit_api_user_password_url(reset_password_token: token)

    Resend::Emails.send(
      from: ENV["MAILER_SENDER"],
      to: record.email,
      subject: "パスワードリセットのご案内",
      html: <<~HTML
        <p>以下のリンクからパスワードをリセットしてください:</p>
        <p><a href="#{reset_link}">こちらをクリック</a></p>
      HTML
    )
  end
end
