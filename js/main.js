"use strict";
import * as slider from "./slider.js";
import getFilms from "./films.js";

getFilms("happy");

let isTheme = false;
let isLang = "en";
const header = document.querySelector(".header");
const heroButton = document.querySelector(".hero__button");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close-button");
const modalContent = document.querySelector(".modal__content");
const searchInput = document.querySelector(".search-input-js");
const searchButton = document.querySelector(".search__button");
const inputIcon = document.querySelector(".search-icon-js");
const themeButton = document.querySelector(".js-theme-button");
const themeIcon = document.querySelector(".js-theme-icon");
const inputLang = document.querySelector(".js-lang-group");

themeButton.addEventListener("click", changeTheme);
searchInput.addEventListener("input", () => entrySearch());
searchInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    document
      .querySelector(".movies")
      .scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    headerFixed();
  }
});
heroButton.addEventListener("click", () => {
  modal.classList.add("open");
  modalContent.innerHTML = `<iframe width="100%" height="400px" src="https://www.youtube.com/embed/M7XM597XO94?si=Fqwl4lpQCHWtg3nf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
});

modalCloseButton.addEventListener("click", () => {
  modal.classList.remove("open");
  modalContent.innerHTML = "";
});
// swiper

var swiper = new Swiper(".mySwiper", {
  // width: "250px",
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  breakpoints: {
    // when window width is >= 320px
    480: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    // when window width is >= 640px
    1190: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Ввод данных в в инпут и удаление значеия
function entrySearch() {
  console.log(searchInput.value);
  let isValue = searchInput.value.length ? true : false;

  changeIcon(isValue);
  if (isValue) {
    searchButton.addEventListener("click", () => {
      searchInput.value = "";
      isValue = false;
      changeIcon(isValue);
    });
    console.log(searchInput.value);
    getFilms(searchInput.value);
  }
}

function changeTheme() {
  isTheme = !isTheme;
  if (isTheme) {
    themeIcon.setAttribute("href", "/assets/sprite.svg#moon");
    document.body.style.setProperty("--bg-white", "#16111a");
    document.body.style.setProperty("--bg-dark", "#fff");
  } else {
    themeIcon.setAttribute("href", "/assets/sprite.svg#sun");
    document.body.style.setProperty("--bg-white", "#fff");
    document.body.style.setProperty("--bg-dark", "#16111a");
  }
}

// Смена иконки кнопки поиска
function changeIcon(isValue) {
  if (isValue) {
    inputIcon.setAttribute("href", "/assets/sprite.svg#close");
  } else {
    inputIcon.setAttribute("href", "/assets/sprite.svg#search");
  }
}
window.addEventListener("scroll", () => headerFixed());
function headerFixed() {
  if (window.scrollY > 170) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
}

// inputLang.addEventListener("change", (event) => {
//   Array.from(event.currentTarget.children).forEach((label) => {
//     label.classList.remove("lang-active");
//   });
//   isLang = event.target.value;

//   event.target.parentNode.classList.add("lang-active");
// });
