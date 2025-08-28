class MakeChallengeUserOptional < ActiveRecord::Migration[7.2]
  def change
    change_column_null :challenges, :user_id, true
  end
end
