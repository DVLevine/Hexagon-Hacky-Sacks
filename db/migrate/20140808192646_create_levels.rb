class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.integer :red
      t.integer :blue
      t.integer :green

      t.timestamps
    end
  end
end
