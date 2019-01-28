# frozen_string_literal: true

json = ActiveSupport::JSON.decode(File.read('db/seeds/events.json'))
json.each do |record|
  Event.create!(record)
end
