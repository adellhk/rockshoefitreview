get '/' do
  @shoes = ["La Sportiva Solution", "La Sportiva Solution Women's", "La Sportiva Genius", "La Sportiva Testarossa", "Five Ten Team 5.10", "Five Ten Blackwing", "Five Ten Anasazi VCS", "Five Ten Dragon", "Evolv Shaman", "Scarpa Instinct VS", "Mad Rock Shark 2.0", "Tenaya Oasi"] # Shoe.all.map{|shoe| shoe.display_name} # hard-coding this saves about 50-60ms on index load time. Should I hardcode?

  erb :index
end

# Debugging routes:
get '/session' do
  session.inspect
end

get '/session-reset' do
  session[:user_id] = nil
  session.inspect
end

get '/background' do
  "Background work thread: sum is #{sum}"
end
