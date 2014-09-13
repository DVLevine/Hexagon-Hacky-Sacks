class Chib < ActiveRecord::Base

  belongs_to :level, counter_cache: :chib_count, inverse_of: :chibs

end
