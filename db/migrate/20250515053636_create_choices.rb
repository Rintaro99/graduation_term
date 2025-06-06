class CreateChoices < ActiveRecord::Migration[7.2]
  def change
    create_table :choices do |t|
      t.references :question, null: false, foreign_key: true
      t.string :content
      t.boolean :is_correct

      t.timestamps
    end
  end
end
