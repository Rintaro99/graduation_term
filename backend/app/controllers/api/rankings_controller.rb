class Api::RankingsController < Api::BaseController
  def index
    # 各ユーザーの最高スコアを集計
    users_with_scores = ApiUser
      .select("api_users.id, api_users.name, MAX(api_challenges.score) AS best_score")
      .joins(:api_challenges)
      .group("api_users.id")
      .order(Arel.sql("MAX(api_challenges.score) DESC"))

    # 上位10名
    top_users = users_with_scores.limit(10)

    # 自分の順位
    user_ids = users_with_scores.pluck(:id)
    my_rank = user_ids.index(current_api_user&.id)&.+(1)

    my_entry = users_with_scores.find_by(id: current_api_user.id)
    my_best_score = my_entry&.best_score

    render json: {
      top_users: top_users.map { |u|
        latest_symbol = u.user_symbols.last&.achievement_symbol
        {
          name: u.name,
          score: u.best_score,
          title: latest_symbol&.name,        # 称号名
          symbol_url: latest_symbol&.img # シンボル画像URL
        }
      },
      my_rank: my_rank,
      my_score: my_best_score,
      my_name: current_api_user.name
    }
  end
end
