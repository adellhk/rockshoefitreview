def current_user_exist?
  !session[:user_id].nil?
end

def current_user_username
  User.find(session[:user_id]).username
end

def responsive_login_form
  if current_user_exist?
    return "#{current_user_username}. <a href=\"/logout\">logout</a>"
  else
    return "<a href=\"/login\">login</a>"
  end

end
