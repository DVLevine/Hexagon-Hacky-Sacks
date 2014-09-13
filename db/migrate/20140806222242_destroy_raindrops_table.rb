class DestroyRaindropsTable < ActiveRecord::Migration
  def change
    
    drop_table :raindrops   
 
  end
end
