get '/session-viewer' do
  session.inspect
end

get '/session-reset' do
  session[:user_password] = nil
  session[:user_id] = nil
  session.inspect
end

get '/' do
  @shoes = ["La Sportiva Solution", "La Sportiva Solution Women's", "La Sportiva Genius", "La Sportiva Testarossa", "Five Ten Team 5.10", "Five Ten Blackwing", "Five Ten Anasazi VCS", "Five Ten Dragon", "Evolv Shaman", "Scarpa Instinct VS", "Mad Rock Shark 2.0", "Tenaya Oasi"] # Shoe.all.map{|shoe| shoe.display_name} # hard-coding this saves about 50-60ms on index load time. Should I hardcode?

  erb :index
end

get '/logout' do
  puts "="*100 + "\n in logout route"
  session.clear
  redirect '/'
end

get '/login/?' do
  erb :login
end

get '/login/again' do
  erb :login_again
end

post '/login' do
  user = User.find_by(email: params[:email])
  # raise AuthError, "no such email registered" unless user
  # puts "="*100+"\n #{user}"
  if user
    user.authenticate(params[:password])
    session[:user_id] = user.id
    session[:user_password] = user.password
    return
  else
    400
  end
end

get '/logged_in' do
  return 200 if session[:user_id]
  return 400
end

# get '/register' do

#   erb :register
# end
# ### DEPRECATED, MOVED INTO USER CONTROLLER
# post '/register' do
#   if User.find_by(username: params[:username]).nil? && User.find_by(email: params[:email]).nil?
#     User.create(username: params[:username], email: params[:email], password_hash: params[:password])
#     user = User.find_by(username: params[:username])
#     session[:user_id] = user.id
#     user.password = params[:password]
#     user.save
#   else
#     redirect '/register' #<< partial (: invalid_user )
#   end
# end

# register login
