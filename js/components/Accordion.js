export function accordion() {

    const accordionButtons = document.querySelectorAll('.accordion__btn');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('accordion__btn--active');

            // Закрываем все пункты
            accordionButtons.forEach(btn => {
                btn.classList.remove('accordion__btn--active');

            });

            // Если не был активен, открываем пункт
            if (!isActive) {
                button.classList.add('accordion__btn--active');

            }
            // Если был активен — оставляем все закрытым (т.е. закрываем)
        });
    });




}