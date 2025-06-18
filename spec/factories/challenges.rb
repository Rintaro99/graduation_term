FactoryBot.define do
  factory :challenge do
    association :user
    score { 1 } # デフォルトスコア（必要に応じてオーバーライド可）
  end
end
