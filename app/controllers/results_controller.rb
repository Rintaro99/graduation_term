class ResultsController < ApplicationController
  def show
    flash.discard(:alert) # ✅ alertだけ消す

    session[:answered_questions] ||= []
    session[:correct_questions] ||= []
    session[:answers] ||= {}

    @answered_count = session[:answered_questions].count
    @total_questions = Question.count
    @all_answered = @answered_count == @total_questions

    unless session[:scored]
      correct_count = calculate_score(session[:answers])
      current_user.challenges.create(score: correct_count)
      session[:scored] = true  # 二重保存防止のフラグ

      logger.debug "DEBUG: session[:answers] = #{session[:answers].inspect}"

    end

    @score = calculate_score(session[:answers]) # 表示用
  end

  def reset
    # sessionリセット
    session[:answered_questions] = []
    session[:correct_questions] = []
    session[:answers] = {}
    session[:scored] = false
    redirect_to quiz_path, notice: "クイズをリセットしました！"
  end

  private

  def calculate_score(answers)
    correct_count = 0

    answers.each do |question_id, choice_id|
      choice = Choice.find(choice_id)
      correct_count += 1 if choice.is_correct
    end

    correct_count
  end
end
