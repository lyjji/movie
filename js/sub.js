// 필터
let hmenu = document.querySelectorAll(".hmenu li");
const filC = document.querySelectorAll(".filC li");
let subtitle = document.querySelector("#subtitle");

// cID 변경
const urlid = new URLSearchParams(window.location.search);
let cID = urlid.get("value");
console.log(cID);

let subname = ``;

if (cID == "popular") {
  // console.log(0);
  for (j of filC) {
    j.classList.remove("on");
  }

  filC[0].classList.add("on");

  for (j of hmenu) {
    j.classList.remove("on");
  }

  hmenu[0].classList.add("on");

  subname = `인기순`;
} else if (cID == "top_rated") {
  // console.log(1);
  for (j of filC) {
    j.classList.remove("on");
  }

  filC[1].classList.add("on");

  for (j of hmenu) {
    j.classList.remove("on");
  }

  hmenu[1].classList.add("on");

  subname = `평점순`;
} else if (cID == "upcoming") {
  // console.log(2);

  for (j of filC) {
    j.classList.remove("on");
  }

  filC[2].classList.add("on");

  for (j of hmenu) {
    j.classList.remove("on");
  }

  hmenu[2].classList.add("on");

  subname = `개봉예정`;
}

subtitle.textContent = subname;

// 스크롤 다운시 필터
let filop = document.querySelector(".filopen");
let fil = document.querySelector("#filter");
let filout = document.querySelector(".filOff");

let con = document.querySelector("#container");

window.addEventListener("scroll", function () {
  let sc = document.documentElement.scrollTop; //현재 스크롤 위치
  //   console.log(sc);

  let scCon = con.offsetTop + 1; //container 위치

  if (sc > scCon) {
    filop.classList.add("scDown");
    fil.classList.add("scDown");
  } else {
    filop.classList.remove("scDown");
    fil.classList.remove("scDown");
  }
});

// 팝콘 아이콘 클릭시 필터 토글

filop.addEventListener("click", () => {
  fil.classList.add("on");
  con.classList.add("filon");
});

filout.addEventListener("click", () => {
  fil.classList.remove("on");
  con.classList.remove("filon");
});

// api 연결

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzU2OGU2MTc2YjY5ZGUxZDY1MDZmZTc0ZWJlOWVkMCIsInN1YiI6IjY2NGQ0MzE3ZDI1MjFhZDVhZTEzZGE3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sMbCcOmI7GWaOhYy8b4PpP2HUhVX2aEDudvL7bXoV4k",
  },
};

//

let page = 1;
let gID = "";

// 카테고리 선택
for (let i = 0; i < filC.length; i++) {
  filC[i].addEventListener("click", (e) => {
    getmovie(e); //선택시 영화목록 갱신

    for (j of filC) {
      j.classList.remove("on");
    }

    filC[i].classList.add("on");

    for (j of hmenu) {
      j.classList.remove("on");
    }

    hmenu[i].classList.add("on");
  });
}

// 영화 출력
const getmovie = async (e) => {
  // 카테고리 선택(제목 바꾸기)
  subname = `인기순`;

  if (e) {
    cID = e.target.id;

    if (cID == "popular") {
      subname = `인기순`;
    } else if (cID == "top_rated") {
      subname = `평점순`;
    } else if (cID == "upcoming") {
      subname = `개봉예정`;
    }

    subtitle.textContent = subname;
  }

  // 영화 api
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${cID}?language=ko-KR&page=${page}`,
    options
  );

  let data = await response.json();

  let mList = data.results;
  // console.log(mList);

  let show = "";

  for (let i = 0; i < mList.length; i++) {
    show += `<li>
    <div class="posterhover">
      <h3 class="posttitle">${mList[i].title}</h3>
      <p class="postp">${mList[i].overview}</p>
      <h4 class="postrate"><i class="fa-solid fa-star"></i> ${mList[
        i
      ].vote_average.toFixed(1)}점</h4>
      <img src="https://image.tmdb.org/t/p/w500${mList[i].poster_path}" alt="${
      mList[i].title
    } 포스터"/>
    </div>
    <div>
    <button class="wishlist-button" data-movie-id="${
      mList[i].id
    }" data-title="${mList[i].title}" data-overview="${
      mList[i].overview
    }" data-poster="https://image.tmdb.org/t/p/w500${mList[i].poster_path}">
    <i class="fa-regular fa-heart"></i> 찜하기
  </button>
      <p ><a href="#" class="detail-btn" data-id="${
        mList[i].id
      }">상세보기</a></p>
    </div>
  </li>`;
  }

  document.querySelector("#liston").innerHTML = show;

  getgenres(); //장르 목록 출력

  // 찜하기 버튼 이벤트 리스너 추가
  addWishlistEventListeners();
};

getmovie();

// 장르

let filG = document.querySelector(".filG");
let gtitle = document.querySelector(".gtitle");

// 장르목록 불러오기
const getgenres = async () => {
  let load = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=ko-KR",
    options
  );

  let datag = await load.json();
  // console.log(datag);

  let gList = datag.genres;

  let loadgname = "";

  for (let i = 0; i < gList.length; i++) {
    loadgname += `<li id="${gList[i].id}">${gList[i].name}</li>`;
  }

  filG.innerHTML = loadgname;
  // console.log(loadgname);

  // 장르 선택(+제목 바꾸기)
  let genre = document.querySelectorAll(".filG li");
  let gname = "";

  for (let i = 0; i < genre.length; i++) {
    genre[i].addEventListener("click", (g) => {
      for (j of genre) {
        j.classList.remove("on");
      }
      genre[i].classList.add("on");

      gname = gList[i].name;
      // console.log(gname);

      gtitle.innerHTML = `<i class="fa-solid fa-grip-lines-vertical"></i>${gname}`;

      searchG(g); // 클릭된 장르의 ID 전달 + 장르영화 출력
    });
  }
};

getgenres();

// 장르 영화 불러오기
const searchG = async (g) => {
  // 장르id
  if (g) {
    gID = g.target.id;
  }
  console.log(cID);
  console.log(gID);

  // 영화 32p 불러오기
  let gloads = [];

  for (let p = 1; p <= 32; p++) {
    page = p;

    let gload = fetch(
      `https://api.themoviedb.org/3/movie/${cID}?language=ko-KR&page=${page}`,
      options
    ).then((response) => response.json());

    gloads.push(gload);
  }

  let gresponse = await Promise.all(gloads); //Promise.all 사용해 32 페이지를 병렬로 처리

  // 리스트에 받기
  let mgLists = [];

  for (ps of gresponse) {
    mgLists.push(ps.results);
  }
  // console.log(mgLists); //영화 32p

  // 페이지 안에 장르영화 찾기
  let gListon = [];

  for (let p = 0; p < mgLists.length; p++) {
    for (mG of mgLists[p]) {
      if (mG.genre_ids.includes(parseInt(gID))) {
        gListon.push(mG);
      }
    }
  }

  // 장르영화 페이지 1
  let gListon1 = gListon.slice(0, 20);
  // console.log(gListon1);

  // html에 추가
  let mgshow = "";

  for (let i = 0; i < gListon1.length; i++) {
    mgshow += `<li>
          <div class="posterhover">
            <h3 class="posttitle">${gListon1[i].title}</h3>
            <p class="postp">${gListon1[i].overview}</p>
            <h4 class="postrate"><i class="fa-solid fa-star"></i> ${gListon1[
              i
            ].vote_average.toFixed(1)}점</h4>
            <img src="https://image.tmdb.org/t/p/w500${
              gListon1[i].poster_path
            } " alt="${gListon1[i].title} 포스터" />
          </div>
          <div>
          <button class="wishlist-button" data-movie-id="${
            gListon1[i].id
          }" data-title="${gListon1[i].title}" data-overview="${
      gListon1[i].overview
    }" data-poster="https://image.tmdb.org/t/p/w500${
      gListon1[i].poster_path
    }"><i class="fa-regular fa-heart"></i> 찜하기</button>
            <p><a href="#" class="detail-btn" data-id="${
              gListon1[i].id
            }">상세보기</a></p>
          </div>
        </li>`;
  }

  document.querySelector("#liston").innerHTML = mgshow;

  // 모든 영화 목록이 생성된 후에 찜하기 버튼 이벤트 리스너 추가
  addWishlistEventListeners();
};
