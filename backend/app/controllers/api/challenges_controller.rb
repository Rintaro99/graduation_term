# frozen_string_literal: true

module Api
  class ChallengesController < Api::BaseController
    before_action :authenticate_api_user!

    def create
      # スコア保存
      challenge = current_api_user.api_challenges.create!(score: params[:score])
      # スコアに応じた称号を判定
      symbol = AchievementSymbol.where('min_score <= ?', challenge.score)
                                .order(min_score: :desc)
                                .first
      if symbol
        current_best = current_api_user.achievement_symbols.order(min_score: :desc).first
        # より上位の称号なら更新
        if current_best.nil? || symbol.min_score > current_best.min_score
          current_api_user.user_symbols.create!(achievement_symbol: symbol)
        end
      end
      render json: {
        score: challenge.score,
        achievement: symbol&.name,
        symbol_img: symbol&.img
      }
    rescue StandardError => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end
