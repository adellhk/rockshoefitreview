$(document).ready(function() {

  animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  animate = function (element, animationName) {
    $(element).addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  }

  animate($('.button'), "animated pulse");

  $('.user-profiles').on('click', '.review a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    loadShoeInstance(path);
  });

  $(document).on('click', '.header a#username', function(e){
    console.log('in #username')
    e.preventDefault();
    loadUserProfile($(this).attr('href'));
  });


});
