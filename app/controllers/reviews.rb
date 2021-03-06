# add a new reviews
post '/reviews' do
  shoe_id = Shoe.find_by(display_name: params[:shoeDisplayName]).id
  Review.create(message: params[:message], title: params[:title], shoe_id: shoe_id, author_id: session[:user_id])
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
