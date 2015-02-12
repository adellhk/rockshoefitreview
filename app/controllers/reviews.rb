# get a list of comments
get '/reviews' do
end
# get a form to add a new reviews
get '/reviews/new' do

  erb :new_review
end
# add a new reviews
post '/reviews' do
  Review.create(message: params[:message], shoe_id: session[:last_shoe_id], author_id:session[:user_id])
  redirect "/shoes/#{session[:last_shoe_id]}"
end
# get a specific instance of reviews
get '/reviews/:id' do
end
# get a form to edit a specific instance of reviews
get '/reviews/:id/edit' do
end
# edit a specific instance of reviews
put '/reviews/:id' do
end
# delete a specific instance of reviews
delete '/reviews/:id' do
end
