require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it '有効なユーザーは登録できる' do
      user = build(:user)
      expect(user).to be_valid
    end

    it 'nameが空だと無効' do
      user = build(:user, name: nil)
      user.validate
      expect(user.errors[:name]).to include("を入力してください")
    end

    it 'passwordとpassword_confirmationが一致しないと無効' do
      user = build(:user, password_confirmation: 'mismatch')
      user.validate
      expect(user.errors[:password_confirmation]).to include("とパスワードの入力が一致しません")
    end
  end
end
