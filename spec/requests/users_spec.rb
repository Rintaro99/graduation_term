require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "POST /users" do
    context "有効なパラメータの場合" do
      it "ユーザー登録に成功し、リダイレクトされる" do
        post users_path, params: {
          user: {
            name: "新規ユーザー",
            email: "new@example.com",
            password: "password",
            password_confirmation: "password"
          }
        }

        expect(response).to redirect_to(root_path)
        follow_redirect!
        expect(response.body).to include("ログイン") # topページなどで確認できる文言に合わせてOK
      end
    end

    context "無効なパラメータ（nameが空）の場合" do
      it "ユーザー登録に失敗し、newテンプレートが再描画される" do
        post users_path, params: {
          user: {
            name: "",
            email: "invalid@example.com",
            password: "password",
            password_confirmation: "password"
          }
        }

        expect(response).to have_http_status(:ok) # renderされてる（200）
        expect(response.body).to include("を入力してください") # nameのバリデーションメッセージ
      end
    end

    context "パスワード確認が一致しない場合" do
      it "ユーザー登録に失敗する" do
        post users_path, params: {
          user: {
            name: "不一致ユーザー",
            email: "fail@example.com",
            password: "password",
            password_confirmation: "wrong"
          }
        }

        expect(response.body).to include("パスワード（確認用）とパスワードの入力が一致しません")
      end
    end
  end

  describe "PATCH /users/:id" do
    let!(:user) do
      create(:user, name: "旧名前", email: "old@example.com", password: "password", password_confirmation: "password")
    end

    before do
      # ログイン処理
      post login_path, params: {
        user: { email: user.email, password: "password" }
      }
    end

    context "有効なデータを送った場合" do
      it "ユーザー名が更新され、マイページにリダイレクトされる" do
        patch mypage_path, params: {
          user: { name: "新しい名前" }
        }

        expect(response).to redirect_to(mypage_path)
        expect(flash[:notice]).to eq("更新しました")
        expect(response).to redirect_to(mypage_path)

        user.reload
        expect(user.name).to eq("新しい名前")
      end
    end

    # context "無効なデータ（名前が空）を送った場合" do
    #   it "ユーザー情報は更新されず、マイページが再描画される" do
    #     patch mypage_path, params: { user: { name: "" } }

    #     expect(response).to have_http_status(:ok)
    #     expect(response.body).to include("ニックネーム変更") # マイページであることの確認

    #     # エラーメッセージ文言を直接チェック（バリデーション失敗時に表示される内容）
    #     expect(response.body).to include("名前") # "名前を入力してください" などの一部だけ確認
    #   end
    # end
  end
end
