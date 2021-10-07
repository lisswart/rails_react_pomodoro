class Api::UsersController < ApplicationController
  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(session[:user_id])
    render json: user
  end

  def update
    user = User.find(session[:user_id])
    if params[:session_length].to_i < 60
      user.update(user_params)
      render json: user
    else
      render json: { errors: "In keeping with the spirit of the pomodoro technique and to stave off mental fatigue, session length must be less than 60 minutes. \n \nPlease go back to Preferences and re-enter session length within the reasonable range.  Thank you : )" }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:user_id, :user, :id, :firstname, :lastname, :username, :email, :password, :password_confirmation, :session_length, :break_length, :enable_long_break, :no_of_sessions_before_long_break, :long_break_length)
  end
end
