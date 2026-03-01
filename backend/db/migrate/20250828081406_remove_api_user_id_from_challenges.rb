# frozen_string_literal: true

class RemoveApiUserIdFromChallenges < ActiveRecord::Migration[7.2]
  def change
    remove_reference :challenges, :api_user, foreign_key: true
  end
end
