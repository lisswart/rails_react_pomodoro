class Api::TimeEntriesController < ApplicationController
  def create
    user = User.find(params[:userID])
    task = Task.find(params[:taskID] || 24)
    category = Category.find(params[:categoryID] || 17)
    time_entry = TimeEntry.create!(
      user_id: user.id, 
      task_id: task.id, 
      category_id: category.id, 
      time_posted: params[:time_posted],
      duration: params[:duration]
      )
    render json: time_entry.to_json(
      only: [:id, :created_at, :updated_at, :time_posted, :duration, :category, :task], 
      include: [
        task: { only: [:task_name]}, 
        category: { only: [:category_label]}
      ]
    ), status: :created
  end

  def index
    time_entries = TimeEntry.all
    filtered = time_entries.select do |time_entry|
      time_entry.user_id == session[:user_id]
    end
    render json: filtered.to_json(
      only: [:id, :user_id, :created_at, :updated_at, :time_posted, :duration, :category, :task], 
      include: [
        task: { only: [:task_name]}, 
        category: { only: [:category_label]}
      ]
    )
  end

  def destroy
    time_entry = TimeEntry.find(params[:id])
    time_entry.destroy
    head :no_content
  end
end
