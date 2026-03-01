# frozen_string_literal: true

class AchievementSymbol < ApplicationRecord
  has_many :users, through: :user_symbols
  has_many :user_symbols
end
