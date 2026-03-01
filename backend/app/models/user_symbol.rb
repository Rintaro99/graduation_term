# frozen_string_literal: true

class UserSymbol < ApplicationRecord
  # belongs_to :user, optional: true
  belongs_to :api_user, optional: true
  belongs_to :achievement_symbol
end
