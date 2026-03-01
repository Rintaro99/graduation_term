# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# =====================================================================================
#  称号、問題、選択肢
# =====================================================================================

puts "🌱 Seeding started..."

# ===== 称号（AchievementSymbol） =====
AchievementSymbol.find_or_create_by!(name: "臥麟嘗胆") do |s|
  s.min_score = 2
  s.img = "symbols/gashinshotan.png"
end

AchievementSymbol.find_or_create_by!(name: "麟進月歩") do |s|
  s.min_score = 4
  s.img = "symbols/rinshingeppo.png"
end

AchievementSymbol.find_or_create_by!(name: "鳳毛麟角") do |s|
  s.min_score = 6
  s.img = "symbols/homorinkaku.png"
end

 AchievementSymbol.find_or_create_by!(name: "威風麟々") do |s|
  s.min_score = 8
  s.img = "symbols/ifurinrin.png"
 end

AchievementSymbol.find_or_create_by!(name: "天下無麟") do |s|
  s.min_score = 10
  s.img = "symbols/tenkamurin.png"
end

puts "✅ 称号作成完了"

# ===== 問題（Question） =====
q1 = Question.find_or_create_by!(content: "「麟」の画数は？") do |q|
  q.explanation = "24画です。"
end

q2 = Question.find_or_create_by!(content: "幼名では通称「麟太郎」という名前で呼ばれていた歴史上の人物は次のうち誰か") do |q|
  q.explanation = "幼名および通称は麟太郎（りんたろう）。諱は義邦（よしくに）。明治維新後は安芳（やすよし）と改名。海舟は号で、佐久間象山直筆の書「海舟書屋」からとったもの。"
end

q3 = Question.find_or_create_by!(content: "問題の作者がこの名前で実際に困ったこととして、当てはまらないものは次のうちどれか") do |q|
  q.explanation = "習字は名前のせいで5回は書き直してた。"
end

q4 = Question.find_or_create_by!(content: "「麟」の字の花押(自署の代わりに用いられる記号もしくは符合)を使っていたとされる武将は次のうち誰か。") do |q|
  q.explanation = "この花押は中国由来の伝説上の生物である「麒麟」を意味するとされるが、麒麟は正しい政治が行われている世にしか現れない生物であると中世日本でも信じられていた。"
end

q5 = Question.find_or_create_by!(content: "「麟」という字にはどのような意味があるでしょうか？") do |q|
  q.explanation = "「麟」の意味はは中国神話に登場する伝説上の動物である「麒麟」に由来し、良いことがある前触れとして姿を現し、太平の世のしるし、幸せを招く存在、安定した穏やかな日々をもたらす幸福の象徴などとされている。"
end

q6 = Question.find_or_create_by!(content: "次のうち、KIRIN商品はどれでしょうか？") do |q|
  q.explanation = "おいしいとこだけ一番搾り！！"
end

q7 = Question.find_or_create_by!(content: "吉本興業所属のお笑いコンビ'麒麟'の田村裕さんは、芸人のかたわらある職業として活躍している。その職業は？") do |q|
  q.explanation = "代表作は自伝的小説「ホームレス中学生」"
end

q8 = Question.find_or_create_by!(content: "キリンの首の骨の数はいくつでしょうか？") do |q|
  q.explanation = "ヒトと同じ7個です。"
end

q9 = Question.find_or_create_by!(content: "花の品種として実在するのは？") do |q|
  q.explanation = "アジサイの品種らしい。"
end

q10 = Question.find_or_create_by!(content: "「麟」の旁（つくり）の「粦」は何を意味する？") do |q|
  q.explanation = "鱗とかもあるよね"
end

puts "✅ 問題作成完了"

# ===== 選択肢（Choice） =====
[
  { question: q1, content: "21画", is_correct: false },
  { question: q1, content: "22画", is_correct: false },
  { question: q1, content: "23画", is_correct: false },
  { question: q1, content: "24画", is_correct: true },

  { question: q2, content: "西郷隆盛", is_correct: false },
  { question: q2, content: "勝海舟", is_correct: true },
  { question: q2, content: "坂本龍馬", is_correct: false },
  { question: q2, content: "森鴎外", is_correct: false },

  { question: q3, content: "読み方を間違えられることがしばしばある", is_correct: true },
  { question: q3, content: "習字の際に名前を書くと文字が潰れてしまう", is_correct: false },
  { question: q3, content: "テストを始めるのが誰よりも遅くなってしまう", is_correct: false },
  { question: q3, content: "「凛」「鱗」など間違えて覚えられてしまう", is_correct: false },

  { question: q4, content: "織田信長", is_correct: true },
  { question: q4, content: "徳川家康", is_correct: false },
  { question: q4, content: "豊臣秀吉", is_correct: false },
  { question: q4, content: "武田信玄", is_correct: false },

  { question: q5, content: "天から与えられたもの", is_correct: false },
  { question: q5, content: "めでたい事の前兆とされる想像上の動物", is_correct: true },
  { question: q5, content: "神秘的な鳥", is_correct: false },
  { question: q5, content: "まじりっけなしの、うまさ、のどごし", is_correct: false },

  { question: q6, content: "スーパードライ", is_correct: false },
  { question: q6, content: "風味爽快ニシテ", is_correct: false },
  { question: q6, content: "ザ・プレミアム・モルツ", is_correct: false },
  { question: q6, content: "一番搾り", is_correct: true },

  { question: q7, content: "理容師", is_correct: false },
  { question: q7, content: "住職", is_correct: false },
  { question: q7, content: "トレーナー", is_correct: false },
  { question: q7, content: "作家", is_correct: true },

  { question: q8, content: "7個", is_correct: true },
  { question: q8, content: "16個", is_correct: false },
  { question: q8, content: "23個", is_correct: false },
  { question: q8, content: "49個", is_correct: false },

  { question: q9, content: "麟鳳亀竜（りんぽうきりゅう）", is_correct: true },
  { question: q9, content: "鳳麟瑞祥（ほうりんずいしょう）", is_correct: false },
  { question: q9, content: "鳳麟登場（ほうりんとうじょう）", is_correct: false },
  { question: q9, content: "鳳麟和合（ほうりんわごう）", is_correct: false },

  { question: q10, content: "突起", is_correct: false },
  { question: q10, content: "毛", is_correct: false },
  { question: q10, content: "うろこ", is_correct: true },
  { question: q10, content: "獣", is_correct: false }
].each do |attrs|
  choice = Choice.find_or_initialize_by(
    question: attrs[:question],
    content: attrs[:content]
  )
  choice.is_correct = attrs[:is_correct]
  choice.save!
end

puts "✅ 選択肢作成完了"
puts "🌱 Seeding completed!"


# =====================================================================================
#  seedsファイルの読み込み
# =====================================================================================

puts "🌱 Seeding started..."

load Rails.root.join("db", "seeds", "users.rb")
# load Rails.root.join("db", "seeds", "posts.rb")  # 必要に応じて

puts "🌱 Seeding complete!"
