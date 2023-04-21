function mediasFactory(data) {
  function getMediaCard({ id, title, image, likes }) {
    const picture = `src/assets/medias/${image ? image : 'play.png'}`;

    const html = `<button id="${id}" class="media-card w-full lg:w-3/12 flex flex-col" >
      <div class="aspect-square rounded-lg overflow-hidden">
        <img src="${picture}" alt=${title} class="w-full h-full object-cover" />
      </div>
      <div class="flex justify-between items-center w-full">
        <p class="text-2xl text-primary truncate w-8/12">${title}</p>
        <div class="flex items-center gap-2">
          <p class="text-2xl font-bold text-primary">${likes}</p>
          <i class="fa-solid fa-heart fa-xl text-primary"></i>
        </div>
      </div>
    </button>`;

    return html;
  }

  function getMediaList(sort) {
    let html = ``;
    const medias = data.sort((a, b) => {
      switch (sort) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'title':
          return a.title < b.title ? -1 : 1;
        default:
          return b[sort] - a[sort];
      }
    });

    medias.forEach((media) => {
      html += getMediaCard(media);
    });

    return html;
  }

  function getMediaModal(medias, mediaId) {
    const choosenMedia = medias.filter((media) => {
      return media.id == mediaId;
    })[0];
    const media = choosenMedia.image
      ? `<img src="src/assets/medias/${choosenMedia.image}" alt="${choosenMedia.title}" class="w-full h-full object-cover" />`
      : `<video controls class="w-full h-full object-cover"><source src="src/assets/medias/${choosenMedia.video}" type="video/mp4" /></video>`;

    const html = `
    <div class="flex flex-col bg-white h-5/6 w-full lg:w-10/12 shadow-sm rounded-lg items-end">
      <button id="closeButton" class="text-primary relative right-5 text-3xl">X</button>
      <div class="flex h-full w-full">
        <div class="w-2/12 flex flex-col items-center justify-center text-primary text-4xl">
          <button id="previousButton"><</button>
        </div>
        <div class="w-8/12 flex flex-col justify-center">
          <div class="h-5/6 overflow-hidden">
            ${media}
          </div>
          <p class="text-primary text-xl text-left">${choosenMedia.title}</p>
        </div>
        <div class="w-2/12 flex flex-col items-center justify-center text-primary text-4xl">
          <button id="nextButton">></button>
        </div>
      </div>
    </div>`;

    return html;
  }

  return { getMediaList, getMediaModal };
}
