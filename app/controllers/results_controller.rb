class ResultsController < ApplicationController
  def show
    flash.discard(:alert) # ✅ alertだけ消す

    session[:answered_questions] ||= []
    session[:correct_questions] ||= []

    @answered_count = session[:answered_questions].count
    @correct_count = session[:correct_questions].count
    @total_questions = Question.count

    @all_answered = @answered_count == @total_questions
  end

  def reset
    # sessionリセット
    session[:answered_questions] = []
    redirect_to quiz_path, notice: "クイズをリセットしました！"
  end
end
