$(document).ready(function() {

  $('div.shoe-pages').on('click', 'div.shoe-instance .reviews a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    loadUserProfile(path);
  });

  loadUserProfile = function(path){
     $('html, body').animate({
      scrollTop: $('.user-profiles').offset().top
    }, 800);

    if ($('.user-profile').length) {
      var $first = $('.user-profile').eq(0)
      $first.addClass("animated fadeOutUp");
      setTimeout(function() {
        $first.remove();
      },1000);
    }

    $.ajax({
      url: path,
      type: 'get'
    }).done(function(serverData){
      console.log('appending user-profile')
      $('.user-profiles').append(serverData);
      animate($('.user-profile'), "animated fadeInUp");
      $('#userProfiles').css('min-height','70em'); // set page to be large enough to scroll one page-length to only show header.
    }).fail(function(){
      console.log('userProfile append Failed')
    });

  };









});
