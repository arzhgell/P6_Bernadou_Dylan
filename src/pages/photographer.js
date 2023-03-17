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
  photographHeaderSection.innerHTML += photographHeader;

  const mediasContainer = document.querySelector('.medias-container');

  medias.forEach((media) => {
    const mediasModel = mediasFactory(media);
    const mediaCard = mediasModel.getMediaCard();
    mediasContainer.innerHTML += mediaCard;
  });
}

async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const { choosedPhotographer, choosedMedias } = await getData(id);

  displayData(choosedPhotographer, choosedMedias);
}

init();
