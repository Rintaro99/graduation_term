# frozen_string_literal: true

class Challenge < ApplicationRecord
  belongs_to :user, optional: true, inverse_of: :challenges
end
