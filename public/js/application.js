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

  function newShoe(shoePath){
    $.ajax({
      url: shoePath,
      type: 'get'
    }).done(function(serverData){
      $('#shoePages').append(serverData);
      animate($('.shoe-instance'), "animated fadeInUp");
    }).fail(function(){
      console.log('newShoe append Failed')
    });
  };

  function addNewReviewListener(){
    $('.heading').on('click','a', function (e){
      e.preventDefault();
      var $reviewForm = $('#newReview').eq(0);
      if ($reviewForm.css('display')==='none'){
        $reviewForm.css({'display':"block"});
        $reviewForm.animate({'height': 250}, {duration: 1000}); // expands reviewForm; next line moves reviews downward.
        $('.reviews').animate({"margin-top": 400}, {duration: 1000});
        $('#submitNewReview').css({'display':'block'});
      } else if ($reviewForm.css('display')==='block'){
        $reviewForm.css({'display':'none'});
        $('#submitNewReview').css({'display':'none'});
        $('.reviews').animate({'margin-top': 160}, {duration: 1000});
        $reviewForm.css({'height': 0});
      };
    });
  }

  function addNewReviewFormListener(){
    $('#newReview').focus(function(e){
      $(this).css({'color':'black'});
    });
  };

  $('#shoeBar').submit(function(e){
    e.preventDefault();
    shoeSearch(this);
  });

  function loadShoeInstance(path){
    if ($('.shoe-instance').length) {
      var $first = $('.shoe-instance').eq(0)
      $first.addClass("animated fadeOutUp");
      setTimeout(function() {
        $first.remove();
      },400);
    }
    newShoe(path);
    setTimeout(function() { //this is a bad hack for event delegation: http://api.jquery.com/deferred.then/
      addNewReviewListener();
      addNewReviewFormListener();
      addSubmitNewReviewListener();
    },1000);
  };


  $('#searchResults').on('click', 'a', function(e){
    e.preventDefault();
    var path = $(this).attr('href');
    loadShoeInstance(path);
  });

  function addSubmitNewReviewListener(){
    $('#submitNewReview').on('click', function(e){
      var payload = {};
      var $shoeDisplayName = $(this).attr('name');
      payload.message = $('#newReview').text().trim();
      payload.shoeDisplayName = $shoeDisplayName;
      $.ajax({
        url: '/reviews',
        type: 'post',
        data: payload
      }).done(function(){
        console.log('new review inserted!')
        loadShoeInstance("/shoes/"+$shoeDisplayName)
      }).fail(function(){
        console.log('Failed');
      });
    });
  };

});
