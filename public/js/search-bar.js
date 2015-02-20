$(document).ready(function() {

  $('#shoeBarInput').autocomplete({
    source: searchSuggestions,
    select: function(e, selection){
      var term = selection.item.label;
      shoeSearch(term);
    }
  });

});
