# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Results', type: :request do
  let!(:user) { create(:user, password: 'password') }
  let!(:question1) { create(:question) }
  let!(:question2) { create(:question) }

  before do
    # ログイン
    post login_path, params: {
      user: {
        email: user.email,
        password: 'password'
      }
    }

    # 正解・不正解の選択肢
    correct_choice = create(:choice, question: question1, is_correct: true)
    wrong_choice = create(:choice, question: question2, is_correct: false)

    # 回答を送信してセッションを構築
    post check_answer_path, params: { question_id: question1.id, choice_id: correct_choice.id }
    post check_answer_path, params: { question_id: question2.id, choice_id: wrong_choice.id }
  end

  it '成績ページが正しく表示される' do
    get results_path

    expect(response).to have_http_status(:success)
    expect(response.body).to include('出題済み問題数：2')
    expect(response.body).to include('正解数：1')
    expect(response.body).to include('お疲れ様でした！すべての問題を解きました🎉')
  end

  it '自己ベストが正しく保存される' do
    get results_path
    expect(user.challenges.maximum(:score)).to eq(1)
  end
end
