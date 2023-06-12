const API_URL = "https://kitsu.io/api/edge/anime";

const mainContent = document.getElementById("anime-content");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-body");

// Fetch popular anime list
fetch(`${API_URL}?sort=-averageRating&page[limit]=20`)
  .then((response) => response.json())
  .then((data) => {
    const animeList = data.data;
    showAnimeList(animeList);
  })
  .catch((error) => {
    console.error("Error fetching anime list:", error);
  });

// Function to display anime list
function showAnimeList(animeList) {
  mainContent.innerHTML = "";
  animeList.forEach((anime) => {
    const animeId = anime.id;
    const animeTitle = anime.attributes.canonicalTitle;
    const animePoster = anime.attributes.posterImage.small;

    const animeCard = document.createElement("div");
    animeCard.classList.add("col-xs-12", "col-sm-6", "col-md-4", "col-lg-3", "p-0");
    animeCard.innerHTML = `
      <div class="anime-card">
        <img class="img-fluid anime-img" src="${animePoster}" alt="${animeTitle}" data-anime-id="${animeId}">
        <div class="anime-description p-3 d-flex justify-content-between align-items-center">
          <h3 class="anime-title">${animeTitle}</h3>
        </div>
      </div>
    `;
    mainContent.appendChild(animeCard);
  });
}

// Function to display anime details in the modal
function showAnimeDetails(animeId) {
  // Fetch anime details from Kitsu API
  fetch(`${API_URL}/${animeId}`)
    .then((response) => response.json())
    .then((data) => {
      const anime = data.data;
      const animeTitle = anime.attributes.canonicalTitle;
      const animeSynopsis = anime.attributes.synopsis;

      // Update modal content with anime details
      modalContent.innerHTML = `
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${animeTitle}</h2>
        <p>${animeSynopsis}</p>
      `;

      // Show modal
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching anime details:", error);
    });
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Add event listener to anime images
mainContent.addEventListener("click", (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("anime-img")) {
    const animeId = clickedElement.dataset.animeId;
    showAnimeDetails(animeId);
  }
});
