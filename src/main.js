// Імпорт функцій для роботи з API та відображення
import fetchData from './js/pixabay-api';
import renderPhoto, {
  clearGallery,
  showLoader,
  hideLoader,
  simplelightbox,
  refreshSlb,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

// Імпорт бібліотеки для сповіщень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Отримання DOM-елементів
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const input = form.elements[0];
input.classList.add('input');
const btn = form.elements[1];
btn.classList.add('button');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Змінні для пагінації
let page = null;
let totalPages = null;
let query = null;

// Обробник події пошуку
form.addEventListener('submit', makeGallery);

/**
 * Функція для створення галереї
 * @param {Event} event - Об'єкт події форми
 */
async function makeGallery(event) {
  event.preventDefault();
  
  // Очищення галереї та приховування кнопки
  clearGallery(gallery);
  hideLoadMoreButton();
  showLoader();
  
  // Отримання пошукового запиту
  query = input.value;
  page = 1;
  
  // Перевірка на пустий запит
  if (query === '') {
    hideLoader();
    iziToast.error({
      message: 'Write your something you want to see',
      position: 'topRight',
    });
    return;
  }
  
  try {
    // Отримання даних з API
    const response = await fetchData(query, page);
    
    // Перевірка наявності результатів
    if (response.data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    } else {
      // Відображення зображень
      renderPhoto(gallery, response.data.hits);
      
      // Плавне прокручування сторінки
      const galleryItem = document.querySelector('.gallery-item');
      let rect = galleryItem.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
      
      // Розрахунок загальної кількості сторінок
      totalPages = Math.ceil(response.data.totalHits / 15);
      
      // Перевірка чи є ще зображення для завантаження
      if (page < totalPages) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          position: 'bottomCenter',
          message: `We're sorry, but you've reached the end of search results.`,
        });
      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Bad request',
      position: 'topRight',
    });
  }
  
  hideLoader();
  input.value = '';
}

// Обробник події завантаження додаткових зображень
loadMoreBtn.addEventListener('click', loadMore);

/**
 * Функція для завантаження додаткових зображень
 * @param {Event} event - Об'єкт події кнопки
 */
async function loadMore(event) {
  event.preventDefault();
  hideLoadMoreButton();
  showLoader();
  page += 1;
  
  try {
    // Отримання додаткових даних з API
    const response = await fetchData(query, page);
    
    // Відображення зображень
    renderPhoto(gallery, response.data.hits);
    
    // Плавне прокручування сторінки
    const galleryItem = document.querySelector('.gallery-item');
    let rect = galleryItem.getBoundingClientRect();
    window.scrollBy({
      top: rect.height * 2,
      behavior: 'smooth',
    });
    
    // Перевірка чи є ще зображення для завантаження
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        position: 'bottomCenter',
        message: `We're sorry, but you've reached the end of search results.`,
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Bad request',
      position: 'topRight',
    });
  }
  
  hideLoader();
}