def generate_shoes
  shoes = {
    "La Sportiva" => ["Solution", "Solution Womens", 'Genius', "Testarossa"],
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
    User.create(username: Faker::Name.first_name, email: Faker::Internet.email, fb_id: Faker::Number.number(17))
  end
end

def generate_reviews(num_reviews = 104)
  num_reviews.times do
    Review.create(author_id: [*1..10].sample, message: Faker::Lorem.paragraph, title: Faker::Lorem.sentence, shoe_id: [*1..12].sample, fits: [true, false].sample)
  end
end
