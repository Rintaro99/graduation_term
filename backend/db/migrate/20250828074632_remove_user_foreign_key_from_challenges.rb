# frozen_string_literal: true

class RemoveUserForeignKeyFromChallenges < ActiveRecord::Migration[7.2]
  def change
    remove_foreign_key :challenges, :users
  end
end
