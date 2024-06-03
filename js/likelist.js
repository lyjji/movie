console.log("likelist.js 로드됨");

const API_KEY = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const BASE_URL = "https://api.themoviedb.org/3";

function addToWishlist(movieId, title, overview, poster) {
  var movie = {
    id: movieId,
    title: title,
    overview: overview,
    poster: poster,
  };

  var index = wishlist.findIndex((m) => m.id === movieId);

  if (index === -1) {
    wishlist.push(movie);
    alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
  } else {
    wishlist.splice(index, 1);
    alert(`${title}이(가) 찜 목록에서 제거되었습니다.`);
  }

  updateWishlistModal();
}

document.addEventListener("DOMContentLoaded", function () {
  var wishlist = [];

  // addToWishlist 함수를 정의한 후에 addWishlistEventListeners 함수를 호출
  addWishlistEventListeners();

  var index = wishlist.findIndex((m) => m.id === movieId);
  var button = document.querySelector(
    `.wishlist-button[data-movie-id="${movieId}"]`
  );

  if (index === -1) {
    wishlist.push(movie);
    alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    button.classList.add("active"); // 아이콘에 bold 스타일 추가
  } else {
    wishlist.splice(index, 1);
    alert(`${title}이(가) 찜 목록에서 제거되었습니다.`);
    button.classList.remove("active"); // 아이콘에서 bold 스타일 제거
  }

  updateWishlistModal();

  function updateWishlistModal() {
    var wishlistContainer = document.getElementById("wishlist");
    if (!wishlistContainer) {
      console.log("wishlistContainer를 찾을 수 없음");
      return;
    }

    wishlistContainer.innerHTML = "";

    wishlist.forEach(function (movie) {
      var li = document.createElement("li");

      var posterElement = document.createElement("img");
      posterElement.src = movie.poster;
      posterElement.alt = movie.title;
      li.appendChild(posterElement);

      var titleSpan = document.createElement("span");
      titleSpan.textContent = movie.title;
      li.appendChild(titleSpan);

      wishlistContainer.appendChild(li);
    });
  }

  function openWishlistModal() {
    var modal = document.getElementById("wishlistModal");
    updateWishlistModal();
    modal.style.display = "block";
  }

  function closeModals() {
    var modals = document.querySelectorAll(".modal");
    modals.forEach(function (modal) {
      modal.style.display = "none";
    });
  }

  var wishlistButton = document.getElementById("wishlistButton");
  if (wishlistButton) {
    wishlistButton.addEventListener("click", openWishlistModal);
  }

  var closeButtons = document.querySelectorAll(".modal .close");
  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeModals);
  });

  window.addWishlistEventListeners = function () {
    const wishlistButtons = document.querySelectorAll(".wishlist-button");
    wishlistButtons.forEach((button) => {
      if (!button.dataset.listenerAdded) {
        button.dataset.listenerAdded = "true";
        button.addEventListener("click", function () {
          const movieId = parseInt(button.dataset.movieId);
          const title = button.dataset.title;
          const overview = button.dataset.overview;
          const poster = button.dataset.poster;
          addToWishlist(movieId, title, overview, poster);
        });
      }
    });
  };

  window.addWishlistEventListeners();
});
window.createListItem = function (movie) {
  const listItem = document.createElement("li");

  const posterHover = document.createElement("div");
  posterHover.classList.add("posterhover");

  const postTitle = document.createElement("h3");
  postTitle.classList.add("posttitle");
  postTitle.textContent = movie.title;

  const postP = document.createElement("p");
  postP.classList.add("postp");
  postP.textContent = movie.overview;

  const postRate = document.createElement("h4");
  postRate.classList.add("postrate");
  postRate.innerHTML = `<i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
    1
  )}점`;

  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  img.alt = movie.title;

  posterHover.appendChild(postTitle);
  posterHover.appendChild(postP);
  posterHover.appendChild(postRate);
  posterHover.appendChild(img);

  const div = document.createElement("div");
  const likeButton = document.createElement("button");
  likeButton.classList.add("wishlist-button");
  likeButton.dataset.movieId = movie.id;
  likeButton.dataset.title = movie.title;
  likeButton.dataset.overview = movie.overview;
  likeButton.dataset.poster = img.src;
  likeButton.innerHTML = `<i class="fa-regular fa-heart"></i> 찜하기`;

  div.appendChild(likeButton);

  const detailButton = document.createElement("p");
  detailButton.innerHTML = `<a href="#" class="detail-btn" data-id="${movie.id}">상세보기</a>`;
  div.appendChild(detailButton);

  listItem.appendChild(posterHover);
  listItem.appendChild(div);

  return listItem;
};
