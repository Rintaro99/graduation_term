class ResultsController < ApplicationController
  def show
    flash.discard(:alert) # ✅ alertだけ消す

    session[:answered_questions] ||= []
    session[:correct_questions] ||= []
    session[:answers] ||= {}
    session[:scored] = false

    @answered_count = session[:answered_questions].count
    @total_questions = Question.count
    @all_answered = @answered_count == @total_questions

    unless session[:scored]
      correct_count = calculate_score(session[:answers])
      # current_user.challenges.create(score: correct_count)
      # session[:scored] = true  # 二重保存防止のフラグ
      if current_user.present?
      # ユーザーの現在の最高スコアを取得
        best_score = current_user.challenges.maximum(:score) || 0
      # 新しいスコアが自己ベストなら保存
        if correct_count > best_score
          current_user.challenges.create(score: correct_count)
          current_user.update_symbols!
        end
      end

      session[:scored] = true
      logger.debug "DEBUG: session[:answers] = #{session[:answers].inspect}"
    end

    @correct_count = calculate_score(session[:answers]) # 表示用

    current_user.update_symbols! if current_user
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
