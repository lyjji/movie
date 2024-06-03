// 모달 요소
const movieModal = document.querySelector("#movieModal");
const modalTitle = document.getElementById("modal-title");
const modalImg = document.getElementById("modal-img");
const modalOverview = document.getElementById("modal-overview");
const modalRate = document.getElementById("modal-rate");
const span = document.querySelector("#mclose");

// 모달 닫기
span.onclick = function () {
  movieModal.style.display = "none";
};

// 모달 박스 상세보기 기능 추가
// api key
const ApiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const Language = "ko-KR";

// 상세보기(modalBox)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("detail-btn")) {
    event.preventDefault();
    const movieId = event.target.dataset.id;

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${ApiKey}&language=${Language}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("네트워크 상태가 좋지 않습니다.");
        }
        return response.json();
      })
      .then((movie) => {
        // 영화의 개봉일과 장르 정보 가져오기
        const genreNames = movie.genres.map((genre) => genre.name).join(", ");

        // 개봉일을 형식에 맞게 포맷팅
        const releaseDate = new Date(movie.release_date);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const formattedReleaseDate = `${releaseDate.getDate()} ${
          monthNames[releaseDate.getMonth()]
        } ${releaseDate.getFullYear()}`;

        // 영화의 러닝타임을 가져와서 모달에 표시 (시간과 분으로 분리하지 않고 총 분으로 표시)

        const runtime = movie.runtime;
        const formattedRuntime = `${runtime}분`;
        document.getElementById("modal-runtime").textContent = formattedRuntime;

        // 모달에 개봉일과 장르 정보 표시

        modalTitle.textContent = movie.title;
        modalImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        modalOverview.textContent = movie.overview;
        modalRate.textContent = movie.vote_average.toFixed(1);
        document.getElementById("modal-genre").textContent = genreNames;
        document.getElementById("modal-release-date").textContent =
          formattedReleaseDate;
        movieModal.style.display = "block";
      });
  }
});
