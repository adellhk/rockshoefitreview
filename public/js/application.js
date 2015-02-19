$(document).ready(function() {

  animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  animate = function (element, animationName) {
    $(element).addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  }

  animate($('.button'), "animated pulse");

  function shoeSearch(submitter) {
    if ($('#searchResults').children().length != 0){
      $('#searchResults').children().remove()
    };
    $.ajax({
      url: '/shoesearch',
      type: 'get',
      data: $(submitter).serialize()
    }).done(function(serverData){
      $('#searchResults').append(serverData);
      $.each($('.results'), function( index, result){
        $(result).css('display', 'inline-block');
        animate(result, "animated fadeInUp");
      });
    }).fail(function(){
      console.log('Search Failed');
    });
  }

  $('#shoeBar').submit(function(e){
    e.preventDefault();
    shoeSearch(this);
  });

  $('div.central a.button').on('click', function(){
    shoeSearch('#shoeBar');
  });

  $('#searchResults').on('click', 'a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    loadShoeInstance(path);
  });

  $('.user-profiles').on('click', '.review a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    loadShoeInstance(path);
  });


});
