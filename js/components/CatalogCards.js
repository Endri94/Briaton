
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

  let allProducts = [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productsPerPage = 6;
  let currentPage = 1;

  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const isAvailable = (availability) =>
    availability.moscow > 0 || availability.orenburg > 0 || availability.saintPetersburg > 0;

  const renderProductCards = (products) => {
    catalogList.innerHTML = '';

    if (products.length === 0) {
      catalogList.innerHTML = '<li>Нет товаров, соответствующих фильтрам.</li>';
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
                                <svg id="icon-i" width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.00879 4.24878H2.15927V8.50055" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M0.999756 8.50021H3.31006" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M2.10017 1.24435C2.10017 1.38248 1.98819 1.49445 1.85006 1.49445C1.71193 1.49445 1.59996 1.38248 1.59996 1.24435C1.59996 1.10622 1.71193 0.994245 1.85006 0.994245" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  <path d="M1.8501 0.994141C1.98823 0.994141 2.1002 1.10612 2.1002 1.24424" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
          renderProductCards(allProducts);
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
                    <span class="basket__name">${product.name}</span>
                    <span class="basket__price">${product.price.new} ₽</span>
                    <button class="basket__close" type="button" data-id="${product.id}" aria-label="Удалить из корзины">
                        <svg class="main-menu__icon" width="24" height="24" aria-hidden="true">
                            <use xlink:href="images/sprite.svg#icon-close"></use>
                        </svg>
                    </button>
                `;
        li.querySelector('.basket__close').addEventListener('click', e => {
          const removeId = Number(e.currentTarget.getAttribute('data-id'));
          removeFromCart(removeId);
        });
        basketList.appendChild(li);
      });
      basketCounter.textContent = cart.length.toString();
      basketLink.style.display = 'inline-block';
    }
  };

  const addToCart = (id) => {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;
    cart.push(product);
    saveCart();
    updateBasketDisplay();
  };

  const removeFromCart = (id) => {
    cart = cart.filter(p => p.id !== id);
    saveCart();
    updateBasketDisplay();
  };

  const initializeTooltips = () => {
    const tooltipButtons = document.querySelectorAll('.tooltip__btn');
    tooltipButtons.forEach(button => {
      const tooltipContent = button.nextElementSibling.innerHTML;
      tippy(button, {
        content: tooltipContent,
        allowHTML: true,
        placement: 'top',
        theme: 'light',
      });
    });
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
    }
    return sorted;
  };

  const filterProducts = () => {
    const selectedTypes = Array.from(catalogForm.querySelectorAll('input[name="type"]:checked')).map(i => i.value);
    const selectedStatus = catalogForm.querySelector('input[name="status"]:checked').value;
    const sortValue = sortSelect.value;

    const filtered = allProducts.filter(product => {
      const matchType = selectedTypes.length === 0 || product.type.some(t => selectedTypes.includes(t));
      const matchStatus = selectedStatus === 'all-item' || (selectedStatus === 'instock' && isAvailable(product.availability));
      return matchType && matchStatus;
    });

    const sorted = sortProducts(filtered, sortValue);
    renderProductCards(sorted);
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

  cart = JSON.parse(localStorage.getItem('cart')) || [];

  catalogForm.querySelectorAll('input[name="type"], input[name="status"]').forEach(el => {
    el.addEventListener('change', filterProducts);
  });
  sortSelect.addEventListener('change', filterProducts);
  basketToggleBtn.addEventListener('click', () => basket.classList.toggle('basket--active'));

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
