class FootProfile < ActiveRecord::Base
  has_many :users
  enum forefoot_width: [ :small, :medium, :large]
  enum heel_width: [ :small, :medium, :large]
  enum foot_length: [ :small, :medium, :large]
  # http://stackoverflow.com/questions/23192516/how-to-use-enumrails-4-1
end
