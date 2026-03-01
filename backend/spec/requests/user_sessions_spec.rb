require 'rails_helper'

RSpec.describe "UserSessions", type: :request do
  let!(:user) { create(:user, email: "test@example.com", password: "password", password_confirmation: "password") }

  describe "POST /login" do
    it "正しい情報でログインできる" do
      post login_path, params: { user: { email: user.email, password: "password" } }
      expect(response).to redirect_to(userpage_path)
    end

    it "間違ったパスワードでログインできない" do
      post login_path, params: { user: { email: user.email, password: "wrong" } }
      expect(response.body).to include("パスワードが間違っています")
    end
  end

  describe "DELETE /logout" do
    it "ログイン済みのユーザーがログアウトできる" do
      post login_path, params: { user: { email: user.email, password: "password" } }
      delete logout_path
      expect(response).to redirect_to(root_path)
    end
  end
end
