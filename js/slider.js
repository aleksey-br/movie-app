import { featured } from "./featured.js";
const sliderWrap = document.querySelector(".swiper-wrapper");

function renderCardSlider() {
  let template = "";
  featured.forEach((value) => {
    template += `<div class='swiper-slide'><div class="featured__card movie-card">
    <div class="card__poster movie-card__poster">
      <img src="${value.poster}" alt="poster" />
    </div>
    <p class="card__year movie-card__year">${value.year}</p>
    <h4 class="card__title movie-card__title">${value.title}</h4>
    <ul class="card__rating movie-card__rating">
      <li class="card__rating-item movie-card__rating-item">
        <img src="/assets/rating-1.png" alt="rating" />
        <span
          class="card__rating-text movie-card__rating-text"
          >${value.rating[0].imdb}</span
        >
      </li>
      <li class="card__rating-item movie-card__rating-item">
        <img src="/assets/rating-2.png" alt="rating" />
        <span
          class="card__rating-text movie-card__rating-text"
          >${value.rating[1].tomato}</span
        >
      </li>
    </ul>
    <div class="card__genre movie-card__genre">
      ${value.genre.join(", ")}
    </div>
  </div></div>`;
  });

  sliderWrap.innerHTML = template;
}

renderCardSlider();
