require "resend"

class DeviseMailer < Devise::Mailer
  default from: ENV["MAILER_SENDER"]

  def reset_password_instructions(record, token, opts = {})
    Resend.api_key = ENV["RESEND_API_KEY"]

    reset_link = edit_api_user_password_url(reset_password_token: token)

    Resend::Emails.send({
      from: ENV["MAILER_SENDER"],
      to: record.email,
      subject: "パスワードリセットのご案内",
      html: <<~HTML
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color:#fafafa; padding:24px;">
          <h2 style="color:#333;">パスワードリセットのご案内 </h2>
          <p>こんにちは、#{record.name} さん。</p>
          <p>以下のボタンをクリックして、新しいパスワードを設定してください。</p>
          <a href="#{reset_link}" 
            style="display:inline-block; background:#1a73e8; color:#fff; padding:10px 20px; text-decoration:none; border-radius:4px;">
            パスワードをリセットする
          </a>
          <p style="margin-top:16px; font-size:12px; color:#777;">
            このメールに心当たりがない場合は、何も行わず削除してください。
          </p>
          <p style="font-size:12px; color:#aaa;">© 2025 How To Write Rin</p>
        </div>
      HTML
    })
  end
end
