class AddApiUserToUserSymbols < ActiveRecord::Migration[7.2]
  def change
    add_reference :user_symbols, :api_user, null: false, foreign_key: true
  end
end
