console.log("likelist.js 로드됨");

// 찜하기 하트 토글
function addWishlistEventListeners() {
  const wishlistButtons = document.querySelectorAll(".wishlist-button");

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const movieId = parseInt(button.dataset.movieId);
      const title = button.dataset.title;
      const overview = button.dataset.overview;
      const poster = button.dataset.poster;
      addToWishlist(movieId, title, overview, poster);

      // 찜하기 버튼의 상태를 업데이트
      if (button.classList.contains("active")) {
        button.classList.remove("active");
      } else {
        button.classList.add("active");
      }
    });
  });
}

// 찜 목록 추가,제거 메세지
const wishlist = [];

function addToWishlist(movieId, title, overview, poster) {
  var movie = {
    id: movieId,
    title: title,
    overview: overview,
    poster: poster,
  };
  console.log(movie);

  var index = wishlist.findIndex((m) => m.id === movieId);
  var button = document.querySelector(
    `.wishlist-button[data-movie-id="${movieId}"]`
  );

  if (index === -1) {
    wishlist.push(movie);
    alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
  } else {
    wishlist.splice(index, 1);
    alert(`${title}이(가) 찜 목록에서 제거되었습니다.`);
  }

  updateWishlistModal();
}

function updateWishlistModal() {
  var wishlistContainer = document.getElementById("wishlist");
  if (!wishlistContainer) {
    console.log("wishlistContainer를 찾을 수 없음");
    return;
  }

  wishlistContainer.innerHTML = wishlist
    .map(function (movie) {
      return `
      <li>
        <img src="${movie.poster}" alt="${movie.title}">
        <span>${movie.title}</span>
      </li>
    `;
    })
    .join("");
}

// 리스트 보이기
function openWishlistModal() {
  var modal = document.getElementById("wishlistModal");
  updateWishlistModal();
  modal.style.display = "block";
}

// 리스트 숨기기
function closeModals() {
  var modals = document.querySelectorAll(".modal");
  modals.forEach(function (modal) {
    modal.style.display = "none";
  });
}

//사람 아이콘(토글)
var wishlistButton = document.getElementById("wishlistButton");

if (wishlistButton) {
  wishlistButton.addEventListener("click", openWishlistModal);
}

var closeButtons = document.querySelectorAll(".modal .close");
closeButtons.forEach(function (button) {
  button.addEventListener("click", closeModals);
});

window.addWishlistEventListeners = addWishlistEventListeners;
