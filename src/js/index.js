import { PhotoAPI } from "./photoAPI";
import Notiflix, { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    
};

refs.formEl.addEventListener('submit', onFormElSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);


const photoAPI = new PhotoAPI();

const lightbox = new SimpleLightbox('.gallery a');

function onFormElSubmit(e) {
  e.preventDefault();
  refs.loadMoreBtnEl.style.display = 'none';

  const searchQuery = e.target.elements.searchQuery.value.trim();

  photoAPI.q = searchQuery;
  photoAPI.page = 1;

  photoAPI.fetchPhotoByQuery().then((res) => {
    if (res.hits.length === 0) {
      Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        return;
    }
    
    photoAPI.totalPage = Math.ceil(res.totalHits / photoAPI.perPage);

    refs.galleryEl.innerHTML = '';
    renderImages(res.hits);
      refs.loadMoreBtnEl.disabled = false;
      refs.loadMoreBtnEl.style.display = 'block';
    updateStatusLoadMore();
    lightbox.refresh();
  });
}
 

async function onLoadMoreBtnClick() {
    photoAPI.page += 1;
    try {
        const res = await photoAPI.fetchPhotoByQuery();
        
        if (res.hits.length === 0) {
            refs.loadMoreBtnEl.classList.add('visually-hidden');
            throw "We're sorry, but you've reached the end of search results."
        }
      renderImages(res.hits);
      refs.loadMoreBtnEl.classList.add('is-hidden');
      Notify.success(`Hooray! We found ${res.totalHits} images.`)
      updateStatusLoadMore();
      lightbox.refresh();
    }
     catch (err) {
        Notiflix.Notify.warning(err);
    }
}

function templateImage(hit) {
    return `<a href="${hit.largeImageURL}" class="photo-card">
    <img
    src="${hit.webformatURL}" 
    alt="${hit.tags}" loading="lazy" 
    width="200" 
    />
    <div class="info">
      <p class="info-item"><b>Likes:</b> ${hit.likes}</p>
      <p class="info-item"><b>Views:</b> ${hit.views}</p>
      <p class="info-item"><b>Comments:</b> ${hit.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${hit.downloads}</p>
    </div>
  </a>`;
}

function templateImages(photos) {
  const template = photos.map(templateImage).join('');
  return template;
}

function renderImages(photos) {
  const images = templateImages(photos);
  refs.galleryEl.insertAdjacentHTML('beforeend', images);
}

function updateStatusLoadMore() {
 
    if (photoAPI.page >= photoAPI.totalPage) {
    refs.loadMoreBtnEl.classList.add('visually-hidden');
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    } else 
        refs.loadMoreBtnEl.classList.remove('is-hidden');
}


