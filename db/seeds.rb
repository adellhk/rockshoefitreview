def generate_shoes
  shoes = {
    "La Sportiva" => ["Solution", "Solution Women's", 'Genius', "Testarossa"],
    "Five Ten" => ["Team 5.10", "Blackwing", "Anasazi VCS", 'Dragon'],
    "Evolv" => ["Shaman"],
    "Scarpa" => ["Instinct VS"],
    "Mad Rock" => ["Shark 2.0"],
    "Tenaya" => ["Oasi"]
  }

  shoes.each_key do |brand|
    shoes[brand].each do |model|
      Shoe.create(brand: brand, model: model, size: 42)
    end
  end

end

def generate_users(num_users = 25)
  num_users.times do
    User.create(username: Faker::Internet.user_name, email: Faker::Internet.email, password: Faker::Internet.password(9))
  end
end

def generate_reviews(num_reviews = 104)
  num_reviews.times do
    Review.create(author_id: [*1..10].sample, message: Faker::Lorem.sentences(3).flatten.join(" "), shoe_id: [*1..12].sample, fits: [true, false].sample)
  end
end
