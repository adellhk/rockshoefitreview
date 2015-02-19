require 'spec_helper'

describe 'GET homepage' do
  it 'should be ok' do
    get "/"
    expect(last_response).to be_ok
  end
  xit 'should create a new review' do # should be in review controller testing
    expect {
      post '/reviews', {'display_name' => 'La Sportiva Solution', 'user_id' => 3}
    }.to change{Review.count}.by(1)
  end
end

describe 'invalid page' do
  it 'should not be ok' do
    get '/not_a_page'
    expect(last_response).not_to be_ok
  end
end

