'use strict';

// put your own value below!
const apiKey = 'errUNz1L2uaoMnA3EwZZ5YHYaCa0lXCk'; 
const searchURL = 'https://api.giphy.com/v1/gifs/search';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length; i++){
    $('#results-list').append(
      `<li>
      <img src='${responseJson.data[i].images.fixed_height_downsampled.url}'>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getYouTubeVideos(query, limit=25) {
  const params = {
    q: query,
    key: apiKey,
    limit,
    offset: 0,
    rating: 'G',
    lang: 'en',
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getYouTubeVideos(searchTerm, limit);
  });
}

$(watchForm);