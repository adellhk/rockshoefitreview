require "rubygems"
require "sinatra"
require 'dotenv'
Dotenv.load

# require "net/http"
# require "net/https"
# require "cgi"

require "json"
require 'open-uri'

enable :sessions
set :session_secret, '*&(^B234' # ('a'..'z').to_a.sample(10).join

before do
  @client_id = ENV['FB_CLIENT_ID']
  @client_secret = ENV['FB_CLIENT_SECRET']

  session[:oauth] ||= {}
end

get "/facebook" do
  if session[:oauth][:access_token].nil?

    redirect "/request"
  else
    # http = Net::HTTP.new "graph.facebook.com", 443
    # request = Net::HTTP::Get.new "/me?access_token=#{session[:oauth][:access_token]}"
    # http.use_ssl = true
    # response = http.request request
    url = "https://graph.facebook.com/me?fields=id,name,email&access_token=#{session[:oauth][:access_token]}"
    response = open(url).read
    @json = JSON.parse(response)

    redirect '/'
  end
end

get "/request" do
  redirect "https://graph.facebook.com/oauth/authorize?client_id=#{@client_id}&redirect_uri=http://localhost:9393/callback"
end

get "/callback" do
  session[:oauth][:code] = params[:code]

  # http = Net::HTTP.new "graph.facebook.com", 443
  # request = Net::HTTP::Get.new "/oauth/access_token?client_id=#{@client_id}&redirect_uri=http://localhost:9393/callback&client_secret=#{@client_secret}&code=#{session[:oauth][:code]}"
  # http.use_ssl = true
  # response = http.request request
  url = "https://graph.facebook.com/oauth/access_token?client_id=#{@client_id}&redirect_uri=http://localhost:9393/callback&client_secret=#{@client_secret}&code=#{session[:oauth][:code]}"
  resonse = open(url).read
  p JSON.parse(resonse)
  session[:oauth][:access_token] = JSON.parse(response.body)["access_token"][0]

  # current_user = User.find_or_create_by(email: last_response["email"] -> https://graph.facebook.com/me?fields=id,name,email&access_token=#{access_token}
  # session[:user_id] = current_user.id
  # unless current_user.username
  #   current_user.
  #   redirect '/new_user'
  redirect "/"
end

get "/logout" do
  session[:oauth] = {}
  redirect "/"
end

get '/session' do
  session.inspect
end


__END__

@@ start
<a href="/request">Let's see who you are</a>.

@@ ready
<img style="padding: 20px" src="http://graph.facebook.com/<%= @json["id"] %>/picture" />
<br />
Hello, <%= @json["name"] %>! <a href="/logout">Logout</a>.
