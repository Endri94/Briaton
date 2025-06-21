export function dropCityList() {
    // Находим элементы дропдаун меню
    const cityBtn = document.querySelector('.location__city');
    const locationList = document.querySelector('.location__sublist');

    // переключаем появление элементов спсика
    cityBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        cityBtn.classList.toggle('location__city--active');
    });

    // устанавливаем значение города по клику
    locationList.querySelectorAll('.location__sublink').forEach(button => {
        button.addEventListener('click', (event) => {
            const city = button.textContent;
            cityBtn.textContent = city;
            cityBtn.classList.remove('location__city--active');
            event.stopPropagation();
        });
    });

    // закрывваем меню на клик вне меню
    document.body.addEventListener('click', function (event) {
        if (!cityBtn.contains(event.target) && !locationList.contains(event.target)) {
            cityBtn.classList.remove('location__city--active');
        }
    });
}
