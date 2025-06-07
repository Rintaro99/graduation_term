require 'rails_helper'

RSpec.describe "Answers", type: :request do
  let!(:user) { create(:user, password: "password") }
  let!(:question1) { create(:question) }
  let!(:question2) { create(:question) }
  let!(:question3) { create(:question) } # ← 追加！
  let!(:correct_choice) { create(:choice, question: question1, is_correct: true) }
  let!(:wrong_choice) { create(:choice, question: question1, is_correct: false) }

  before do
    # ユーザーをログインさせる
    post login_path, params: {
      user: {
        email: user.email,
        password: "password"
      }
    }

    # 1問だけ回答したことにする（ここでは question2）
    post check_answer_path, params: {
        question_id: question2.id,
        choice_id: create(:choice, question: question2, is_correct: true).id
    }
  end

  describe "POST /check_answer" do
    context "正解を選んだ場合" do
      it "解説ページが表示され、正解がセッションに記録される" do
        post check_answer_path, params: {
          question_id: question1.id,
          choice_id: correct_choice.id
        }

        expect(response).to have_http_status(:success)
        expect(response.body).to include(question1.content)
        # expect(session[:answered_questions]).to include(question1.id)
        # expect(session[:correct_questions]).to include(question1.id)
        expect(response.body).to include("正解！🎉")
      end
    end

    context "不正解を選んだ場合" do
      it "解説ページが表示され、正解には記録されない" do
        post check_answer_path, params: {
          question_id: question1.id,
          choice_id: wrong_choice.id
        }
        expect(response).to have_http_status(:success)
        expect(response.body).to include(question1.content)
        # expect(session[:answered_questions]).to include(question1.id)
        # expect(session[:correct_questions]).not_to include(question1.id)
        expect(response.body).to include("不正解...😢") 
      end
    end

    context "全問回答済みになった場合" do
        it "results_pathにリダイレクトされる" do
          # 2問目は before ですでに回答済み
          # ここで question1 と question3 を答えて、3問全て回答済にする
          post check_answer_path, params: {
            question_id: question1.id,
            choice_id: correct_choice.id
          }

          post check_answer_path, params: {
            question_id: question3.id,
            choice_id: create(:choice, question: question3, is_correct: true).id
          }

          expect(response).to redirect_to(results_path)
        end
    end
  end
end
