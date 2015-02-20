$(document).ready(function() {

  $('.vertical-navbar div').on('click', '#navHome', function(e) {
    console.log('clicked navHome');
    $('body').animate({
      scrollTop: (0)
    }, 800);
  });

  $('#navMagnifier').click(function(){
    console.log('clicked navMagnifier');
    $('body').animate({
      scrollTop: $('.central').offset().top
    }, 800);
  });

  $('#navShoe').click(function(){
    console.log('clicked navShoe');
    $('body').animate({
      scrollTop: $('#shoePages').offset().top
    }, 800);
  });

  $('#navUser').click(function(){
    console.log('clicked navUser');
    $('body').animate({
      scrollTop: $('.user-profiles').offset().top
    }, 800);
  });

});
