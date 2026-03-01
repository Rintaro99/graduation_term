# frozen_string_literal: true

class CreateApiChallenges < ActiveRecord::Migration[7.2]
  def change
    create_table :api_challenges do |t|
      t.references :api_user, null: false, foreign_key: true
      t.integer :score

      t.timestamps
    end
  end
end
