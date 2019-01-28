# frozen_string_literal: true

Rails.application.routes.draw do
  root 'site#index'

  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end
