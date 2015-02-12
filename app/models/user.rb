class User < ActiveRecord::Base
  has_many :reviews , class_name: "Review", foreign_key: "author_id"
  belongs_to :foot_profile

  def all_comments
    # active record scopes
  end

  def upvote_score
    # Vote.where()
  end
  # users.password_hash in the database is a :string

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end

  def shoes_with_reviews(user_id)
    user = User.find(user_id)
    shoes = user.reviews.map(&:shoe)
    reviews = user.reviews
    Hash[shoes.zip(reviews)]
  end

# validations
# validates :username, :email, presence: true, uniqueness: true
# validate :valid_email #, on: :create
  def valid_email
    errors.add :email, "is invalid" unless self.email =~ /\A[\w+]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  end

  def display_errors
    html = []
    self.errors.messages.each_pair do |attribute, errors|
      html << "<b>#{attribute}:</b><br>"
      errors.each do |error| "error"
        html << "#{error}<br>"
      end
    end
    return html.join("")
  end

end
