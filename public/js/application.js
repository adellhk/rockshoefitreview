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

  function loadShoeInstance(path){
    $('html, body').animate({
      scrollTop: $('#searchResults').offset().top
    }, 2000);

    if ($('.shoe-instance').length) {
      var $first = $('.shoe-instance').eq(0)
      $first.addClass("animated fadeOutUp");
      setTimeout(function() {
        $first.remove();
      },1000);
    }
    newShoe(path);
  };
  bindWriteNewReviewAnchor();
  addNewReviewFormListener();
  bindSubmitNewReview();

  function newShoe(shoePath){
    $.ajax({
      url: shoePath,
      type: 'get'
    }).done(function(serverData){
      $('#shoePages').append(serverData);
      makeImagesSafe();
      animate($('.shoe-instance'), "animated fadeInUp");
    }).fail(function(){
      console.log('newShoe append Failed')
    });
  };

  function bindWriteNewReviewAnchor(){
    $('.shoe-pages').on('click','.heading-title a', function (e){
      console.log(e);
      e.preventDefault();
      var $reviewFormTitle = $('#newReviewTitle').eq(0);
      var $reviewForm = $('#newReview').eq(0);
      if ($reviewForm.css('display')==='none'){
        $reviewFormTitle.css({'display':'block'});
        $reviewForm.css({'display':'block'});
        $reviewFormTitle.css({'height':16})
        $reviewForm.animate({'height': 230}, {duration: 1000}); // expands reviewForm; next line moves reviews downward.
        $('.reviews').animate({"margin-top": 400}, {duration: 1000});
        $('#submitNewReview').css({'display':'block'});
      } else if ($reviewForm.css('display')==='block'){
        $reviewForm.css({'display':'none'});
        $reviewFormTitle.css({'display':'none'});
        $('#submitNewReview').css({'display':'none'});
        $('.reviews').animate({'margin-top': 160}, {duration: 1000});
        $reviewFormTitle.css({'height':0});
        $reviewForm.css({'height': 0});
      };
    });
}

function addNewReviewFormListener(){
  $('.shoe-pages').on('focus', '#newReview, #newReviewTitle', (function(e){
    $(this).css({'color':'black'})
    $(this).text("")
  })
  )};

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

  function bindSubmitNewReview(){
    $('.shoe-pages').on('click', '#submitNewReview', function(e){
      e.preventDefault();
      var payload = {};
      var $shoeDisplayName = $(this).attr('name');
      payload.title = $('#newReviewTitle').text().trim();
      payload.message = $('#newReview').text().trim();
      payload.shoeDisplayName = $shoeDisplayName;
      $.ajax({
        url: '/reviews',
        type: 'post',
        data: payload
      }).done(function(){
        console.log('new review inserted!');
        loadShoeInstance("/shoes/"+$shoeDisplayName);
      }).fail(function(){
        console.log('Failed');
      });
    });
  };

  function makeImagesSafe() {
    $("img").unbind("error");
    $("img").error(function(){
      $(this).unbind("error").attr({'src':'/imgs/no-avatar.jpg'})
    })
  }



});
