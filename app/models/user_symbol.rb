class UserSymbol < ApplicationRecord
  belongs_to :user
  belongs_to :achievement_symbol
end
