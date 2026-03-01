# frozen_string_literal: true

class ApiChallenge < ApplicationRecord
  belongs_to :api_user, inverse_of: :api_challenges
end
