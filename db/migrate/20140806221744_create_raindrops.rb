class CreateRaindrops < ActiveRecord::Migration
  def change
    create_table :raindrops do |t|
      t.string :water
      t.integer :shiny

      t.timestamps
    end
  end
end
