# frozen_string_literal: true

class ApiPost < ApplicationRecord
  belongs_to :api_user
  has_many :api_post_favorites, dependent: :destroy
  has_many :favorited_users, through: :api_post_favorites, source: :api_user

  validates :title, presence: true
  validates :content, presence: true
end
