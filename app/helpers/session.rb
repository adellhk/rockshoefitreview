def authorized?
  unless User.find_by(id: session[:user_id])
    p "User not found!"*100
    return false
  end
  correct_password = User.find(session[:user_id]).password_hash

  if correct_password == session[:user_password]
    puts "="*100+"\n passwords match\n"+"="*100
    return true
  elsif correct_password != session[:user_password]
    puts "="*100
    puts "Passwords don't match."
    puts "passwords are:\n correct_password:\n#{correct_password}\n ssesion_password:\n#{session[:user_password]}"
    puts "="*100
    return false
  else
     puts "="*100+"\n what?? helpers\\session.rb \n"+"="*100
  end
end
