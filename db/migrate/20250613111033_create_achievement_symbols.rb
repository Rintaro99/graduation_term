class CreateAchievementSymbols < ActiveRecord::Migration[7.2]
  def change
    create_table :achievement_symbols do |t|
      t.string :name
      t.string :img

      t.timestamps
    end
  end
end
