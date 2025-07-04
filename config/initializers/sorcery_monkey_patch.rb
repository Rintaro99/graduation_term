module Sorcery
  module Controller
    module InstanceMethods
      private

      # 元のredirect_toをオーバーライド
      def redirect_to(url = {}, options = {})
        super(url, options.merge(allow_other_host: true))
      end
    end
  end
end
