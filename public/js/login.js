$(document).ready(function() {
    $.ajax({
    url: '/logged_in',
    type: 'get'
  }).done(function(serverData) {
    console.log("already logged in");
    loggedInHeader();
  }).fail(function(serverData) {
    console.log("not logged in");
    loggedOutHeader();
  });

  $('#login input').eq(2).on('click', function(e){
    e.preventDefault()
    var payload = {}
    payload.email = $('#login input').eq(0).val();
    payload.password = $('#login input').eq(1).val();
    $.ajax({
      url: '/login',
      type: 'post',
      data: payload
    }).done(function(serverData){
      loggedInHeader();
    }).fail(function(serverData) {
      $('#login input').eq(0).val("Invalid :(");
      animate($('#login input'), "animated shake");
    });
  });

  $('#register input').eq(3).on('click', function(e){
    e.preventDefault()
    var payload = {}
    payload.email = $('#register input').eq(0).val();
    payload.username = $('#register input').eq(1).val();
    payload.password = $('#register input').eq(2).val();
    $.ajax({
      url: '/users',
      type: 'post',
      data: payload
    }).done(function(){
      console.log("registration successful")
      loggedOutHeader();
    }).fail(function(serverData){
      console.log("registration failed")
      animate($('#register input'), 'animated shake');
    });
  });

  $('#logout').on('click', function(){
    $.ajax({
      url: '/logout',
      type: 'get'
    })
    loggedOutHeader();
    location.reload();
  });

  $('#newRegistration').on('click', function(){
    registeringHeader();
  })


  loggedInHeader = function (){
    // case for logged in
     $('#login, #register, #newRegistration').css({'display':'none'});
     $('#logout').css({'display':'flex'});
  };

  loggedOutHeader = function (){
    // case for logged out
     $('#logout, #register').css({'display':'none'});
     $('#login, #newRegistration').css({'display':'flex'});
  };

  registeringHeader = function (){
    // case for registering
     $('#login, #logout').css({'display':'none'});
     $('#register, #newRegistration').css({'display':'flex'});
  };


});
