class Api::TimeEntriesController < ApplicationController
  def create
    user = User.find(params[:userID])
    task = Task.find(params[:taskID])
    task_missing = Task.find_by(task_name: "(missing)")
    category = Category.find(params[:categoryID])
    category_missing = Category.find_by(category_label: "(missing)")
    if task
      time_entry = TimeEntry.create!(
      user_id: user.id, 
      task_id: task.id, 
      category_id: category.id, 
      duration: params[:duration]
      )
    else
      time_entry = TimeEntry.create!(
        user_id: user.id,
        task_id: task_missing.id,
        category_id: category_missing.id,
        duration: params[:duration]
      )
    end
    render json: time_entry.to_json(
      only: [:id, :created_at, :updated_at, :time_posted, :duration, :category, :task], 
      include: [
        task: { only: [:task_name]}, 
        category: { only: [:category_label]}
      ]
    ), status: :created
  end

  def index
    time_entries = TimeEntry.order("created_at").all
    filtered = time_entries.select do |time_entry|
      time_entry.user_id == session[:user_id]
    end
    render json: filtered.to_json(
      only: [:id, :user_id, :created_at, :updated_at, :time_posted, :duration, :category, :task], 
      include: [
        task: { only: [:task_name] }, 
        category: { only: [:category_label] }
      ]
    )
  end

  def update
    time_entry = TimeEntry.find(params[:id])
    task = Task.find_by(task_name: params[:taskname])
    if params[:categoryLabel] == ""
      category = Category.find_by(category_label: "(missing)")
    else
      category = Category.find_by(category_label: params[:categoryLabel])
    end
    time_entry.update(task_id: task.id, category_id: category.id)
    render json: time_entry.to_json(
      include: [
        task: { only: [:task_name] },
        category: { only: [:category_label] }
      ]
    )
  end

  def destroy
    time_entry = TimeEntry.find(params[:id])
    time_entry.destroy
    head :no_content
  end
end
 