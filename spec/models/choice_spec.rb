require 'rails_helper'

RSpec.describe Choice, type: :model do
  describe 'バリデーション' do
    it 'contentが空だと無効' do
      choice = build(:choice, content: nil)
      choice.validate
      expect(choice.errors[:content]).to include("を入力してください")
    end
  end

  describe '関連付け' do
    it 'questionに属している' do
      choice = create(:choice)
      expect(choice.question).to be_present
    end
  end
end
