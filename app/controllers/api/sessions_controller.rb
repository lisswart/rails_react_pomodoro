class Api::SessionsController < ApplicationController
  def create
    @current_user = User.find_by(username: params[:username])
    if @current_user&.authenticate(params[:password])
      session[:user_id] = @current_user.id
      render json: @current_user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
