class CreateApiPostFavorites < ActiveRecord::Migration[7.2]
  def change
    create_table :api_post_favorites do |t|
      t.references :api_user, null: false, foreign_key: true
      t.references :api_post, null: false, foreign_key: true

      t.timestamps
    end
    # 同じ組み合わせは1回しか登録できないようにする
    add_index :api_post_favorites, [:api_user_id, :api_post_id], unique: true
  end
end
