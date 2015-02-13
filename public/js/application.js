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

  $('#searchResults').on('click', function(e){
    e.preventDefault();
    var path = $(e.target).attr('href');
    $.ajax({
      url: path,
      type: 'get'
    }).done(function(serverData){
      var shoePage = "<div id='shoe'><img src='" + serverData.image_url + "_Large.jpg'></div>"
      console.log(serverData)

      $('#shoePages').append(shoePage);


    })

  //   //fail(function(){
  //   //   console.log('Failed')
  //   // })
  // });
  });

});
