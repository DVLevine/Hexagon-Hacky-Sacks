class AddParamsToLevels < ActiveRecord::Migration
  def change
    add_column :levels, :hex, :string
    add_column :levels, :chib_count, :integer
    add_column :levels, :found_by, :string
    
    remove_column :levels, :red
    remove_column :levels, :blue
    remove_column :levels, :green
  end
end
