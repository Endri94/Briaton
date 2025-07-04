// import { initializeTooltips } from './Tooltips.js'

// export function catalogCards() {
//   const catalogList = document.getElementById('catalogList');
//   const catalogForm = document.querySelector('.catalog-form');
//   const sortSelect = document.getElementById('sortSelect');
//   const basket = document.querySelector('.header__basket');
//   const basketList = basket.querySelector('.basket__list');
//   const basketEmptyBlock = basket.querySelector('.basket__empty-block');
//   const basketCounter = document.getElementById('basketCount');
//   const basketToggleBtn = document.getElementById('basketBtn');
//   const basketLink = basket.querySelector('.basket__link');
//   const paginationContainer = document.querySelector('.catalog__pagination');

//   let allProducts = [];
//   let cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const productsPerPage = 6;
//   let currentPage = 1;

//   const saveCart = () => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   };

//   const isAvailable = (availability) =>
//     availability.moscow > 0 || availability.orenburg > 0 || availability.saintPetersburg > 0;

//   const renderProductCards = (products) => {
//     catalogList.innerHTML = '';

//     if (products.length === 0) {
//       catalogList.innerHTML = '<li>Нет товаров, соответствующих фильтрам.</li>';
//       return;
//     }

//     const startIndex = (currentPage - 1) * productsPerPage;
//     const endIndex = startIndex + productsPerPage;
//     const currentProducts = products.slice(startIndex, endIndex);

//     currentProducts.forEach(product => {
//       const li = document.createElement('li');
//       li.className = 'catalog__item';

//       li.innerHTML = `
//                 <article class="product-card" tabindex="0" aria-label="${product.name}, старая цена ${product.price.old} рублей, новая цена ${product.price.new} рублей">
//                     <div class="product-card__visual">
//                         <img src="${product.image}" alt="${product.name}" class="product-card__img" height="436" width="290" />
//                         <div class="product-card__more product-card__more--mobile" >
//                             <button class="product-card__link product-card__link--basket btn btn--icon add-to-basket-btn" data-id="${product.id}" type="button">
//                                 <span class="btn__text btn__text--mobile">В корзину</span>
//                                 <svg width="24" height="24" >
//                                     <use xlink:href="images/sprite.svg#icon-basket"></use>
//                                 </svg>
//                             </button>
//                             <a href="#" class="product-card__link btn btn--secondary product-card__link--mobile" tabindex="-1">
//                                 <span class="btn__text">Подробнее</span>
//                             </a>
//                         </div>
//                     </div>
//                     <div class="product-card__info">
//                         <h2 class="product-card__title">${product.name}</h2>
//                         <span class="product-card__old">
//                             <span class="product-card__old-number">${product.price.old}</span>
//                             <span class="product-card__old-add">₽</span>
//                         </span>
//                         <span class="product-card__price">
//                             <span class="product-card__price-number">${product.price.new}</span>
//                             <span class="product-card__price-add">₽</span>
//                         </span>                      
//                         <div class="product-card__tooltip tooltip" tabindex="0" aria-describedby="tooltipDesc${product.id}" aria-label="Наличие товара по городам">
//                             <button class="tooltip__btn" aria-label="Показать подсказку">
//                             <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
//                                   <use href="images/sprite.svg#icon-i"></use>
//                               </svg>
//                             </button>
//                             <div class="tooltip__content" role="tooltip" id="tooltipDesc${product.id}" aria-hidden="true">
//                                 <span class="tooltip__text">Наличие товара по городам:</span>
//                                 <ul class="tooltip__list">
//                                     <li class="tooltip__item">Москва: <span class="tooltip__count">${product.availability.moscow}</span></li>
//                                     <li class="tooltip__item">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></li>
//                                     <li class="tooltip__item">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </article>
//             `;

//       li.querySelector('.add-to-basket-btn').addEventListener('click', () => addToCart(product.id));
//       catalogList.appendChild(li);
//     });

//     setupPagination(products.length);
//     initializeTooltips();
//   };

//   const setupPagination = (totalProducts) => {
//     paginationContainer.innerHTML = '';
//     const totalPages = Math.ceil(totalProducts / productsPerPage);

//     if (totalPages > 1) {
//       for (let i = 1; i <= totalPages; i++) {
//         const pageButton = document.createElement('li');
//         pageButton.className = 'catalog__pagination-item';
//         const button = document.createElement('button');
//         button.className = 'catalog__pagination-link';
//         button.innerText = i;
//         button.addEventListener('click', () => {
//           currentPage = i;
//           renderProductCards(allProducts);
//         });
//         pageButton.appendChild(button);
//         paginationContainer.appendChild(pageButton);
//       }
//     }
//   };

//   const updateBasketDisplay = () => {
//     basketList.innerHTML = '';
//     if (cart.length === 0) {
//       basketEmptyBlock.style.display = 'block';
//       basketCounter.textContent = '0';
//       basketLink.style.display = 'none';
//     } else {
//       basketEmptyBlock.style.display = 'none';
//       cart.forEach(product => {
//         const li = document.createElement('li');
//         li.className = 'basket__item';
//         li.innerHTML = `
//                     <div class="basket__img">
//                         <img src="${product.image}" alt="${product.name}" height="60" width="60" />
//                     </div>
//                     <span class="basket__name">${product.name}</span>
//                     <span class="basket__price">${product.price.new} ₽</span>
//                     <button class="basket__close" type="button" data-id="${product.id}" aria-label="Удалить из корзины">
//                         <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
//                             <use xlink:href="images/sprite.svg#icon-close"></use>
//                         </svg>
//                     </button>
//                 `;
//         li.querySelector('.basket__close').addEventListener('click', e => {
//           const removeId = Number(e.currentTarget.getAttribute('data-id'));
//           removeFromCart(removeId);
//         });
//         basketList.appendChild(li);
//       });
//       basketCounter.textContent = cart.length.toString();
//       basketLink.style.display = 'inline-block';
//     }
//   };

//   const addToCart = (id) => {
//     const product = allProducts.find(p => p.id === id);
//     if (!product) return;
//     cart.push(product);
//     saveCart();
//     updateBasketDisplay();
//   };

//   const removeFromCart = (id) => {
//     cart = cart.filter(p => p.id !== id);
//     saveCart();
//     updateBasketDisplay();
//   };

//   const sortProducts = (products, sortValue) => {
//     const sorted = products.slice();
//     switch (sortValue) {
//       case 'price-min':
//         sorted.sort((a, b) => a.price.new - b.price.new);
//         break;
//       case 'price-max':
//         sorted.sort((a, b) => b.price.new - a.price.new);
//         break;
//       case 'rating-max':
//         sorted.sort((a, b) => b.rating - a.rating);
//         break;
//     }
//     return sorted;
//   };

//   const filterProducts = () => {
//     const selectedTypes = Array.from(catalogForm.querySelectorAll('input[name="type"]:checked')).map(i => i.value);
//     const selectedStatus = catalogForm.querySelector('input[name="status"]:checked').value;
//     const sortValue = sortSelect.value;

//     const filtered = allProducts.filter(product => {
//       const matchType = selectedTypes.length === 0 || product.type.some(t => selectedTypes.includes(t));
//       const matchStatus = selectedStatus === 'all-item' || (selectedStatus === 'instock' && isAvailable(product.availability));
//       return matchType && matchStatus;
//     });

//     const sorted = sortProducts(filtered, sortValue);
//     renderProductCards(sorted);
//   };

//   const updateFilterCounts = (products) => {
//     const counts = {};
//     const checkboxes = catalogForm.querySelectorAll('input[name="type"]');
//     checkboxes.forEach(cb => counts[cb.value] = 0);
//     products.forEach(product => {
//       product.type.forEach(t => {
//         if (counts.hasOwnProperty(t)) counts[t]++;
//       });
//     });
//     checkboxes.forEach(cb => {
//       const label = catalogForm.querySelector(`label[for="${cb.id}"]`);
//       if (!label) return;
//       const countSpan = label.querySelector('.custom-checkbox__count');
//       if (!countSpan) return;
//       countSpan.textContent = counts[cb.value];
//     });
//   };

//   cart = JSON.parse(localStorage.getItem('cart')) || [];

//   catalogForm.querySelectorAll('input[name="type"], input[name="status"]').forEach(el => {
//     el.addEventListener('change', filterProducts);
//   });
//   sortSelect.addEventListener('change', filterProducts);
//   basketToggleBtn.addEventListener('click', () => basket.classList.toggle('basket--active'));

//   window.addProductToCart = addToCart;

//   fetch('./data/data.json')
//     .then(res => {
//       if (!res.ok) throw new Error('Network error');
//       return res.json();
//     })
//     .then(products => {
//       allProducts = products;
//       updateFilterCounts(products);
//       filterProducts();
//       updateBasketDisplay();
//     })
//     .catch(console.error);

//   document.addEventListener('cartUpdated', () => {
//     updateBasketDisplay();
//   });
// }



// ??---------------------- 2й вариант с динамическим изменением количества товаров по заданному фильтру
import { initializeTooltips } from "./Tooltips.js";

export function catalogCards() {
  const catalogList = document.getElementById('catalogList');
  const catalogForm = document.querySelector('.catalog-form');
  const sortSelect = document.getElementById('sortSelect');
  const basket = document.querySelector('.header__basket');
  const basketList = basket.querySelector('.basket__list');
  const basketEmptyBlock = basket.querySelector('.basket__empty-block');
  const basketCounter = document.getElementById('basketCount');
  const basketToggleBtn = document.getElementById('basketBtn');
  const basketLink = basket.querySelector('.basket__link');
  const paginationContainer = document.querySelector('.catalog__pagination');
  const resetBtn = catalogForm.querySelector('.catalog-form__reset');

  let allProducts = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productsPerPage = 6;
  let currentPage = 1;

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const isAvailable = (availability) =>
    availability.moscow > 0 || availability.orenburg > 0 || availability.saintPetersburg > 0;


  const getFilteredProducts = () => {
    const selectedTypes = Array.from(catalogForm.querySelectorAll('input[name="type"]:checked')).map(i => i.value);
    const selectedStatus = catalogForm.querySelector('input[name="status"]:checked').value;

    return allProducts.filter(product => {
      const matchType = selectedTypes.length === 0 || product.type.some(t => selectedTypes.includes(t));
      const matchStatus = selectedStatus === 'all-item' || (selectedStatus === 'instock' && isAvailable(product.availability));
      return matchType && matchStatus;
    });
  };

  const renderProductCards = (products) => {
    catalogList.innerHTML = '';

    if (products.length === 0) {
      catalogList.innerHTML = '<li>Нет товаров, соответствующих фильтрам.</li>';
      paginationContainer.innerHTML = '';
      return;
    }


    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);


    currentProducts.forEach(product => {
      const li = document.createElement('li');
      li.className = 'catalog__item';
      li.innerHTML = `
     <article class="product-card" tabindex="0" aria-label="${product.name}, старая цена ${product.price.old} рублей, новая цена ${product.price.new} рублей">
                    <div class="product-card__visual">
                        <img src="${product.image}" alt="${product.name}" class="product-card__img" height="436" width="290" />
                        <div class="product-card__more product-card__more--mobile" >
                            <button class="product-card__link product-card__link--basket btn btn--icon add-to-basket-btn" data-id="${product.id}" type="button">
                                <span class="btn__text btn__text--mobile">В корзину</span>
                                <svg width="24" height="24" >
                                    <use xlink:href="images/sprite.svg#icon-basket"></use>
                                </svg>
                            </button>
                            <a href="#" class="product-card__link btn btn--secondary product-card__link--mobile" tabindex="-1">
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
                        <div class="product-card__tooltip tooltip" tabindex="0" aria-describedby="tooltipDesc${product.id}" aria-label="Наличие товара по городам">
                            <button class="tooltip__btn" aria-label="Показать подсказку">
                            <svg class="tooltip__icon" width="5" height="10" aria-hidden="true">
                                  <use href="images/sprite.svg#icon-i"></use>
                              </svg>
                            </button>
                            <div class="tooltip__content" role="tooltip" id="tooltipDesc${product.id}" aria-hidden="true">
                                <span class="tooltip__text">Наличие товара по городам:</span>
                                <ul class="tooltip__list">
                                    <li class="tooltip__item">Москва: <span class="tooltip__count">${product.availability.moscow}</span></li>
                                    <li class="tooltip__item">Оренбург: <span class="tooltip__count">${product.availability.orenburg}</span></li>
                                    <li class="tooltip__item">Санкт-Петербург: <span class="tooltip__count">${product.availability.saintPetersburg}</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </article>
    `;
      li.querySelector('.add-to-basket-btn').addEventListener('click', () => addToCart(product.id));
      catalogList.appendChild(li);
    });


    setupPagination(products.length);
    initializeTooltips();
  };

  const setupPagination = (totalProducts) => {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('li');
        pageButton.className = 'catalog__pagination-item';
        const button = document.createElement('button');
        button.className = 'catalog__pagination-link';
        button.innerText = i;
        button.addEventListener('click', () => {
          currentPage = i;
          const filteredProducts = getFilteredProducts();
          const sortedProducts = sortProducts(filteredProducts, sortSelect.value);
          renderProductCards(sortedProducts);
        });
        pageButton.appendChild(button);
        paginationContainer.appendChild(pageButton);
      }
    }
  };

  const updateBasketDisplay = () => {
    basketList.innerHTML = '';
    if (cart.length === 0) {
      basketEmptyBlock.style.display = 'block';
      basketCounter.textContent = '0';
      basketLink.style.display = 'none';
    } else {
      basketEmptyBlock.style.display = 'none';
      cart.forEach(product => {
        const li = document.createElement('li');
        li.className = 'basket__item';
        li.innerHTML = `
          <div class="basket__img">
            <img src="${product.image}" alt="${product.name}" height="60" width="60" />
          </div>
          <div class="basket__info">
            <span class="basket__name">${product.name}</span>
            <span class="basket__price">${product.price.new} ₽</span>
            <div class="basket__quantity-controls">
              <button class="basket__quantity-btn" data-id="${product.id}" data-action="decrease">-</button>
              <span class="basket__quantity">${product.quantity || 1}</span>
              <button class="basket__quantity-btn" data-id="${product.id}" data-action="increase">+</button>
            </div>
          </div>
          <button class="basket__close" type="button" data-id="${product.id}" aria-label="Удалить из корзины">
            <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-close"></use>
            </svg>
          </button>
        `;

        li.querySelector('.basket__close').addEventListener('click', e => {
          const removeId = Number(e.currentTarget.getAttribute('data-id'));
          removeFromCart(removeId, true);
        });

        li.querySelectorAll('.basket__quantity-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            const productId = Number(e.currentTarget.getAttribute('data-id'));
            const action = e.currentTarget.getAttribute('data-action');

            if (action === 'increase') {
              addToCart(productId);
            } else {
              removeFromCart(productId);
            }
          });
        });

        basketList.appendChild(li);
      });

      basketCounter.textContent = cart.reduce((total, item) => total + (item.quantity || 1), 0).toString();
      basketLink.style.display = 'inline-block';
    }
  };

  const addToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateBasketDisplay();
  };

  const removeFromCart = (id, removeCompletely = false) => {
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
      const existingItem = cart[existingItemIndex];

      if (removeCompletely || existingItem.quantity <= 1) {
        cart.splice(existingItemIndex, 1);
      } else {
        existingItem.quantity -= 1;
      }

      saveCart();
      updateBasketDisplay();
    }
  };

  const sortProducts = (products, sortValue) => {
    const sorted = products.slice();
    switch (sortValue) {
      case 'price-min':
        sorted.sort((a, b) => a.price.new - b.price.new);
        break;
      case 'price-max':
        sorted.sort((a, b) => b.price.new - a.price.new);
        break;
      case 'rating-max':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  };

  const filterProducts = () => {
    currentPage = 1;

    const selectedTypes = Array.from(catalogForm.querySelectorAll('input[name="type"]:checked')).map(i => i.value);
    const selectedStatus = catalogForm.querySelector('input[name="status"]:checked').value;
    const sortValue = sortSelect.value;


    let filteredProducts = allProducts.filter(product => {
      const matchType = selectedTypes.length === 0 || product.type.some(t => selectedTypes.includes(t));
      const matchStatus = selectedStatus === 'all-item' || (selectedStatus === 'instock' && isAvailable(product.availability));
      return matchType && matchStatus;
    });


    filteredProducts = sortProducts(filteredProducts, sortValue);


    renderProductCards(filteredProducts);


    updateFilterCounts(filteredProducts);
  };

  const updateFilterCounts = (products) => {
    const counts = {};
    const checkboxes = catalogForm.querySelectorAll('input[name="type"]');
    checkboxes.forEach(cb => counts[cb.value] = 0);
    products.forEach(product => {
      product.type.forEach(t => {
        if (counts.hasOwnProperty(t)) counts[t]++;
      });
    });
    checkboxes.forEach(cb => {
      const label = catalogForm.querySelector(`label[for="${cb.id}"]`);
      if (!label) return;
      const countSpan = label.querySelector('.custom-checkbox__count');
      if (!countSpan) return;
      countSpan.textContent = counts[cb.value];
    });
  };

  catalogForm.querySelectorAll('input[name="type"], input[name="status"]').forEach(el => {
    el.addEventListener('change', filterProducts);
  });
  sortSelect.addEventListener('change', filterProducts);


  resetBtn.addEventListener('click', () => {
    setTimeout(() => {
      currentPage = 1;
      filterProducts();
    }, 0);
  });

  const basketOverlay = document.createElement('div');
  basketOverlay.className = 'basket-overlay';
  document.body.appendChild(basketOverlay);

  basketToggleBtn.addEventListener('click', () => {
    basket.classList.toggle('basket--active');
    basketOverlay.style.display = basket.classList.contains('basket--active') ? 'block' : 'none';
  });

  basketOverlay.addEventListener('click', () => {
    basket.classList.remove('basket--active');
    basketOverlay.style.display = 'none';
  });

  basket.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  window.addProductToCart = addToCart;

  fetch('./data/data.json')
    .then(res => {
      if (!res.ok) throw new Error('Network error');
      return res.json();
    })
    .then(products => {
      allProducts = products;
      updateFilterCounts(products);
      filterProducts();
      updateBasketDisplay();
    })
    .catch(console.error);

  document.addEventListener('cartUpdated', () => {
    updateBasketDisplay();
  });
}
