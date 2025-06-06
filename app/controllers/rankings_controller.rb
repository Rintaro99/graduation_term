class RankingsController < ApplicationController
  def index
    @users = User.joins(:challenges)
                #  .left_outer_joins(:challenges) #チャレンジが無い人も含める
                #  .select('users.*, COALESCE(SUM(challenges.score), 0) AS total_score') #合計スコアを計算（チャレンジがない人は0点）
                 .select('users.*, MAX(challenges.score) AS best_score')
                 .group('users.id') #ユーザーごとに集計
                 .order('best_score DESC') # スコアが高い順に並べる
                 .map { |u| u.define_singleton_method(:best_score) { self[:best_score] }; u }
  end
end
