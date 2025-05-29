FactoryBot.define do
  factory :choice do
    content { "東京" }
    question  # 自動的に関連付け
  end
end
