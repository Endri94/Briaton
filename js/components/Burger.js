
export function burgerMenu() {
    // находим кнопки и меню
    const openBurgerBtn = document.querySelector('.header__catalog-btn');
    const closeBurgerBtn = document.querySelector('.main-menu__close');
    const burgerMenu = document.querySelector('.main-menu');


    // открываем меню по нажатию
    openBurgerBtn.addEventListener('click', function () {
        burgerMenu.classList.add('main-menu--active')
    })
    // закрываем меню по нажатию крестика
    closeBurgerBtn.addEventListener('click', function () {
        burgerMenu.classList.remove('main-menu--active')
    })
}