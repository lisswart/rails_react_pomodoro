class Api::TasksController < ApplicationController
  def create
    check_task = Task.find_by(task_name: params[:taskname].downcase.strip)
    if check_task
      render json: check_task, status: :created
    else
      task = Task.create!(task_name: params[:taskname].downcase.strip)
      render json: task, status: :created
    end
  end

  def index
    tasks = Task.all
    render json: tasks
  end
end
