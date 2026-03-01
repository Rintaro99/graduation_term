require 'rails_helper'

RSpec.describe "Ranking", type: :request do
  let!(:user1) { create(:user) }
  let!(:user2) { create(:user) }

  before do
    # ログイン処理
    post login_path, params: { user: { email: user1.email, password: "password" } }
    # ダミーデータ作成
    user1.challenges.create(score: 3)
    user1.challenges.create(score: 7)
    user2.challenges.create(score: 5)
  end

  it "正しくランキングを集計できる" do
    get ranking_path

    expect(response).to have_http_status(:success)
    expect(response.body).to include(user1.name)
    expect(response.body).to include(user2.name)

    # user1 の最高スコアが正しく反映されてるか
    expect(response.body).to include("7 点")
    expect(response.body).to include("5 点")
  end

  it "自己ベスト未満なら保存しない" do
    # クイズを2問用意
    question1 = create(:question)
    question2 = create(:question)
    # 選択肢（正解1問＋不正解1問）
    correct_choice = create(:choice, question: question1, is_correct: true)
    wrong_choice   = create(:choice, question: question2, is_correct: false)
    # ログイン
    post login_path, params: { user: { email: user1.email, password: "password" } }
    # 回答送信（セッションが自然に作られる）
    post check_answer_path, params: { question_id: question1.id, choice_id: correct_choice.id }
    post check_answer_path, params: { question_id: question2.id, choice_id: wrong_choice.id }
    # 成績ページにアクセス（保存処理が走る）
    get results_path
    # 自己ベストは7のまま更新されていないことを確認
    expect(user1.challenges.maximum(:score)).to eq(7)
    expect(user1.challenges.count).to eq(2)
  end
end
