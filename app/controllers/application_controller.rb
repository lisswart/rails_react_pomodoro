class ApplicationController < ActionController::API
  include ActionController::Cookies

  def user
    @current_user = User.find(session[:user_id])
    @current_user
  end
end
