class AddAdminToApiUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :api_users, :admin, :boolean, default: false, null: false
  end
end
