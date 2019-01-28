# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end
