class Post < ApplicationRecord
  validates :title, presence: true, length: { maximum: 255 }
  varidates :body, presence: true, length: { maximum: 10_535 }

  belongs_to :user
end
