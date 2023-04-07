function photographerFactory(data) {
  const { id, name, portrait, country, city, tagline, price } = data;

  const picture = `src/assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const html = `<a href="/photographer.html?id=${id}" class="w-3/12">
      <article class="flex flex-col items-center">
        <div class="overflow-hidden rounded-full aspect-square w-56  shadow-md">
          <img src="${picture}" alt="${name}" class="object-cover h-full w-full" />
        </div>
        <h2 class="text-secondary text-xl mt-6">${name}</h2>
        <p class="text-primary text-lg">${city}, ${country}</p>
        <p class="text-base">${tagline}</p>
        <p class="text-sm text-gray">${price}€/jour</p>
      </article>
      </a>`;

    return html;
  }

  function getPhotographHeader() {
    const html = `<div class="flex justify-between items-center mt-16 px-12 py-16 rounded-md bg-lightGray">
        <div class="flex flex-col gap-4">
          <h1 class="text-secondary text-4xl">${name}</h1>
          <p class="text-primary text-2xl">
            ${city}, ${country}
          </p>
          <p class="text-xl text-darkGray">${tagline}</p>
        </div>
        <button id="contact-button" class="bg-primary rounded-md text-white px-3 py-5">Contactez-moi</button>
        <div class="overflow-hidden rounded-full aspect-square w-56 shadow-lg">
          <img
            src="${picture}"
            alt="${name}"
            class="object-cover h-full w-full"
          />
        </div>
      </div>`;

    return html;
  }

  return { name, picture, getUserCardDOM, getPhotographHeader };
}
