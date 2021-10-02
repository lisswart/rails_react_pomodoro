class Api::TimeEntriesController < ApplicationController
  def create
    task = Task.find_by(task_name: params[:task])
    category = Category.find_by(category_label: params[:category])
    time_entry = TimeEntry.create!(user_id: @current_user.id, task_id: task.id, category_id: category.id)
    render json: time_entry, status: :created
  end

  def index
    time_entries = TimeEntry.all
    render json: time_entries
  end
end
