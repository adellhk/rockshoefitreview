class Review < ActiveRecord::Base
  belongs_to :author, class_name: "User", foreign_key: 'author_id'
  belongs_to :shoe
  has_many :votes

end
