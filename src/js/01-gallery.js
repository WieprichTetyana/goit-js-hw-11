import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line

import { galleryItems } from './gallery-items.js';

// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector("ul.gallery");

function createMarkUp({ preview, original, description }) {
    return `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}" data-caption="${description}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </li>`
};
const galleryCartArray = galleryItems.map(item => createMarkUp(item));
console.log(galleryCartArray);

galleryList.innerHTML = galleryCartArray.join("");

new SimpleLightbox(".gallery a", { captions: true, captionsData: "alt", captionsDelay: 250 });