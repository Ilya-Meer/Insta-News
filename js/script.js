import NYT_API_KEY from '../config';

import $ from 'jquery';
import '../sass/style.scss';
import '../lib/jquery.selectric';

const STORIES_QTY = 12;

const startLoading = () => {
  $('header').addClass('add-photos');
  $('.headlines').empty();
  $('footer').hide();
  $('.loader-div').append('<img class="loader" src="assets/images/ajax-loader1.gif">');
};

const stopLoading = () => {
  $('.loader-div').empty();
};

const displayError = () => {
  stopLoading();
  $('.loader-div').append('<h3>Sorry! There was a problem, please try again!</h3>');
};

$(document).ready(() => {
  window.addEventListener('touchstart', function onFirstTouch() {
    $('body').addClass('touch');
  });

  $('#menu').on('change', event => {
    event.preventDefault();
    startLoading();

  // Generating API URL

    const selected = $('#menu option:selected').val();
    const queryParams = `?${$.param({ 'api-key': NYT_API_KEY })}`;
    const url = `https://api.nytimes.com/svc/topstories/v2/${selected}.json${queryParams}`;

  // Fetching Content

    $.ajax({
      url: url,
      method: 'GET'
    })
      .done(data => {
        data.results
          .filter(item => {
            if (item.multimedia.length !== 0) {
              return item;
            }
          })
          .splice(0, STORIES_QTY)
            .forEach(item => {
              const title = item.abstract;
              const image = item.multimedia[item.multimedia.length - 1].url;
              const url = item.url;

              $('.headlines').append(
                `<a class="anchor" target="_blank" rel="noopener" href="${url}">
                  <div class="thumbnail-wrapper">
                    <img src="${image}"/>
                  </div>
                  <div class="list-image">${title}</div>
                </a>
              `);

              $('.anchor').on('mouseover', function () {
                $(this).children('.list-image').css('visibility', 'visible');
              })

              $('.anchor').on('mouseleave', function () {
                $(this).children('.list-image').css('visibility', 'hidden');
              })
            });
        $('footer').show();
      })
      .fail(function () {
        displayError();
      }).always(function () {      
        stopLoading();
      });
    });

  // Initialize Selectric
  $('select').selectric();
});