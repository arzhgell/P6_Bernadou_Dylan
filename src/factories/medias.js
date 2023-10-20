function mediasFactory(data) {
  function getMediaCard({ id, title, image, likes, video }) {
    let media;

    if (image) {
      const img = document.createElement('img');
      img.setAttribute('src', `src/assets/medias/${image}`);
      img.setAttribute('alt', title);
      img.classList.add('w-full', 'h-full', 'object-cover');
      media = img;
    } else {
      const source = document.createElement('source');
      source.setAttribute('src', `src/assets/medias/${video}`);
      source.setAttribute('type', 'video/mp4');

      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.classList.add('w-full', 'h-full', 'object-cover');
      video.appendChild(source);
      media = video;
    }

    const html = document.createElement('div');
    html.classList.add('media-card', 'w-full', 'lg:w-3/12', 'flex', 'flex-col');
    html.innerHTML = `
      <button id="illustration-${id}" class="media-illustration aspect-square rounded-lg overflow-hidden"></button>
      <div class="flex justify-between items-center w-full">
        <p id="title-${id}" class="text-2xl text-primary truncate text-left w-8/12"></p>
        <button id="like-${id}" class="flex items-center gap-2">
          <p id="likescount-${id}" class="text-2xl font-bold text-primary"></p>
          <em class="fa-regular fa-heart fa-xl text-primary"></em>
        </button>
      </div>`;
    html.querySelector(`#illustration-${id}`).innerHTML = media;
    html.querySelector(`#title-${id}`).textContent = title;
    html.querySelector(`#likescount-${id}`).textContent = likes;
    html.querySelector(`#like-${id}`).setAttribute('onClick', like(id));

    return html;
  }

  function getMediaList(sort) {
    const html = document.createElement('div');
    html.classList.add(
      'flex',
      'flex-wrap',
      'mt-16',
      'gap-16',
      'justify-between',
    );
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
      html.appendChild(getMediaCard(media));
    });

    return html;
  }

  function getMediaModal(medias, mediaId) {
    const choosenMedia = medias.find(
      (media) => Number(media.id) === Number(mediaId),
    );

    let media;

    if (choosenMedia.image) {
      const img = document.createElement('img');
      img.setAttribute('src', `src/assets/medias/${choosenMedia.image}`);
      img.setAttribute('alt', choosenMedia.title);
      img.classList.add('w-full', 'h-full', 'object-cover');
      media = img;
    } else {
      const source = document.createElement('source');
      source.setAttribute('src', `src/assets/medias/${choosenMedia.video}`);
      source.setAttribute('type', 'video/mp4');

      const video = document.createElement('video');
      video.setAttribute('controls', '');
      video.classList.add('w-full', 'h-full', 'object-cover');
      video.appendChild(source);
      media = video;
    }

    const html = document.createElement('div');
    html.classList.add(
      'flex',
      'flex-col',
      'bg-white',
      'h-5/6',
      'w-full',
      'lg:w-10/12',
      'shadow-sm',
      'rounded-lg',
      'items-end',
    );

    html.innerHTML = `
      <button id="closeButton" class="text-primary relative right-5 text-3xl"><em class="fa-solid fa-xmark"></em></button>
      <div class="flex h-full w-full">
        <div class="w-2/12 flex flex-col items-center justify-center text-primary text-4xl">
          <button id="previousButton"><em class="fa-solid fa-chevron-left"></em></button>
        </div>
        <div class="w-8/12 flex flex-col justify-center">
          <div id="media-${mediaId}" class="h-5/6 overflow-hidden aspect-square"></div>
          <p id="title-${mediaId}" class="text-primary text-xl text-left"></p>
        </div>
        <div class="w-2/12 flex flex-col items-center justify-center text-primary text-4xl">
          <button id="nextButton"><em class="fa-solid fa-chevron-right"></em></button>
        </div>
      </div>>`;

    html.querySelector(`#media-${mediaId}`).innerHTML = media;
    html.querySelector(`#title-${mediaId}`).textContent = choosenMedia.title;
    return html;
  }

  return { getMediaList, getMediaModal };
}
