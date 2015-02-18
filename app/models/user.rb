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
  # validate :valid_password

  def valid_email
    errors.add :email, "is invalid" unless self.email =~ /\A[\w+]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  end

  def valid_password
    errors.add :password, "must be at least eight characters" unless self.password.length >= 8
  end

end
