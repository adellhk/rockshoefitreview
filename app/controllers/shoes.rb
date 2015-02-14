# get a list of shoes

before '/shoes/*' do
  # redirect "/login" unless authorized? # in helpers/session.rb
end

get '/shoes/?' do
  erb :shoes
end

# get '/shoes/:id' do
#   @shoe = Shoe.find(params[:id])
#   # erb :shoe_instance
#   erb :shoe_instance
# end
# # get a form to edit a specific instance of shoes

get '/shoes/:display_name' do
  # shoe = Shoe.find_by(display_name: params[:display_name])
  @shoe = Shoe.find_by(display_name: params[:display_name])
  # content_type :json
  # @shoe.to_json
  erb :shoe_instance, layout: false
end

# get '/shoes/:display_name/reviews/new' do
get '/shoes/:display_name/new_review' do
  session[:last_shoe_id] = params[:id]
  redirect '/reviews/new'
end

get '/shoesearch' do
  keywords = params[:shoeBarInput].split(" ").map!{|word| "%"+word+"%"}
  @matches = Shoe.where('display_name ilike any ( array[?] )', keywords)
  erb :search_results, layout: false
end
# # edit a specific instance of shoes
# put '/shoes/:id' do
# end
# # delete a specific instance of shoes
# delete '/shoes/:id' do
# end
