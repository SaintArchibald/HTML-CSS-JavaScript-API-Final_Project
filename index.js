function openMenu() {
  document.body.classList += ' menu--open'
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

// d7c289f8b7msh81ad3ce3f44af26p1e6137jsned76614bc1b6
// let searchInput;

let movieListEl = document.querySelector("#movie__results");
let currentSearch = ''

async function convertApi(userSearch, filter) {
  movieListEl.innerHTML = ""
  const fetchMovies = await fetch(`http://www.omdbapi.com/?apikey=f0f446dc&s=${userSearch}`);
  const movieData = await fetchMovies.json();
  let movielist = movieData.Search;

  
  if (filter === "OLD_TO_NEW") {
    movielist.sort((a,b) => a.Year - b.Year)
    // console.log('old to new')
  } else if (filter === "NEW_TO_OLD") {
    movielist.sort((a,b) => b.Year - a.Year)
    // console.log('new to old')
  }
  
  const movieListResponse = movielist.map( (movie) => movieHTML(movie) ).join("");
  movieListEl.innerHTML += movieListResponse 
}

function movieHTML(movie) {
  // check if the movie has a valid poster image URL/ adding default image
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "./assets/404error.jpg";

  return `
  <div class="movie--post">
    <figure class="poster--wrapper">
      <img class="movie--poster" src="${posterUrl}" alt="">
      <p class="movie--year">${movie.Year}</p>
    </figure>
    <h2 class="movie--name">${movie.Title}</h2>
    <h4 class="movie--type">${movie.Type}</h4>
  </div>`;
}

function filterMovieInput(event) {
  const filter = event.target.value;
  convertApi(currentSearch, filter);
}

function searchMovieInput(event) {
  const searchQuery = event.target.value.trim();
  currentSearch = searchQuery;
  convertApi(searchQuery, '');
}

convertApi(); 