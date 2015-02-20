$(document).ready(function() {

  $.ajax({

  })
  $('#shoeBarInput').autocomplete({
    source: searchSuggestions,
    select: function(e, selection){
      var term = selection.item.label;
      shoeSearch(term);
    }
  });

});
