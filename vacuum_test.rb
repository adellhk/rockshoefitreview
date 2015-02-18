require 'vacuum'
require 'excon'
require 'dotenv'
Dotenv.load

request = Vacuum.new
request.configure(
    aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
    associate_tag: ENV['ASSOCIATE_TAG']
)

response = request.item_search(
  query: {
    'Keywords'    => 'Architecture',
    'SearchIndex' => 'Books'
  }
)

p response.to_h
