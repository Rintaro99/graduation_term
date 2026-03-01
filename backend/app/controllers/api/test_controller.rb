# frozen_string_literal: true

module Api
  class TestController < ApplicationController
    def index
      render json: { message: "CORS OK!" }
    end
  end
end
