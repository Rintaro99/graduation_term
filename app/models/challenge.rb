class Challenge < ApplicationRecord
  belongs_to :user, optional: true, inverse_of: :challenges
end
