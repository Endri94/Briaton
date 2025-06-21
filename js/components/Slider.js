import { initializeTooltips } from './Tooltips.js'
// slider.js
export function generateProductCardHTML(product) {
  return `
          <li class="day-products__item swiper-slide">
              <div class="product-card product-card--small" tabindex="0" aria-label="${product.name}">
                  <div class="product-card__visual">
                      <img class="product-card__img" src="${product.image}" height="344" width="290" alt="${product.name}">
                      <div class="product-card__more">
                          <button class="product-card__link btn btn--icon add-to-basket-btn" data-id="${product.id}">
                              <span class="btn__text">В корзину</span>
                              <svg width="24" height="24" aria-hidden="true">
                                  <use xlink:href="images/sprite.svg#icon-basket"></use>
                              </svg>
                          </button>
                          <a href="#" class="product-card__link btn btn--secondary" tabindex="-1">
                              <span class="btn__text">Подробнее</span>
                          </a>
                      </div>
                  </div>
                  <div class="product-card__info">
                      <h2 class="product-card__title">${product.name}</h2>
                      <span class="product-card__old">
                          <span class="product-card__old-number">${product.price.old}</span>
                          <span class="product-card__old-add">₽</span>
                      </span>
                      <span class="product-card__price">
                          <span class="product-card__price-number">${product.price.new}</span>
                          <span class="product-card__price-add">₽</span>
                      </span>

                     <!-- кнопка корзины для мобилки --> 
                      <div class="product-card__mobile"> 
                        <button class="btn btn--icon add-to-basket-btn" data-id="${product.id}">
                              <svg width="24" height="24" aria-hidden="true">
                                  <use xlink:href="images/sprite.svg#icon-basket"></use>
                              </svg>
                        </button>
                      </div>


                      <div class="product-card__tooltip tooltip">
                          <button class="tooltip__btn" aria-label="Показать подсказку" tabindex="0">
                              <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                                  <use href="images/sprite.svg#icon-i"></use>
                              </svg>
                             
                     
                          </button>
                          <div class="tooltip__content" role="tooltip">
                              <span class="tooltip__text">Наличие товара по городам:</span>
                              <ul class="tooltip__list">
                                 <li class="tooltip__item">Москва: <span class="tooltip__count">${product.availability.moscow}</span></li>
                                  <li class="tooltip__item">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></li>
                                  <li class="tooltip__item">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </li>
      `;
}

export async function fetchData() {
  const response = await fetch('./data/data.json');
  const data = await response.json();
  return data;
}

export async function getProductsOfTheDay() {
  const products = await fetchData();
  return products.filter(product => product.goodsOfDay === true);
}

export function swiperGoodsOfDay() {
  const swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.day-products__navigation-btn--next',
      prevEl: '.day-products__navigation-btn--prev',
    },
    spaceBetween: 30,
    slidesPerView: 4,
    breakpoints: {
      320: { slidesPerView: 2, spaceBetween: 20 },
      640: { slidesPerView: 3, spaceBetween: 30 },
      1024: { slidesPerView: 4, spaceBetween: 40 },
    }
  });
}

export function createSlides(products) {
  const sliderContainer = document.querySelector('.day-products__list');
  sliderContainer.innerHTML = '';

  products.forEach(product => {
    sliderContainer.insertAdjacentHTML('beforeend', generateProductCardHTML(product));
  });

  initializeTooltips();

  addAddToBasketListener(products);
}

function addAddToBasketListener(products) {
  const sliderContainer = document.querySelector('.day-products__list');


  sliderContainer.addEventListener('click', event => {
    const button = event.target.closest('.add-to-basket-btn');
    if (!button) return;

    const productId = button.dataset.id;
    if (!productId) return;


    if (window.addProductToCart && typeof window.addProductToCart === 'function') {
      window.addProductToCart(Number(productId));
      // console.log(`Product ID ${productId} added to cart from slider.`);
    } else {
      console.warn('addProductToCart function is not defined.');
    }
  });
}



