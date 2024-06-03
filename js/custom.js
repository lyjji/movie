const movieApiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const movieLanguage = "ko-KR";

// 모든 fetch 요청을 배열에 저장
const fetchRequests = [
  fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${movieApiKey}&language=${movieLanguage}`
  ),
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${movieApiKey}&language=${movieLanguage}`
  ),
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${movieApiKey}&language=${movieLanguage}`
  ),
];

// Promise.all을 사용하여 모든 fetch 요청을 병렬로 실행
Promise.all(fetchRequests)
  .then((responses) =>
    Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error("네트워크 상태가 좋지 않습니다.");
        }
        return response.json();
      })
    )
  )
  .then((data) => {
    // 인기순
    const popularMovies = data[0].results.slice(0, 5);
    const popularListHTML = popularMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#popular ul").innerHTML = popularListHTML;

    // 평점순
    const topRatedMovies = data[1].results.slice(0, 5);
    const topRatedListHTML = topRatedMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#best ul").innerHTML = topRatedListHTML;

    // 개봉예정
    const nowPlayingMovies = data[2].results.slice(0, 5);
    const nowPlayingListHTML = nowPlayingMovies
      .map((movie) => createListItemHTML(movie))
      .join("");
    document.querySelector("#new ul").innerHTML = nowPlayingListHTML;

    // 모든 영화 목록이 생성된 후에 찜하기 버튼 이벤트 리스너 추가
    addWishlistEventListeners();
  })
  .catch((error) => {
    console.error("오류 발생:", error);
  });

// 영화 정보를 HTML 문자열로 변환
function createListItemHTML(movie) {
  return `<li> 
            <div class="posterhover"> 
              <h3 class="posttitle">${movie.title}</h3> 
              <p class="postp">${movie.overview}</p> 
              <h4 class="postrate"><i class="fa-solid fa-star"></i> ${movie.vote_average.toFixed(
                1
              )}점</h4> 
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title} 포스터"> 
            </div>
            <div> 
              <button class="wishlist-button" data-movie-id="${
                movie.id
              }" data-title="${movie.title}" data-overview="${
    movie.overview
  }" data-poster="https://image.tmdb.org/t/p/w500${movie.poster_path}"> 
                <i class="fa-regular fa-heart"></i> 찜하기 
              </button> 
              <p><a href="#" class="detail-btn" data-id="${
                movie.id
              }">상세보기</a></p> 
            </div> 
          </li>`;
}

// 찜하기 버튼 토글
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

// likescript
console.log("likelist.js 로드됨");

const wishlist = []; // 전역 변수로 wishlist 배열 선언

function addToWishlist(movieId, title, overview, poster) {
  var movie = {
    id: movieId,
    title: title,
    overview: overview,
    poster: poster,
  };

  var index = wishlist.findIndex((m) => m.id === movieId);
  var button = document.querySelector(
    `.wishlist-button[data-movie-id="${movieId}"]`
  );

  if (index === -1) {
    wishlist.push(movie);
    alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    if (button) button.classList.add("active");
  } else {
    wishlist.splice(index, 1);
    alert(`${title}이(가) 찜 목록에서 제거되었습니다.`);
    if (button) button.classList.remove("active");
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

window.addWishlistEventListeners = addWishlistEventListeners;
