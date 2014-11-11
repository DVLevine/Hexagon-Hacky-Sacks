class DestroyRaindropsTableAndPlantsTable < ActiveRecord::Migration
  def change
    drop_table :plants
    drop_table :raindrops
  end
end
