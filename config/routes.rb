Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    patch '/users/:id', to: 'users#update'
    
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'

    patch '/users/:id', to: 'users#update'

    post '/time_entries', to: 'time_entries#create'
    get '/time_entries', to: 'time_entries#index'
    delete '/time_entries/:id', to: 'time_entries#destroy'

    post '/tasks', to: 'tasks#create'
    get '/tasks', to: 'tasks#index'

    post '/categories', to: 'categories#create'
    get '/categories', to: 'categories#index'
  end

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
