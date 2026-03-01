# frozen_string_literal: true

Rails.application.config.session_store :cookie_store, key: '_graduation_teram_session', secure: Rails.env.production?,
                                                      same_site: :lax
