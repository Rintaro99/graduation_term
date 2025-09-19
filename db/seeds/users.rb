# =====================================================================================
#  管理者ユーザー設定
# =====================================================================================

puts "🌱 Seeding admin ApiUser..."

ApiUser.find_or_create_by!(email: "admin@gmail.com") do |user|
  user.name = "管理者"
  user.password = "adminn"
  user.password_confirmation = "adminn"
end

puts "✅ Admin ApiUser created!"
