function photographerFactory({
  id,
  name,
  portrait,
  country,
  city,
  tagline,
  price,
}) {
  const picture = `src/assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const html = document.createElement('div');
    html.innerHTML = `<a href="/photographer.html?id=${id}" class="w-full lg:w-3/12">
      <article class="flex flex-col items-center">
        <div class="overflow-hidden rounded-full aspect-square w-56  shadow-md">
          <img id="image-${id}" src="" alt="" class="object-cover h-full w-full" />
        </div>
        <h2 id="name-${id}" class="text-secondary text-2xl mt-6"></h2>
        <p id="location-${id}" class="text-primary text-lg"></p>
        <p id="tagline-${id}" class="text-base"></p>
        <p id="price-${id}" class="text-sm text-gray">€/jour</p>
      </article>
      </a>`;

    html.querySelector(`#image-${id}`).setAttribute('src', picture);
    html.querySelector(`#image-${id}`).setAttribute('alt', name);
    html.querySelector(`#name-${id}`).textContent = name;
    html.querySelector(`#location-${id}`).textContent = `${city}, ${country}`;
    html.querySelector(`#tagline-${id}`).textContent = tagline;
    html.querySelector(`#price-${id}`).textContent = `${price}€/jour`;

    return html;
  }

  function getPhotographHeader() {
    const html = document.createElement('div');

    html.innerHTML = `<div class="flex flex-col lg:flex-row justify-between items-center mt-16 px-12 py-16 rounded-md bg-lightGray gap-4">
        <div class="flex flex-col gap-4">
          <h1 id="name" class="text-secondary text-4xl"></h1>
          <p id="location" class="text-primary text-2xl"></p>
          <p id="tagline" class="text-xl text-darkGray"></p>
        </div>
        <button id="contact-button" class="bg-primary rounded-md text-white px-3 py-5">Contactez-moi</button>
        <div class="overflow-hidden rounded-full aspect-square w-56 shadow-lg">
          <img
            id="image"
            src=""
            alt=""
            class="object-cover h-full w-full"
          />
        </div>
        </div>`;

    html.querySelector('#image').setAttribute('src', picture);
    html.querySelector('#image').setAttribute('alt', name);
    html.querySelector('#name').textContent = name;
    html.querySelector('#location').textContent = `${city}, ${country}`;
    html.querySelector('#tagline').textContent = tagline;

    return html;
  }

  return { name, picture, getUserCardDOM, getPhotographHeader };
}
