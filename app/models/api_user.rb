class ApiUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :api_challenges, dependent: :destroy, inverse_of: :api_user
  has_many :user_symbols, dependent: :destroy
  has_many :achievement_symbols, through: :user_symbols

  # 称号（スコアに応じて一番高いもの）
  def achievement_title
    score = api_challenges.maximum(:score) || 0
    symbol = AchievementSymbol.where("min_score <= ?", score).order(min_score: :desc).first
    symbol&.title # なければ nil
  end
end
