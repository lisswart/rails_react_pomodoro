class FallbackController < ActionController::Base
  def index
    render file: 'publix/index.html'
  end
end
