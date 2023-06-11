const mainContent = document.getElementById('anime-content');
const form = document.getElementById('search-form');
const search = document.getElementById('search');
const pageLinks = document.querySelectorAll('.page-link');

// Initially get the anime list's first page
getAnime(API_URL, page);

// Previous and next page
pageLinks.forEach((pageLink) => {
  pageLink.addEventListener('click', () => {
    if (pageLink.id === 'next') {
      page++;
      getAnime(API_URL, page);
    }
    if (pageLink.id === 'previous' && page > 1) {
      page--;
      getAnime(API_URL, page);
    }
  });
});

// Search for an anime
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = search.value;
  if (query) {
    const searchURL = `${API_URL}?filter[text]=${query}`;
    getAnime(searchURL, page);
  }
});

async function getAnime(url, page) {
  const response = await fetch(`${url}?page[limit]=20&page[offset]=${(page - 1) * 20}`);
  const responseData = await response.json();
  showAnime(responseData.data);
}

function showAnime(animeData) {
  mainContent.innerHTML = '';
  animeData.forEach((anime) => {
    const animeTitle = anime.attributes.canonicalTitle;
    const animePoster = anime.attributes.posterImage ? anime.attributes.posterImage.original : 'https://via.placeholder.com/300';
    const animeGenres = anime.attributes.genres ? anime.attributes.genres.join(', ') : 'Unknown';
    const animeDescription = anime.attributes.description ? anime.attributes.description : 'No description available.';
    const animeElm = document.createElement('div');
    animeElm.classList.add('col-anime', 'p-0');
    animeElm.innerHTML = `
      <div class="anime-card">
        <img class="img-fluid anime-img" src="${animePoster}" alt="${animeTitle}">
        <div class="anime-description p-3">
          <h3 class="anime-title">${animeTitle}</h3>
          <p class="anime-genres"><strong>Genres:</strong> ${animeGenres}</p>
          <p class="anime-desc"><strong>Description:</strong> ${animeDescription}</p>
        </div>
      </div>
    `;
    mainContent.appendChild(animeElm);
  });
}
