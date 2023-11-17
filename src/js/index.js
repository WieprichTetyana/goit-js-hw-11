import { PhotoAPI } from "./photoAPI";
import Notiflix from 'notiflix';

const refs = {
    formEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    
};

refs.formEl.addEventListener('submit', onFormElSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

const photoAPI = new PhotoAPI();



function onFormElSubmit(e) {
  e.preventDefault();
  refs.loadMoreBtnEl.style.display = 'none';

  const searchQuery = e.target.elements.searchQuery.value.trim();

  photoAPI.q = searchQuery;
  photoAPI.page = 1;

  photoAPI.fetchPhotoByQuery().then((res) => {
    photoAPI.totalPage = Math.ceil(res.totalHits / photoAPI.perPage);

    refs.galleryEl.innerHTML = '';
    renderImages(res.hits);
      refs.loadMoreBtnEl.disabled = false;
      refs.loadMoreBtnEl.style.display = 'block';
    updateStatusLoadMore();
  });
}
 

async function onLoadMoreBtnClick() {
    photoAPI.page += 1;
    try {
        const res = await photoAPI.fetchPhotoByQuery();
        
        if (res.hits.Length === 0) {
            refs.loadMoreBtnEl.classList.add('visually-hidden');
            throw "We're sorry, but you've reached the end of search results."
        }
        renderImages(res.hits);
        updateStatusLoadMore();
    }
     catch (err) {
        Notiflix.Notify.warning(err);
    }
}

function templateImage(hits) {
    return `<div class="photo-card">
    <img
    src="${hits.webformatURL}" 
    alt="${hits.tags}" loading="lazy" 
    width="200" 
    />
    <div class="info">
      <p class="info-item"><b>Likes:</b> ${hits.likes}</p>
      <p class="info-item"><b>Views:</b> ${hits.views}</p>
      <p class="info-item"><b>Comments:</b> ${hits.comments}</p>
      <p class="info-item"><b>Downloads:</b> ${hits.downloads}</p>
    </div>
  </div>`;
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
    refs.loadMoreBtnEl.classList.add('is-hidden');

    } else 
        refs.loadMoreBtnEl.classList.remove('is-hidden');
}

