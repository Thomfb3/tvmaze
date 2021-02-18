/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */



// http://api.tvmaze.com/shows/<show id>/episodes


async function searchShows(query) {
  // DONE || TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  try {
    const url = `http://api.tvmaze.com/search/shows?q=${query}`;
    const response = await axios.get(url);
    //Check for image
    const image = response.data[0].show.image.original ? response.data[0].show.image.original : "https://tinyurl.com/tv-missing";
    //return response data

    return [
      {
        id: response.data[0].show.id,
        name: response.data[0].show.name,
        summary: response.data[0].show.summary,
        image: image
      }
    ]
  } catch (e) {
    alert("SHOW NOT FOUND!");
  }

}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  //save show list elements
  const $showsList = $("#shows-list");
  //for each show in shows - create card elements and append to show list
  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-4 mb-5" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
          <img src="${show.image}" class="card-img-top" alt="${show.name} image">
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">${show.summary}</p>
            <button data-show-id="${show.id}" data-show-name="${show.name}" class="episodes btn btn-primary">Episodes</button>
            <button data-show-id="${show.id}" data-show-name="${show.name}" class="cast btn btn-primary">Cast</button>
            <button class="remove btn btn-danger">Remove</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}

//Populate Episodes in modal
function populateEpisodes(episodes, showName) {
  //save modal elements
  const $episodesList = $("#episodes-list");
  const episodeLabel = $("#episodesModalLabel");
  //clear modal content
  $episodesList.empty();
  //Set title with show name
  $(episodeLabel).text(`${showName} - Episodes`);

  //for each episode in the array - create a table row and append the episode table
  for (let episode of episodes) {
    const epSummary = episode.summary ? episode.summary : "Summary Unavailable.";
    let $episode = $(
      `<tr>
        <th scope="row">${episode.season}</th>
        <td>${episode.number}</td>
        <td>${episode.name}</td>
        <td>${episode.airdate}</td>
      </tr>
      <tr class="border-dark">
      <td colspan='5'>${epSummary}</td>
      </tr>`
    );

    $episodesList.append($episode);
  }
  //Force modal call
  const episodeModal = new bootstrap.Modal(document.getElementById('episodesModal'), {
    keyboard: false
  })

  episodeModal.show()
}


//Populate Cast in modal
function populateCast(cast, showName) {
  //save modal elements
  const $castList = $("#cast-list");
  const castLabel = $("#castModalLabel");
  //clear modal content
  $castList.empty();
  //Set title with show name
  $(castLabel).text(`${showName} - Cast`);
  //Save fall back image for missing character images
  const fallBackImage = "https://11m1a41kw68b2skba3uj53p1-wpengine.netdna-ssl.com/wp-content/uploads/2019/04/avatar-male.jpg"

  //for each cast member in the array - create a table row and append the cast table
  for (let castMember of cast) {
    const castImage = (castMember.character.image === null) ? fallBackImage : castMember.character.image.medium;
    let $cast = $(
      `<tr class="table table-striped">
        <td><img src="${castImage}" width="100px"></td>
        <td>${castMember.character.name}</td>
        <td>${castMember.person.name}</td>
      </tr>`
    );

    $castList.append($cast);
  }
  //Force modal call
  const castModal = new bootstrap.Modal(document.getElementById('castModal'), {
    keyboard: false
  })

  castModal.show()
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();
  //Collect current search value
  let query = $("#search-query").val();
  //if the
  if (!query) return;

  let shows = await searchShows(query);

  populateShows(shows);
});


//Remove Show Card from the page
$("#shows-list").on("click", function (e) {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.parentElement.parentElement.remove();
  }
})

//Click to run getEpisodes and create episodes modal
$("#shows-list").on("click", async function (e) {
  //If the episodes button is clicked
  if (e.target.classList.contains("episodes")) {
    //gather show name and id from the attributes
    const showId = e.target.getAttribute("data-show-id");
    const showName = e.target.getAttribute("data-show-name");
    //Save getEpisodes with show id
    let episodes = await getEpisodes(showId);
    //call populateEpisodes with episodes and show name
    populateEpisodes(episodes, showName);
  }
})

//Click to run getCast and create episodes modal
$("#shows-list").on("click", async function (e) {
  //If the cast button is clicked
  if (e.target.classList.contains("cast")) {
    //gather show name and id from the attributes
    const showId = e.target.getAttribute("data-show-id");
    const showName = e.target.getAttribute("data-show-name");
    //Save getCast with show id
    let cast = await getCast(showId);
    //call populateCast with cast and show name
    populateCast(cast, showName);
  }
})



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  try {
    const url = `http://api.tvmaze.com/shows/${id}/episodes`;
    const response = await axios.get(url);
    //Return response
    return response.data;

  } catch (e) {
    //If something goes wrong....
    alert("Uh Oh!");
  }
}

//Given ID retrieve cast
async function getCast(id) {
  //make request for cast based on show id
  try {
    const url = `http://api.tvmaze.com/shows/${id}/cast`;
    const response = await axios.get(url);
    //Return response
    return response.data;

  } catch (e) {
    //If something goes wrong....
    alert("Uh Oh!");
  }
}
