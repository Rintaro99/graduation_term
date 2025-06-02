require 'rails_helper'

RSpec.describe "Questions", type: :request do
  let!(:user) { create(:user, password: "password") }  # ユーザー追加
  let!(:question1) { create(:question) }
  let!(:question2) { create(:question) }

  before do
    # ログイン処理を事前に入れる
    post login_path, params: { user: { email: user.email, password: "password" } }
  end

  describe "GET /questions/:id" do
    it "問題詳細が表示される" do
      get question_path(question1)
      expect(response).to have_http_status(:success)
      expect(response.body).to include(question1.content)
    end
  end

  describe "GET /quiz" do
    it "未出題の問題が出題される" do
      get quiz_path
      expect(response).to have_http_status(:success)
    end

    it "全問出題済みの場合は結果画面にリダイレクトされる" do
      # すべて出題済みとして設定
      # ここは実際に session を作る代わりに事前に全問回答しておく
      # 1問目正解
      post check_answer_path, params: { question_id: question1.id, choice_id: create(:choice, question: question1, is_correct: true).id }
      # 2問目正解
      post check_answer_path, params: { question_id: question2.id, choice_id: create(:choice, question: question2, is_correct: true).id }

      # これで全問回答済みになっている
      get quiz_path
      expect(response).to redirect_to(results_path)
    end
  end
end
