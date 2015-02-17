# Schema

#### Shoes
* brand
* model
* price
* size

#### review
* author_id (user_id)
* votes_up
* comment_body
* authors_fit_opinion (it fits their foot well or not)

#### Users
* foot_profile
* (optional)foot_mature?

#### Foot_profiles
* size

#### Votes
* vote_count

# Models
#### Votes
* uniqueness scope (AR), combination of voter_id & comment_id must be unique


#### User
* has_many :review
* belongs_to :foot_profile
* Method to: View all review made by user, linked by shoe image (active record scopes)
* Method to: View total votes up/down

#### Foot_profile
* has_many :users

####Shoe
* has many :review
* composite attribute for shoe image based on brand and model naming convention

#### review
* shoe_id
* author_id
* message




#Features
* Can view all review for all sizes pertaining to a specifc shoe in character-limited divs.
* Can expand all review on a page with one button.
* Can view all review made by a user




#Milestones
####Requirements
* Portfolio 1: Sinatra RESTful CRUD
* Portfolio 2: Active Record
* Portfolio 3: Authentication And Authorization
* Portfolio 4: HTML and CSS
* Portfolio 5: Validations and Errors

####User Stories
* A rock climber can view the site without registering or logging in.
* A rock climber can register for an account and login to leave reviews and vote(?).
* A rock climber can search for shoes.
* A rock climber can read other rock climbers' opinions or reviews of a specific size of a specific model of a shoe.
* A rock climber can leave a review.
* A rock climber must say whether a shoe fits the shape of their particular foot as part of their review.
* A rock climber can add a picture to their review.
* A rock climber can vote on whether another climber's review is helpful. (?)
* A rock climber can see a list of the reviews authored by another rock climber.
* A rock climber can define the profile of their foot, either empirically or with measurements.
* A rock climber can get the profile of their foot by taking specific measurements.
* A rock climber can verify the validity of their measurements by taking a picture of their foot from a specific angle with some reference.
* A rock climber can sort shoes based on the reviews left by rock climbers with similarly shaped feet.
* A rock climber can see a list of prices from different retailers for each shoe.


####Deliverables
* Readme.md with running instructions
* **Passion Project A Features & Requirements Chart:**

| Feature |  P1 |  P2 |  P3 |  P4 |  P5 |
| ------- | --- | --- | --- | --- | --- |
|         |     |     |     |     |     |




to-do:
2.16
Conditional logic for new review and login header
store queries in header
user profiles
conditional partials


2.15
Put login header logic based on session

2.14
Authentication, registration, authorization, profile page
review CRUD

2.13
A user can revisit any page, such as a review, shoe, or search
* Shaping up with Angular - Codeschool
http://jsfiddle.net/8s75xp6g/10/
* Controller Testing

2.12
A user starts to search and after three chars have been entered:
  A results Div is appended and slides up, with results in it.
    Results div has a 'banish' button
  As search is narrowed, results are grayed out.
  If a search is ever narrowed down to one result, the "Rock Shoe Size Review" button glows & clicking it or pressing enter will take you to that result's profile page partial.
    A user will always have at least one result not grayed out.
A user can click on a search result
  Page slides down, preserving search results, to display shoe's profile page partial.

If a user makes a search that returns nothing, results div says "no matches, try a different shoe."

* All Shoes Button
* Trending Reviews button

2.8
add "review written XXX ago" counter
add error handling & validations
add pictures

2.5
Test connections with fake seeds in db
Search: ilike(any(array)) (?syntax)

where(product ilike ANY([? ARRAY]))
<!-- Angela & Bryan code below: -->
class Question < Posting
  has_many :answers


  def self.search(string)
    Question.where("content ILIKE ANY ( array[?] ) OR title ILIKE ANY ( array[?] )", parsed(string), parsed(string))
  end

  def self.parsed(string)
    string.tr('^A-Za-z0-9 ', '').split(' ').map {|val| "%#{val}%" }
  end
end
