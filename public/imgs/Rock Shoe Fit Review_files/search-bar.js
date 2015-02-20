$(document).ready(function() {

  $('#shoeBarInput').autocomplete({
    source: searchSuggestions,
    select: function(e, selection){
      var term = selection.item.label;
      shoeSearch(term);
    }
  });
  var shoeIcons = ['/imgs/shoe-icons/s1_64.png','/imgs/shoe-icons/s2_64.png','/imgs/shoe-icons/s3_64.png','/imgs/shoe-icons/s4_64.png','/imgs/shoe-icons/s5_64.png']

  var doSomething = function(){
    $.each(shoeIcons, function(index, pic){
      console.log(pic)
    })
  }
  var $searchButton =  $('a.button')
  $searchButton.mouseover( doSomething )



  // $('div.central a.button').hover(
  //   function() {
  //     // This could probably be a hash or object of original values.
  //     originalBackground = $(this).css('background');
  //     originalText = $(this).text();
  //     $(this).height($(this).height());
  //     $(this).width($(this).width());
  //     $(this).css('background','none');
  //     $(this).text('');
  //     loadingCarousel;
  //   }, function() {
  //     $(this).css('background', originalBackground);
  //     $(this).text(originalText);
  //   });


  // var loadingCarousel = setInterval(function(index){
  //   index = 0
  //   console.log(index)
  //   console.log('image on deck is:'+shoeIcons[index])
  //   $('a.button').css('background-image',"url("+shoeIcons[index]+")")
  //   index = (index + 1)
  // }, 1000);

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

});
