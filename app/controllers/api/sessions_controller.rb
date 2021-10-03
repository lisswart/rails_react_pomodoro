class Api::SessionsController < ApplicationController
  def create
    @current_user = User.find_by(username: params[:username])
      session[:user_id] = @current_user.id
      render json: @current_user, status: :created
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
