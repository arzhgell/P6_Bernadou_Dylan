function mediasFactory(data) {
  const { id, title, image, likes, date, price } = data;

  const picture = `src/assets/photographers/${image}`;

  function getMediaCard() {
    const html = `<p>${title}</p>`;

    return html;
  }

  return { getMediaCard };
}
