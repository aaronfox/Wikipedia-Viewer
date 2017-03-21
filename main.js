// see neat representation of my wiki link here: https://en.wikipedia.org/w/api.php?action=query&prop=extracts&generator=search&callback=&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=dog&gsrnamespace=0&gsrlimit=10&gsrwhat=text&callback=?

$(document).ready(function() {
  $(".search-input").hide();
  $(".icon").on("click", function() {
    $(".icon").remove();
    $(".info").remove();
    $(".search-input").show();
    $(".search-input").focus();
    $(".search-input").keypress(function(event) {
      if (event.which == 13) {
        $(".search-results").empty();
        var searchQuery = document.getElementById("search-box").value;
        $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&callback=&exsentences=1&exlimit=10&exintro=1&explaintext=1&gsrsearch=" + searchQuery + "&gsrnamespace=0&gsrlimit=10&gsrwhat=text&callback=?", function(wikiData) {
          if (Object.keys(wikiData).length == 3) {
            var searchObjects = wikiData.query.pages;
            for (var key in searchObjects) {
              var entryTitle = searchObjects[key].title;
              var resultExtract = searchObjects[key].extract;
              $(".search-results").append("<br><a href=\"https://en.wikipedia.org/wiki/" + searchObjects[key].title + "\" target=\"_blank\"><div class=\"result\"><br><div class=\"result-title\">" + entryTitle + "</div><hr><div class=\"result-snippet\">" + resultExtract + "</div><br></div></a>");
            }
          } else {
            $(".search-results").append("<br><div class=\"not-found\">No Wikipedia articles with that query were found. <i class=\"fa fa-frown-o\"></i></div>")
          }
        });
      }
    });
  });
});