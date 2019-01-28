# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :event_type
      t.date :event_date
      t.text :title
      t.string :speaker
      t.string :host
      t.boolean :published

      t.timestamps
    end
  end
end
