require 'rails_helper'

RSpec.describe "Questions", type: :request do
  let!(:question1) { create(:question) }
  let!(:question2) { create(:question) }

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
      get quiz_path, params: {}, session: { answered_questions: [question1.id, question2.id] }

      expect(response).to redirect_to(results_path)
    end
  end
end
