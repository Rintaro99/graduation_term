class AddMinScoreToAchievementSymbols < ActiveRecord::Migration[7.2]
  def change
    add_column :achievement_symbols, :min_score, :integer
  end
end
