class ChallengesController < ApplicationController
  before_action :require_login

  def new; end

  def create
    # 仮にスコアを受け取って保存する
    score = params[:score].to_i
    current_user.challenges.create(score: score)
    redirect_to ranking_path, notice: "スコアを保存しました！"
  end
end
