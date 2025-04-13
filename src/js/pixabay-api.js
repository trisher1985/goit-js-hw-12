// Імпорт axios для HTTP-запитів
import axios from 'axios';

/**
 * Функція для отримання даних з Pixabay API
 * @param {string} query - Пошуковий запит
 * @param {number} page - Номер сторінки
 * @returns {Promise} - Обіцянка з результатами запиту
 */
async function fetchData(query, page = 1) {
  // Параметри запиту
  const params = {
    key: '49512194-f753c2f34a7e7dbbd609db53f', // API-ключ
    q: query,                                   // Пошуковий запит
    image_type: 'photo',                        // Тип зображень
    orientation: 'horizontal',                  // Орієнтація
    safesearch: true,                           // Безпечний пошук
    page: page,                                 // Номер сторінки
    per_page: 15,                               // Кількість зображень на сторінці
  };
  
  // Виконання GET-запиту
  return await axios.get('https://pixabay.com/api/', { params });
}

// Експорт функції
export default fetchData;