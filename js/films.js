const API_KEY = "2d3135f1";

let isModal = false;
const url = (value) => `http://www.omdbapi.com/?${value}&apikey=${API_KEY}`;
const moviesWrap = document.querySelector(".js-movies");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close-button");
const modalContent = document.querySelector(".modal__content");
const getAssign = async (id) => {
  const res = await fetch(url(`i=${id}`));
  const { Year, Genre, Country, Ratings } = await res.json();

  return {
    Year,
    Genre,
    Country,
    Ratings,
  };
};

async function getFilms(value = "happy") {
  try {
    let template = "";
    const res = await fetch(url("s=" + value));
    const { Search } = await res.json();
    console.log(Search);
    if (!Search) {
      moviesWrap.innerHTML =
        '<div style="width:100%;height:100vh;display:flex;justify-content: center;"><span class="loader"></span></div>';
    } else {
      Search.forEach(async (elem) => {
        Object.assign(elem, await getAssign(elem.imdbID));

        template += `<div class="movie-card" data-id="${elem.imdbID}">
      <div class="movie-card__poster">
        <img src="${elem.Poster}" alt="poster" />
      </div>
      <p class=" movie-card__year">${elem.Country}, ${elem.Year}</p>
      <h4 class=" movie-card__title">${elem.Title}</h4>
      <ul class=" movie-card__rating">
      <li class=" movie-card__rating-item">
      <img src="/assets/rating-1.png" alt="rating" />
      <span
        class=" movie-card__rating-text"
        >${elem.Ratings[2]?.Value ?? "Not Found"}</span
      >
    </li>
    <li class=" movie-card__rating-item">
      <img src="/assets/rating-2.png" alt="rating" />
      <span
        class="movie-card__rating-text"
        >${elem.Ratings[1]?.Value ?? "Not Found"}</span
      >
    </li>
      </ul>
      <div class="movie-card__genre">
        ${elem.Genre}
      </div>
    </div>`;
        moviesWrap.innerHTML = template;
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// getFilms();

moviesWrap.addEventListener("click", (event) => {
  isModal = true;
  modal.classList.add("open");
  getOneFilm(event.target.dataset.id);
});

modalCloseButton.addEventListener("click", () => {
  modal.classList.remove("open");
});

async function getOneFilm(id) {
  let template = "";
  const res = await fetch(url("i=" + id));
  const data = await res.json();
  if (!data) {
    modalContent.innerHTML =
      '<div style="width:100%;height:100vh;display:flex;justify-content: center;"><span class="loader"></span></div>';
  } else {
    template = `<div class="movie-card" data-id="${data.imdbID}">
  <div class="movie-card__poster">
    <img src="${data.Poster}" alt="poster" />
  </div>
  <p class=" movie-card__year">${data.Country}, ${data.Year}</p>
  <h4 class=" movie-card__title">${data.Title}</h4>
  <p class="movie-card__description">${data.Plot}</p>
  <ul class=" movie-card__rating">
  <li class=" movie-card__rating-item">
  <img src="/assets/rating-1.png" alt="rating" />
  <span
    class=" movie-card__rating-text"
    >${data.Ratings[2]?.Value ?? "Not Found"}</span
  >
</li>
<li class=" movie-card__rating-item">
  <img src="/assets/rating-2.png" alt="rating" />
  <span
    class="movie-card__rating-text"
    >${data.Ratings[1]?.Value ?? "Not Found"}</span
  >
</li>
  </ul>
  <div class="movie-card__genre">
    ${data.Genre}
  </div>
</div>`;

    modalContent.innerHTML = template;
  }
}

export default getFilms;
