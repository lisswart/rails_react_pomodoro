class TimeEntry < ApplicationRecord
  belongs_to :user
  belongs_to :task
  belongs_to :category
end
