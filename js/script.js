$(function () {

  $('#menu').on('change', function (event) {
    event.preventDefault();
    $('header').addClass('add-photos');
    $('.headlines').empty();

    if ($('select') === '') {
      $('.loader').hide();
    } else {
      $('.loader').show();
    }

   
    var selected = $('#menu option:selected').val();
    var url = "https://api.nytimes.com/svc/topstories/v2/" + selected + ".json";
    url += '?' + $.param({
      'api-key': "1d3d67d37ae24c4a835479a2882cd51d"
    });

    $.ajax({
      url: url,
      method: 'GET'
    })
      .done(function (data) {
        data.results.filter(function (item) {
          if (item.multimedia.length !== 0) {
            return item
          }
        }).splice(0, 12).forEach(function (item) {
          var title = item.abstract
          var image = item.multimedia[item.multimedia.length - 1].url
          var url = item.url
          $('.headlines').append('<a style="background-image: url(' + image + ')" href="' + url + '"' + '>' + '<div class="list-image">' + title + '</div></a>');
          $('.loader').hide();
          
        })
      }).fail(function () {
        $('.headlines').append('<h3>Sorry! There was a problem, please try again!</h3>');

      }).always(function () {
        
      });
  });
});
