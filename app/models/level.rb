class Level < ActiveRecord::Base
  
  has_many :chibs, dependent: :destroy
  
end
