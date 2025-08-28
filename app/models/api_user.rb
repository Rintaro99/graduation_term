class ApiUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :api_challenges, dependent: :destroy, inverse_of: :api_user
  has_many :user_symbols, dependent: :destroy
  has_many :achievement_symbols, through: :user_symbols
end
