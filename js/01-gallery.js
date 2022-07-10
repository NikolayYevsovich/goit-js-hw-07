import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
const galleryMarcup = createGalleryItemsMarcup(galleryItems);

galleryEl.insertAdjacentHTML("beforeend", galleryMarcup);

function createGalleryItemsMarcup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`;
    })
    .join("");
}

galleryEl.addEventListener("click", onGalleryImageClick);

function onGalleryImageClick(evt) {
  evt.preventDefault();
  window.addEventListener("keydown", closeModal);

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const fullSizeImage = basicLightbox.create(
    `<img src=${evt.target.dataset.source}>`
  );
  fullSizeImage.show();
  function closeModal(evt) {
    if (evt.code === "Escape") {
      fullSizeImage.close(() =>
        window.removeEventListener("keydown", closeModal)
      );
    }
  }
}
