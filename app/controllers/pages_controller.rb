class PagesController < ApplicationController
  skip_before_action :require_login, only: [:privacy]

  def terms
  end

  def privacy
  end
end
