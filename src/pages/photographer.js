// Retrieve data from json file
async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

async function getData(id) {
  const { photographers, media } = await loadJSON(
    'src/assets/data/photographers.json',
  );
  const choosedPhotographer = photographers.filter(
    (photographer) => photographer.id === Number(id),
  )[0];

  const choosedMedias = media.filter(
    (mediaObject) => mediaObject.photographerId === Number(id),
  );

  return { choosedPhotographer, choosedMedias };
}
document
  .getElementById('contact-form')
  .addEventListener('submit', (e) => e.preventDefault());

// allow to media modal
async function showModal(medias, mediaId) {
  const body = document.getElementsByTagName('body')[0];
  const mediasModel = mediasFactory(medias);
  const main = document.getElementsByTagName('main')[0];

  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  modal.setAttribute('aria-modal', 'true');
  body.classList.add('overflow-y-hidden');
  main.setAttribute('aria-hidden', 'true');
  const mediaModal = mediasModel.getMediaModal(medias, mediaId);
  modal.innerHTML = mediaModal.outerHTML;

  const closeButton = document.querySelector('#closeButton');
  closeButton.onclick = () => {
    modal.classList.add('hidden');
    modal.setAttribute('aria-modal', 'false');
    main.removeAttribute('aria-hidden');
    body.classList.remove('overflow-y-hidden');
  };

  const currentIndex = medias.findIndex((media) => media.id === mediaId);

  const nextButton = document.getElementById('nextButton');
  nextButton.onclick = () => {
    if (currentIndex + 1 < medias.length) {
      showModal(medias, medias[currentIndex + 1].id);
    } else {
      showModal(medias, medias[0].id);
    }
  };

  const previousButton = document.getElementById('previousButton');
  previousButton.onclick = () => {
    if (currentIndex - 1 >= 0) {
      showModal(medias, medias[currentIndex - 1].id);
    } else {
      showModal(medias, medias[medias.length - 1].id);
    }
  };
}

// display order's select options
function showList() {
  const selectButton = document.getElementById('select-button');
  selectButton.classList.add('hidden');
  const list = document.getElementById('listbox1');
  list.classList.remove('hidden');
}

// close the contact modal
function hideContactFrom() {
  const contactModal = document.getElementById('contact-modal');
  contactModal.classList.add('hidden');

  const main = document.getElementsByTagName('main')[0];
  main.removeAttribute('aria-hidden');

  contactModal.setAttribute('aria-modal', 'false ');

  const contactForm = document.getElementById('contact-form');
  contactForm.reset();
}

// displaying data using factory
async function displayData(photographer, medias, order) {
  const photographHeaderSection = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  photographHeaderSection.innerHTML =
    photographerModel.getPhotographHeader().outerHTML;

  const mediasContainer = document.querySelector('.medias-container');
  const mediasModel = mediasFactory(medias);

  const mediasList = mediasModel.getMediaList(order);
  mediasContainer.innerHTML = mediasList.outerHTML;

  const mediaCards = document.querySelectorAll('.media-illustration');
  mediaCards.forEach((mediaCard) => {
    const mediaCardCopy = mediaCard;
    mediaCardCopy.onclick = () =>
      showModal(medias, Number(mediaCard.id.split('-')[1]));
  });

  const likes = document.getElementById('likes');
  likes.innerHTML = medias.reduce((partialSum, a) => partialSum + a.likes, 0);
  const price = document.getElementById('price');
  price.innerHTML = `${photographer.price}€ / jour`;

  const contactButton = document.getElementById('contact-button');
  const contactModal = document.getElementById('contact-modal');

  contactButton.onclick = () => {
    contactModal.classList.remove('hidden');

    const main = document.getElementsByTagName('main')[0];
    main.setAttribute('aria-hidden', 'true');
    contactModal.setAttribute('aria-modal', 'true');

    const firstname = document.getElementById('firstname');
    firstname.focus();
  };
}

async function init(order = 'likes') {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  const { choosedPhotographer, choosedMedias } = await getData(id);
  displayData(choosedPhotographer, choosedMedias, order);
}

// allow to choose option of order's select with mouse
async function listItemClick(e) {
  const selectedOptionName = e.target.innerText;
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

// allow to choose option of order's select with keyboard
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

init();

document.getElementById('contact-form').addEventListener('submit', (e) => {
  hideContactFrom();
  e.preventDefault();
});

// allow to like or unlike a media
function like(cardId) {
  const card = document.getElementById(`like-${cardId}`);
  const totalLikesCount = document.getElementById(`likes`);

  const regularIcon = card.getElementsByClassName('fa-regular')[0];
  const likesCount = card.getElementsByTagName('p')[0];

  if (regularIcon) {
    regularIcon.classList.remove('fa-regular');
    regularIcon.classList.add('fa-solid');
    likesCount.innerHTML = Number(likesCount.innerHTML) + 1;
    totalLikesCount.innerHTML = Number(totalLikesCount.innerHTML) + 1;
  } else {
    const solidIcon = card.getElementsByClassName('fa-solid')[0];
    solidIcon.classList.remove('fa-solid');
    solidIcon.classList.add('fa-regular');
    likesCount.innerHTML = Number(likesCount.innerHTML) - 1;
    totalLikesCount.innerHTML = Number(totalLikesCount.innerHTML) - 1;
  }
}
