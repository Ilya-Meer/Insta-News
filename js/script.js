$(function(){
  $('#menu').on('change', function(event) {
  event.preventDefault();
  
  if ($(window).width() < 600){
      $('header').removeClass('main');
      $('header').addClass('add-photos');
    } else if (($(window).width() < 600)) {
      $('header').removeClass('main');
      $('header').addClass('add-photos-tablet');
    } else {
      $('header').removeClass('main');
      $('header').addClass('add-photos-desktop');
    }




var selected = $('#menu option:selected' ).val();
var url = "https://api.nytimes.com/svc/topstories/v2/"+ selected + ".json";
  url += '?' + $.param({
    'api-key': "1d3d67d37ae24c4a835479a2882cd51d"
});
$.ajax({
  url: url,
  method: 'GET'
})
  .done(function(data) {
    $('ul').empty();
    for(var i = 0; i <= 11; i++) {
    var title = data.results[i].abstract
    var image = data.results[i].multimedia[2].url
    console.log(title);
    $('ul').append('<li style="background: url(' + image + ')";><p>' + title + '</p>' + '<img src="' + image + '">' + '</li>');
  }

})
  .fail(function() {
    console.log(url);
});

});


});
