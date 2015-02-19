class User < ActiveRecord::Base
  has_many :reviews , class_name: "Review", foreign_key: "author_id"
  belongs_to :foot_profile

  def shoes_with_reviews(user_id)
    user = User.find(user_id)
    shoes = user.reviews.map(&:shoe)
    reviews = user.reviews
    Hash[shoes.zip(reviews)]
  end

end
