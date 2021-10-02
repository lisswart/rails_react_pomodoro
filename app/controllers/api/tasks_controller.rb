class Api::TasksController < ApplicationController
  def create
    check_task = Task.find_by(task_name: params[:taskname])
    if check_task
      render json: check_task, status: :created
    else
      task = Task.create!(task_name: params[:taskname])
      render json: task, status: :created
    end
  end
end
