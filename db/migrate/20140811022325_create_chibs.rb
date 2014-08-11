class CreateChibs < ActiveRecord::Migration
  def change
    create_table :chibs do |t|
      t.integer :level_id
      t.integer :user_id
      t.string :mochi
      t.string :color

      t.timestamps
    end
  end
end
