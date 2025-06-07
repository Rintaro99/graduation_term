class ChallengesController < ApplicationController
  before_action :require_login

  def new; end

  def create
    answers = params[:answers]
    score = calculate_score(answers)
    current_user.challenges.create(score: score)
    redirect_to ranking_path, notice: "スコアを保存しました！"
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
