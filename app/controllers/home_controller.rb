class HomeController < ApplicationController
  skip_before_action :require_login, only: %i[new create top]

  def create; end

  def new; end

  def top; end
end
