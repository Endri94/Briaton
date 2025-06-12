// main.js
import { burgerMenu } from "./components/Burger.js";
import { dropCityList } from "./components/DropListCity.js";
import { catalogCards } from "./components/CatalogCards.js";
import { accordion } from "./components/Accordion.js";
import { createSlides, getProductsOfTheDay, swiperGoodsOfDay } from './components/Slider.js';
import { formValidation } from './components/FormValidation.js';


window.addEventListener('DOMContentLoaded', () => {
    burgerMenu()
    dropCityList()
    catalogCards()
    accordion()
    formValidation()
});

document.addEventListener('DOMContentLoaded', async () => {
    const productsOfTheDay = await getProductsOfTheDay();
    createSlides(productsOfTheDay);
    swiperGoodsOfDay()
});
