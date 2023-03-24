async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

async function getData(id) {
  let photographers = [];
  let medias = [];

  await loadJSON('src/assets/data/photographers.json').then((response) => {
    photographers = response.photographers;
    medias = response.media;
  });

  const choosedPhotographer = photographers.filter(
    (photographer) => photographer.id === parseInt(id, 10)
  )[0];

  const choosedMedias = medias.filter(
    (media) => media.photographerId === parseInt(id, 10)
  );

  return { choosedPhotographer, choosedMedias };
}

async function displayData(photographer, medias) {
  const photographHeaderSection = document.querySelector('.photograph-header');

  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.getPhotographHeader();
  photographHeaderSection.innerHTML = photographHeader;

  const mediasContainer = document.querySelector('.medias-container');
  const mediasModel = mediasFactory(medias);

  const orderSelect = document.getElementById('order-select');

  console.log(orderSelect.value);
  const mediasList = mediasModel.getMediaList(orderSelect.value);

  mediasContainer.innerHTML = mediasList;
}

async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const { choosedPhotographer, choosedMedias } = await getData(id);

  displayData(choosedPhotographer, choosedMedias);
}

init();

document.addEventListener(
  'input',
  function (event) {
    if (event.target.id !== 'order-select') return;
    init();
  },
  false
);
