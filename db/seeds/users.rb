# =====================================================================================
#  管理者ユーザー設定
# =====================================================================================

puts "🌱 Seeding admin user..."

User.find_or_create_by!(email: "admin@gmail.com") do |user|
  user.name = "admin"
  user.password = "0000"
  user.password_confirmation = "0000"
  user.admin = true
end

puts "✅ Admin user created!"
