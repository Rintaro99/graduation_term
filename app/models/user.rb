class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :challenges
  has_many :user_symbols
  has_many :achievement_symbols, through: :user_symbols
  has_many :posts, dependent: :destroy

  # 仮想属性（フォームでの同意チェック用）
  attr_accessor :terms_of_service
  # 利用規約の同意が必須
  validates :terms_of_service, acceptance: { message: "に同意してください" }

  # validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  # validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password, presence: true, length: { minimum: 3 }, confirmation: true, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  validates :name, presence: true, length: { maximum: 255 }
  validates :email, presence: true, uniqueness: true

  validates :reset_password_token, uniqueness: true, allow_nil: true

  def best_score
    challenges.maximum(:score)
  end

  def update_symbols!
    return unless best_score

    # スコアを満たしているが、まだ持っていない称号だけ取得
    unlocked = AchievementSymbol.where("min_score <= ?", best_score)
    new_symbols = unlocked.where.not(id: achievement_symbol_ids)

    logger.debug "DEBUG: user best score = #{best_score}"
    logger.debug "DEBUG: unlocked symbols = #{unlocked.map(&:name)}"
    logger.debug "DEBUG: newly assigned symbols = #{new_symbols.map(&:name)}"

    new_symbols.each do |symbol|
      user_symbols.create!(achievement_symbol: symbol)
    end
  end

  def latest_symbol
    achievement_symbols.order(min_score: :desc).first
  end

  private

  def password_required?
    # new_record? || changes[:crypted_password].present? || reset_password_token.present?
    true
  end
end
