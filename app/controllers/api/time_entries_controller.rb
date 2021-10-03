class Api::TimeEntriesController < ApplicationController
  def create
    user = User.find(params[:userID])
    task = Task.find(params[:taskID])
    category = Category.find(params[:categoryID])
    time_entry = TimeEntry.create!(user_id: user.id, task_id: task.id, category_id: category.id, duration: params[:duration])
    render json: time_entry, status: :created
  end

  def index
    time_entries = TimeEntry.all
    render json: time_entries
  end
end
