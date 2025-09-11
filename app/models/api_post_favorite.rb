class ApiPostFavorite < ApplicationRecord
  belongs_to :api_user
  belongs_to :api_post

  validates :api_user_id, uniqueness: { scope: :api_post_id }
end
