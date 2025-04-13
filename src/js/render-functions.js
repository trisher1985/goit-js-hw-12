// Імпорт бібліотеки для модальних вікон
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/**
 * Функція для відображення фотографій у галереї
 * @param {HTMLElement} div - Контейнер для галереї
 * @param {Array} array - Масив об'єктів зображень
 */
function renderPhoto(div, array) {
  // Генерування HTML-розмітки для кожного зображення
  const markup = array
    .map(i => {
      return `<li class="gallery-item">
    <a class="image-link" href="${i.largeImageURL}"><img class="image" src="${i.webformatURL}" alt="${i.tags}" title=""/></a>
    <ul class="image-descr-list">
<li class="descr-item">Likes<span class="descr-span">${i.likes}</span></li>
<li class="descr-item">Views<span class="descr-span">${i.views}</span></li>
<li class="descr-item">Comments<span class="descr-span">${i.comments}</span></li>
<li class="descr-item">Downloads<span class="descr-span">${i.downloads}</span></li>
    </ul>
    </li>`;
    })
    .join('');
  
  // Додавання розмітки до галереї
  div.insertAdjacentHTML('beforeend', markup);
  
  // Оновлення SimpleLightbox
  refreshSlb();
}

// Ініціалізація SimpleLightbox
const simplelightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',  // Використання атрибута alt для підписів
  captionDelay: 250,    // Затримка перед показом підпису
});

/** Оновлення SimpleLightbox */
function refreshSlb() {
  simplelightbox.refresh();
}

/** Очищення галереї */
function clearGallery(div) {
  div.innerHTML = '';
}

/** Показ індикатора завантаження */
function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex';
}

/** Приховування індикатора завантаження */
function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
}

/** Показ кнопки "Load more" */
function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  loadMoreBtn.classList.remove('visually-hidden');
}

/** Приховування кнопки "Load more" */
function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more-btn');
  loadMoreBtn.classList.add('visually-hidden');
}

// Експорт функцій
export default renderPhoto;
export {
  clearGallery,
  showLoader,
  hideLoader,
  simplelightbox,
  refreshSlb,
  showLoadMoreButton,
  hideLoadMoreButton,
};