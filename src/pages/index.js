async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

async function getPhotographers() {
  let photographers = [];

  await loadJSON('src/assets/data/photographers.json').then((response) => {
    photographers = response.photographers;
  });

  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographersSection.innerHTML += userCardDOM;
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();

  displayData(photographers);
}

init();
