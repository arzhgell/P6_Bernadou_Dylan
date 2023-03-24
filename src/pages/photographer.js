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

async function showModal(medias, mediaId) {
  const body = document.getElementsByTagName('body')[0];
  const mediasModel = mediasFactory(medias);

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  body.classList.add('overflow-y-hidden');

  modal.innerHTML = mediasModel.getMediaModal(medias, mediaId);

  const closeButton = document.getElementById('closeButton');

  closeButton.onclick = () => {
    modal.classList.add('hidden');
    body.classList.remove('overflow-y-hidden');
  };

  const currentIndex = medias.findIndex((media) => media.id == mediaId);

  const nextButton = document.getElementById('nextButton');
  nextButton.onclick = () => {
    if (currentIndex + 1 < medias.length) {
      showModal(medias, medias[currentIndex + 1].id);
    }
  };

  const previousButton = document.getElementById('previousButton');
  previousButton.onclick = () => {
    if (currentIndex - 1 >= 0) {
      showModal(medias, medias[currentIndex - 1].id);
    }
  };
}

async function displayData(photographer, medias) {
  const photographHeaderSection = document.querySelector('.photograph-header');

  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.getPhotographHeader();
  photographHeaderSection.innerHTML = photographHeader;

  const mediasContainer = document.querySelector('.medias-container');
  const mediasModel = mediasFactory(medias);

  const orderSelect = document.getElementById('order-select');

  const mediasList = mediasModel.getMediaList(orderSelect.value);

  mediasContainer.innerHTML = mediasList;

  const mediaCards = document.querySelectorAll('.media-card');
  mediaCards.forEach((mediaCard) => {
    mediaCard.onclick = () => showModal(medias, mediaCard.id);
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

document.addEventListener(
  'input',
  function (event) {
    if (event.target.id !== 'order-select') return;
    init();
  },
  false
);
