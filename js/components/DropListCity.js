export function dropCityList() {


    // находим элементы дропдаун меню
    const cityBtn = document.querySelector('.location__city');
    const locationList = document.querySelector('.location__sublist');
    // по нажатию появляется список
    cityBtn.addEventListener('click', function () {
        cityBtn.classList.toggle('location__city--active')
    })

    // смена города по клику
    locationList.querySelectorAll('.location__sublink').forEach(button => {
        button.addEventListener('click', () => {
            const city = button.textContent;
            document.querySelector('.location__city').textContent = city;
            cityBtn.classList.remove('location__city--active')
        })
    })
}

