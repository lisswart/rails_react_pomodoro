class User < ApplicationRecord
  has_many :time_entries
  has_many :categories, through: :time_entries
  has_many :tasks, through: :time_entries

  has_secure_password
end
