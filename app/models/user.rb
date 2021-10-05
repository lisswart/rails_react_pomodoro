class User < ApplicationRecord
  has_many :time_entries
  has_many :categories, through: :time_entries
  has_many :tasks, through: :time_entries

  validates :username, presence: true, uniqueness: true
  # validates :session_length, numericality: {
  #   greater_than_or_equal_to: 1,
  #   less_than_or_equal_to: 59
  # }
  # validates :break_length, numericality: {
  #   greater_than_or_equal_to: 1,
  #   less_than_or_equal_to: 59
  # }

  has_secure_password
end
