Rails.logger.info "[OmniAuth Init] ENV['GOOGLE_CLIENT_ID'] = #{ENV['GOOGLE_CLIENT_ID'].present? ? 'present' : 'nil'}"
Rails.logger.info "[OmniAuth Init] initializer loaded!"

if ENV['GOOGLE_CLIENT_ID'].present? && ENV['GOOGLE_CLIENT_SECRET'].present?
  Rails.application.config.middleware.use OmniAuth::Builder do
    provider :google_oauth2, ENV['GOOGLE_CLIENT_ID'], ENV['GOOGLE_CLIENT_SECRET']
  end
  Rails.logger.info "[OmniAuth Init] OmniAuth::Builder loaded!"
else
  Rails.logger.warn "[OmniAuth Init] ENV not loaded properly."
end
