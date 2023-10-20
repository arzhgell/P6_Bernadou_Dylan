// tool function for load JSON content
async function loadJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// retrieve photographer data from json file
async function getPhotographers() {
  let photographers = [];

  await loadJSON('src/assets/data/photographers.json').then((response) => {
    photographers = response.photographers;
  });

  return photographers;
}

// display photographer data fetch in json as card in div .photographer_section
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const photographers = await getPhotographers();

  displayData(photographers);
}

init();
