require "sendgrid-ruby"
include SendGrid

class DeviseMailer < Devise::Mailer
  default from: ENV["MAILER_SENDER"]

  def reset_password_instructions(record, token, opts = {})
    from = Email.new(email: ENV["MAILER_SENDER"])
    to = Email.new(email: record.email)
    subject = "パスワードリセットのご案内"

    reset_link = edit_password_url(record, reset_password_token: token)

    content = Content.new(
      type: "text/plain",
      value: "以下のリンクからパスワードをリセットしてください:\n#{reset_link}"
    )

    mail = Mail.new(from, subject, to, content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    response = sg.client.mail._("send").post(request_body: mail.to_json)

    Rails.logger.info "SendGrid response: #{response.status_code}"
    response
  end
end
