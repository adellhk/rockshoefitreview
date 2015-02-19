# get a specific shoe's view
get '/shoes/:display_name' do
  @shoe = Shoe.find_by(display_name: params[:display_name])
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
