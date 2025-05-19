class User < ApplicationRecord
  authenticates_with_sorcery!

  # validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  # validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password, presence: true, length: { minimum: 3 }, confirmation: true, if: :password_required?
  validates :password_confirmation, presence: true, if: :password_required?

  validates :name, presence: true, length: { maximum: 255 }
  validates :email, presence: true, uniqueness: true

  validates :reset_password_token, uniqueness: true, allow_nil: true

  private

  def password_required?
    new_record? || changes[:crypted_password].present? || reset_password_token.present?
  end
end
