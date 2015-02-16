# get a list of users
get '/users' do
end
# get a form to add a new users
get '/users/new' do

  erb :new_user
end
# add a new users
post '/users' do
  session[:errors] = nil
  user = User.create(username: params[:username], email: params[:email], password: params[:password])
  if user.errors.any?
    session[:errors] = user.errors
    break
    # redirect '/users/new' #<< partial (: invalid_user )
  elsif
    session[:user_id] = user.id
    session[:user_password] = user.password
  end
end
# get a specific instance of users
get '/users/:username' do
  @user = User.find_by(username:params[:username])
  @shoes_with_reviews = @user.shoes_with_reviews(@user.id)
  erb :user_profile
end
# get a form to edit a specific instance of users
get '/users/:id/edit' do
end
# edit a specific instance of users
put '/users/:id' do
end
# delete a specific instance of users
delete '/users/:id' do
end
