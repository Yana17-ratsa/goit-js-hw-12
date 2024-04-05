import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery  = document.querySelector(".gallery");

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',});

    export function renderMarkup(data) {
        const galleryMArkup = data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
            return `<li class="item-image">
                <a class="photos-list-link" href="${largeImageURL}">             <img class="photo" src="${webformatURL}" alt="${tags}"/>             </a>             <ul class="photo-information-container">                <li class="item-photo-information-container"><p><span class="accent">Likes</span>${likes}</p></li>
                <li class="item-photo-information-container"><p><span class="accent">Views</span>${views}</p></li>                <li class="item-photo-information-container"><p><span class="accent">Comments</span>${comments}</p></li>                 <li class="item-photo-information-container"><p><span class="accent">Downloads</span>${downloads}</p></li>                </ul>                </li>`;
            })  
            .join("");

            gallery.insertAdjacentHTML  ('beforeend', galleryMArkup);

            lightbox.refresh();
    }