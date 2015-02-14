$(document).ready(function() {
  animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  function animate (element, animationName) {
    $(element).addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  }
  animate($('.button'), "animated fadeIn");

  $('#shoeBar').submit(function(e){
    e.preventDefault();

    $.ajax({
      url: '/shoesearch',
      type: 'get',
      data: $(this).serialize()
      // dataType: 'json'
    }).done(function(serverData){
      // console.log(serverData)
      $('#searchResults').append(serverData);
      $.each($('.results'), function( index, result){
        $(result).css('display', 'inline-block');
        animate(result, "animated fadeIn");
      });
    }).fail(function(){
      console.log('Failed');
    });

  });

  $('#searchResults').on('click', 'a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    $.ajax({
      url: path,
      type: 'get'
    }).done(function(serverData){
      $('#shoePages').append(serverData);
    }).fail(function(){
      console.log('Failed')
    });
  });

});
