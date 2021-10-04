class Api::UsersController < ApplicationController
  def create
    user = User.create(user_params)
    if user.valid?
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
    # update user's timer preferences
    user = User.find(session[:user_id])
    user.update(user_params)
    render json: user
  end

  private

  def user_params
    params.permit(:firstname, :lastname, :username, :email, :password, :password_confirmation, :session_length, :break_length, :enable_long_break, :no_of_sessions_before_long_break, :long_break_length)
  end
end
