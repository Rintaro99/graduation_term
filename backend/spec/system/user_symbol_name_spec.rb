require 'rails_helper'

RSpec.describe "称号の表示", type: :system do
  let!(:user) { create(:user, password: "password") }
  let!(:symbol1) { create(:achievement_symbol, name: "臥麟嘗胆", min_score: 0) }

  before do
    visit login_path
    fill_in "メールアドレス", with: user.email
    fill_in "パスワード", with: "password"
    click_button "ログイン"

    create(:challenge, user: user, score: 2)
    user.reload
    user.update_symbols!

    # リザルトページにアクセス（ここで update_symbols! が呼ばれる）
    visit results_path
  end

  it "マイページに最新の称号が表示される" do
    pending "称号表示のテストは後で再検討"
    user.reload
    visit mypage_path

    expect(page).to have_content("臥麟嘗胆")
  end
end
