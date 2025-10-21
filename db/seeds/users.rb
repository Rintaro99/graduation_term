# =====================================================================================
#  管理者ユーザー設定
# =====================================================================================

puts "🌱 Seeding admin ApiUser..."

ApiUser.find_or_create_by!(email: "admin@gmail.com") do |user|
  user.name = "管理者"
  user.password = "adminn"
  user.password_confirmation = "adminn"
  user.admin = true
  user.save!
end

ApiUser.find_or_create_by!(email: "rin.910491@gmail.com") do |user|
  user.name = "本番テストユーザー"
  user.password = "000000"
  user.password_confirmation = "000000"
end

puts "✅ Admin&Test ApiUser created!"
