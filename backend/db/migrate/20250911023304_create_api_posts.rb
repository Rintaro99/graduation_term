class CreateApiPosts < ActiveRecord::Migration[7.2]
  def change
    create_table :api_posts do |t|
      t.string :title
      t.text :content
      t.references :api_user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
