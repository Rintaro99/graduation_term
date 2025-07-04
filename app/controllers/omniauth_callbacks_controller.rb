class OmniauthCallbacksController < ApplicationController
    # def generic
    #     provider_name = request.env['omniauth.auth'].provider
    #     handle_auth provider_name.titleize
    # end

    def google
        handle_auth "Google"
    end

    def twitter
        handle_auth "Twitter"
    end

    def facebook
        handle_auth "Facebook"
    end

    private

    def handle_auth(kind)
        auth = request.env["omniauth.auth"]

        user = User.find_or_create_by(provider: auth.provider, uid: auth.uid) do |u|
            u.name = auth.info.name
            u.email = auth.info.email
            u.password = SecureRandom.hex(10)
        end

        if user.persisted?
            session[:user_id] = user.id
            redirect_to root_path, notice: "#{kind}でログインしました"
        else
            redirect_to root_path, alert: "#{kind}でのログインに失敗しました"
        end
    end
end
