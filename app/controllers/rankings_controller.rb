class RankingsController < ApplicationController
  def index
    @users = User.left_outer_joins(:challenges) #チャレンジが無い人も含める
                 .select('users.*, COALESCE(SUM(challenges.score), 0) AS total_score') #合計スコアを計算（チャレンジがない人は0点）
                 .group('users.id') #ユーザーごとに集計
                 .order('total_score DESC') # スコアが高い順に並べる
  end
end
