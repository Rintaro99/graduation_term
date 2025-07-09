class PagesController < ApplicationController
  skip_before_action :require_login, only: [:privacy, :terms]

  def terms
  end

  def privacy
  end
end
