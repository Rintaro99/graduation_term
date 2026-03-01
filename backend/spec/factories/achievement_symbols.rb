FactoryBot.define do
  factory :achievement_symbol do
    name { "臥麟嘗胆" }
    min_score { 2 }
    img { "symbols/臥麟嘗胆.png" } # 実際のカラムに合わせて変更してください
  end
end
