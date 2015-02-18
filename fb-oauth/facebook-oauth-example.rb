require "rubygems"
require "sinatra"

# require "net/http"
# require "net/https"
# require "cgi"

require "json"
require 'open-uri'

enable :sessions
set :session_secret, '*&(^B234' # ('a'..'z').to_a.sample(10).join

before do
  @client_id = "738338649613509"
  @client_secret = "053a9af068666585fa9f4c862f4e24ba"

  session[:oauth] ||= {}
end

get "/" do
  if session[:oauth][:access_token].nil?
    erb :start
  else
    # http = Net::HTTP.new "graph.facebook.com", 443
    # request = Net::HTTP::Get.new "/me?access_token=#{session[:oauth][:access_token]}"
    # http.use_ssl = true
    # response = http.request request
    url = "https://graph.facebook.com/me?fields=id,name,email&access_token=#{session[:oauth][:access_token]}"
    response = open(url).read
    @json = JSON.parse(response)

    erb :ready
  end
end

get "/request" do
  redirect "https://graph.facebook.com/oauth/authorize?client_id=#{@client_id}&redirect_uri=http://localhost:4567/callback"
end

get "/callback" do
  session[:oauth][:code] = params[:code]

  http = Net::HTTP.new "graph.facebook.com", 443
  request = Net::HTTP::Get.new "/oauth/access_token?client_id=#{@client_id}&redirect_uri=http://localhost:4567/callback&client_secret=#{@client_secret}&code=#{session[:oauth][:code]}"
  http.use_ssl = true
  response = http.request request

  session[:oauth][:access_token] = CGI.parse(response.body)["access_token"][0]

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

enable :inline_templates

__END__

@@ start
<a href="/request">Let's see who you are</a>.

@@ ready
<img style="padding: 20px" src="http://graph.facebook.com/<%= @json["id"] %>/picture" />
<br />
Hello, <%= @json["name"] %>! <a href="/logout">Logout</a>.
