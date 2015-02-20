$(document).ready(function() {

  animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

  animate = function (element, animationName) {
    $(element).addClass(animationName).one(animationEnd, function() {
      $(this).removeClass(animationName);
    });
  }

  animate($('.button'), "animated pulse");

  shoeSearch = function(submission) {
    if ($('#searchResults').children().length != 0){
      $('#searchResults').children().remove()
    };
    // format search submission for passing to controller; handles autocomplete selection vs form input.
    if (jQuery.type(submission) === "string"){
      submission = 'shoeBarInput='+submission
    }else{
      submission = $(submission).serialize()
    }
    $.ajax({
      url: '/shoesearch',
      type: 'get',
      data: submission
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

  $('#shoeBar input[type=text]').focus(function() {
    $(this)
      .select()
      .css({'color':'black'})
  });

  $('div.central a.button').on('click', function(){
    console.log('clicked on shoeBar');
    shoeSearch($("#shoeBarInput").val());
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

  $(document).on('click', '.header a#username', function(e){
    console.log('in #username')
    e.preventDefault();
    loadUserProfile($(this).attr('href'));
  });


});
