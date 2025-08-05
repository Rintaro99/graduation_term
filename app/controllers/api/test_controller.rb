class Api::TestController < ApplicationController
  def index
    render json: { message: 'CORS OK!' }
  end
end