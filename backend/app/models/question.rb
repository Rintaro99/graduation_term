# frozen_string_literal: true

class Question < ApplicationRecord
  has_many :choices, dependent: :destroy
end
