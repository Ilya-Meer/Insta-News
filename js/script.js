import '../sass/style.scss';

$(function () {

  

  // Changing header size on menu option select

  $('#menu').on('change', function (event) {
    event.preventDefault;
    $('header').addClass('add-photos');
    $('.headlines').empty();
    $('.loader-div').append('<img class="loader" src="assets/images/ajax-loader1.gif">');

  // Generating API URL

    let selected = $('#menu option:selected').val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + selected + '.json';
    url += '?' + $.param({ 'api-key': '1d3d67d37ae24c4a835479a2882cd51d'

    // let url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json?$.param({ 'api-key': '1d3d67d37ae24c4a835479a2882cd51d`
 
  });

  // Fetching Content

    $.ajax({
      url: url,
      method: 'GET'
    })
      .done(function (data) {
        data.results.filter(function (item) {
          if (item.multimedia.length !== 0) {
            return item;
          }
        }).splice(0, 12).forEach(function (item) {
          let title = item.abstract;
          let image = item.multimedia[item.multimedia.length - 1].url;
          let url = item.url;
          $('.headlines').append('<a class="anchor" style="background-image: url(' + image + ')" href="' + url + '"' + '>' + '<div class="list-image">' + title + '</div></a>');

  // Toggles visibility of captions for each story on hover

          $('.anchor').on('mouseover', function () {
            $(this).children().css('visibility', 'visible');
          })
          $('.anchor').on('mouseleave', function () {
            $(this).children().css('visibility', 'hidden');
          })
        });
      })

  // Error Message

    .fail(function () {
      $('.loader-div').empty();
      $('.loader-div').append('<h3>Sorry! There was a problem, please try again!</h3>');
  
    }).always(function () {      
      // $('.loader').remove();
      
    });
  });

  // Initialize Selectric

  $('select').selectric();
});


