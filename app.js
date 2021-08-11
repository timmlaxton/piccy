const auth = "563492ad6f917000010000012b46a0cc8f624fd08a8b22799aa58f99";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
let fetchLink;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchApi = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  const data = fetchApi(
    `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
  );
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
