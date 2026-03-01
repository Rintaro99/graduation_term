class CreateUserSymbols < ActiveRecord::Migration[7.2]
  def change
    create_table :user_symbols do |t|
      t.references :user, null: false, foreign_key: true
      t.references :achievement_symbol, null: false, foreign_key: true

      t.timestamps
    end
  end
end
