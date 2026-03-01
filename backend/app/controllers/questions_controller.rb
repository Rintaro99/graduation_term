# frozen_string_literal: true

class QuestionsController < ApplicationController
  def show
    if params[:id] # ✅ /questions/:id にアクセスしたとき
      @question = Question.find(params[:id])
    else # ✅ /quiz にアクセスしたとき
      # session[:answered_questions] が nil なら空配列にする
      session[:answered_questions] ||= []
      # 出題していない問題の中からランダムに1問
      remaining_questions = Question.where.not(id: session[:answered_questions])

      if remaining_questions.exists?
        random_function = ActiveRecord::Base.connection.adapter_name.downcase.include?('mysql') ? 'RAND()' : 'RANDOM()'
        @question = remaining_questions.order(random_function).first
        # mysql用
        # @question = remaining_questions.order("RAND()").first
        # postgre用
        # @question = remaining_questions.order("RANDOM()").first
      else
        # 全問出題済み → 結果ページや終了画面へ
        redirect_to results_path, notice: '全ての問題が終了しました！'
      end
    end
  end
end
