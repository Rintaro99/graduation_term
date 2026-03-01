class DropLegacyWebTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :authentications, if_exists: true
    drop_table :posts, if_exists: true
    drop_table :challenges, if_exists: true
    drop_table :users, if_exists: true
  end
end
