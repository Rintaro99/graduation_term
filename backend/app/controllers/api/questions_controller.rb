# frozen_string_literal: true

module Api
  class QuestionsController < Api::BaseController
    def index
      questions = Question.includes(:choices)
      render json: questions.as_json(include: :choices)
    end

    def show
      question = Question.includes(:choices).find(params[:id])
      render json: question.as_json(include: :choices)
    end

    def random
      random_function = ActiveRecord::Base.connection.adapter_name.downcase.include?('mysql') ? 'RAND()' : 'RANDOM()'
      question = Question.order(Arel.sql(random_function)).first
      render json: question.as_json(include: :choices)
    end
  end
end
