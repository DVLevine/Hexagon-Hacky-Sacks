class Level < ActiveRecord::Base
  
  has_many :chibs, dependent: :destroy, inverse_of: :level
  
end
