# frozen_string_literal: true

class CreateApiUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :api_users do |t|
      t.string :name # ← 追加
      t.string :email, null: false, default: '' # Devise必須
      t.string :encrypted_password, null: false, default: '' # Devise必須

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at

      # ここに他にも必要なDevise系カラムや追加したいフィールドがあれば追記

      t.timestamps null: false
    end

    add_index :api_users, :email, unique: true
    add_index :api_users, :reset_password_token, unique: true
    # add_index :api_users, :confirmation_token, unique: true # confirmableを使う場合
  end
end
