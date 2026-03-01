# frozen_string_literal: true

class AddApiUserToChallenges < ActiveRecord::Migration[7.2]
  def change
    add_reference :challenges, :api_user, null: false, foreign_key: true
  end
end
