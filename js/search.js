const searchApiKey = "f4b8cdacf728c6b2bd25248d6dd6d6a7";
const searchLanguage = "ko-KR";

// index >> search
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search.html?query=${encodeURIComponent(query)}`;
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
    }
  });

  const searchKeyword = getQueryParameter("query");
  const searchTitle = document.getElementById("searchTitle");
  if (searchKeyword) {
    searchTitle.textContent = `"${searchKeyword}" 검색결과`;
    searchMovies(searchKeyword);
  }
});

function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function searchMovies(query) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${searchApiKey}&language=${searchLanguage}&query=${encodeURIComponent(
      query
    )}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("네트워크 상태가 좋지 않습니다.");
      }
      return response.json();
    })
    .then((data) => {
      const resultsDiv = document.querySelector("#results");
      resultsDiv.innerHTML = ""; // 기존 결과 제거

      data.results.forEach((movie) => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        if (movie.poster_path) {
          const poster = document.createElement("img");
          poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
          poster.alt = `${movie.title} 포스터`;
          movieDiv.appendChild(poster);
        }

        const detailsDiv = document.createElement("div");

        const title = document.createElement("h2");
        title.textContent = `${movie.title} (${
          movie.release_date
            ? movie.release_date.split("-")[0]
            : "개봉일 정보 없음"
        })`;

        const rating = document.createElement("p");
        const starIcon = document.createElement("i");
        starIcon.classList.add("fa-solid", "fa-star", "yellow"); // 여기서 "yellow"는 아이콘의 색상을 노랑색으로 지정하는 클래스명입니다.

        rating.appendChild(starIcon);
        rating.innerHTML += ` ${movie.vote_average.toFixed(1)} / 10`;

        const overview = document.createElement("div");
        overview.classList.add("overview");
        const overviewText = document.createElement("p");
        overviewText.textContent = movie.overview
          ? movie.overview
          : "줄거리 정보 없음";
        overview.appendChild(overviewText);

        if (movie.overview.length > 100) {
          const shortOverview = movie.overview.substring(0, 100) + "...";
          overviewText.textContent = shortOverview;
          const moreLink = document.createElement("a");
          moreLink.href = "#";
          moreLink.textContent = "더보기";
          moreLink.classList.add("more-link");
          moreLink.dataset.fullOverview = movie.overview;
          overview.appendChild(moreLink);
        }

        detailsDiv.appendChild(title);
        detailsDiv.appendChild(rating);
        detailsDiv.appendChild(overview);
        movieDiv.appendChild(detailsDiv);

        resultsDiv.appendChild(movieDiv);
      });
    })
    .catch((error) => {
      console.error("검색 오류 발생:", error);
    });
}

// 영화 줄거리 더보기 링크를 클릭했을 때 이벤트 처리
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("more-link")) {
    const overviewText = event.target.dataset.fullOverview;
    event.target.previousElementSibling.textContent = overviewText;
    event.target.style.display = "none"; // 더보기 링크 숨기기
    event.preventDefault(); // 기본 동작 방지
  }
});
