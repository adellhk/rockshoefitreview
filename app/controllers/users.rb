# get a list of users
get '/users' do
end
# get a form to add a new users
get '/users/new' do

  erb :new_user
end
# get a specific instance of users
get '/users/:fb_id' do
  @user = User.find_by(fb_id: params[:fb_id])
  @shoes_with_reviews = @user.shoes_with_reviews(@user.id)
  erb :user_profile, layout: false
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
