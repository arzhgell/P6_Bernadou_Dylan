function mediasFactory(data) {
  function getMediaCard({ title, image, likes }) {
    const picture = `src/assets/medias/${image}`;

    const html = `<div class="w-3/12 flex flex-col">
      <div class="aspect-square rounded-lg overflow-hidden">
        <img src="${picture}" alt=${title} class="w-full h-full object-cover" />
      </div>
      <div class="flex justify-between items-center">
        <p class="text-2xl text-primary">${title}</p>
        <div class="flex items-center">
          <p class="text-2xl font-bold text-primary">${likes}</p>
          <i class="fa-solid fa-heart fa-xl text-primary"></i>
        </div>
      </div>
    </div>`;

    return html;
  }

  function getMediaList(sort) {
    let html = ``;
    console.log(sort);
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

    console.log(medias);
    medias.forEach((media) => {
      html += getMediaCard(media);
    });

    return html;
  }

  return { getMediaList };
}
