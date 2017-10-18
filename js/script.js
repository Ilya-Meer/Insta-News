$(function(){
  

$('button').on('click', function(data) {

  // $('.main').append('<img class="loader" src="assets/images/ajax-loader.gif">');  

  $.ajax({
    method: 'GET',
    url: 'https://api.nytimes.com/svc/topstories/v2/books.json?api-key=1d3d67d37ae24c4a835479a2882cd51d',
        
  })

  .done(function(data) {
   $.each(data, function(index, value){
     console.log(index);
     $('ul').append('<li>' + index + ":" + value + '</li>');
    
    })   
  })
       .fail(function() {
        
  })
       .always(function(){
        //  ('.loader').remove();
       })
});

});








