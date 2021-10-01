class UsersController < ApplicationController
  def create
    users = User.create(user_params)
    render json: user, status: :created
  end

  def show
    user = User.find(session[:user_id])
    render json: user
  end

  private

  def user_params
    params.permit(:firstname, :lastname, :username, :email, :password_digest)
  end
end
