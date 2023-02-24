function photographerFactory(data) {
  const { name, portrait, country, city, tagline, price } = data;

  const picture = `src/assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const html = `<article class="w-3/12 flex flex-col items-center">
        <div class="overflow-hidden rounded-full aspect-square w-7/12 shadow-md">
          <img src="${picture}" alt="${name}" class="object-cover h-full w-full" />
        </div>
        <h2 class="text-secondary text-xl mt-6">${name}</h2>
        <p class="text-primary text-lg">${city}, ${country}</p>
        <p class="text-base">${tagline}</p>
        <p class="text-sm text-gray">${price}€/jour</p>
      </article>`;

    const userCard = new DOMParser().parseFromString(html, 'text/html').body
      .firstChild;

    return userCard;
  }

  return { name, picture, getUserCardDOM };
}
