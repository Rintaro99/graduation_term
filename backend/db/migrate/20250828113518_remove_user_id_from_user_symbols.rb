class RemoveUserIdFromUserSymbols < ActiveRecord::Migration[7.2]
  def change
    remove_reference :user_symbols, :user, null: false, foreign_key: true
  end
end
