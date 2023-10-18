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

async function displayData(photographer, medias, order) {
  const photographHeaderSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.getPhotographHeader();
  photographHeaderSection.innerHTML = photographHeader;

  const mediasContainer = document.querySelector('.medias-container');
  const mediasModel = mediasFactory(medias);

  const mediasList = mediasModel.getMediaList(order);

  mediasContainer.innerHTML = mediasList;

  const mediaCards = document.querySelectorAll('.media-card');
  mediaCards.forEach((mediaCard) => {
    mediaCard.onclick = () => showModal(medias, mediaCard.id);
  });

  const likes = document.getElementById('likes');
  likes.innerHTML = medias.reduce((partialSum, a) => partialSum + a.likes, 0);
  const price = document.getElementById('price');
  price.innerHTML = `${photographer.price}€ / jour`;

  const contactButton = document.getElementById('contact-button');
  const contactModal = document.getElementById('contact-modal');

  contactButton.onclick = () => {
    contactModal.classList.remove('hidden');
  };
}

async function init(order = 'likes') {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const { choosedPhotographer, choosedMedias } = await getData(id);
  displayData(choosedPhotographer, choosedMedias, order);
}

async function listItemClick(e) {
  let selectedOptionName = e.target.innerText;
  const selectValue = document.getElementById('select-value');

  if (selectedOptionName === 'Popularité') {
    selectValue.innerHTML = selectedOptionName;
    init('likes');
  } else if (selectedOptionName === 'Date') {
    selectValue.innerHTML = selectedOptionName;
    init('date');
  } else if (selectedOptionName === 'Titre') {
    selectValue.innerHTML = selectedOptionName;
    init('title');
  }
  const selectButton = document.getElementById('select-button');
  selectButton.classList.remove('hidden');
  const list = document.getElementById('listbox1');
  list.classList.add('hidden');
}

async function listItemKeydown(e) {
  const selectValue = document.getElementById('select-value');

  if (e.key === '1') {
    selectValue.innerHTML = 'Popularité';
    init('likes');
  } else if (e.key === '2') {
    selectValue.innerHTML = 'Date';
    init('date');
  } else if (e.key === '3') {
    selectValue.innerHTML = 'Titre';
    init('title');
  }
  const selectButton = document.getElementById('select-button');
  selectButton.classList.remove('hidden');
  const list = document.getElementById('listbox1');
  list.classList.add('hidden');
}

function showList() {
  const selectButton = document.getElementById('select-button');
  selectButton.classList.add('hidden');
  const list = document.getElementById('listbox1');
  list.classList.remove('hidden');
}

function hideContactFrom() {
  const contactModal = document.getElementById('contact-modal');
  contactModal.classList.add('hidden');
}
init();

document
  .getElementById('contact-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(
      document.getElementById('firstname').value,
      document.getElementById('lastname').value,
      document.getElementById('email').value,
      document.getElementById('message').value
    );
  });

function like(cardId) {
  const card = document.getElementById(cardId);
  // Je recupere le nom de like de la carte
  // j'incremente
  // je replace
  // je remplace l'icone
  // disabled le button
}
