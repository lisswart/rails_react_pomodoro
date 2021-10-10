class User < ApplicationRecord
  has_many :time_entries
  has_many :categories, through: :time_entries
  has_many :tasks, through: :time_entries

  validates :username, presence: true, uniqueness: true

  validates :session_length, numericality: true, on: :update

  validates :break_length, numericality: true, on: :update

  has_secure_password
end
