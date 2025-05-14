class HomeController < ApplicationController
  skip_before_action :require_login, only: %i[index new create top]

  def index; end

  def create; end

  def new; end

  def top; end
end
