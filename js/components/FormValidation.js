export function formValidation() {


    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const closeErrorModal = document.getElementById('closeErrorModal');

    const validator = new JustValidate('.questions__form');
    validator
        .addField('#name', [
            {
                rule: 'required',
                errorMessage: 'Введите Ваше Имя',
            },
            {
                rule: 'minLength',
                value: 3,
                errorMessage: 'Имя должно содержать не менее 3х символов',
            },
            {
                rule: 'maxLength',
                value: 20,
                errorMessage: 'Имя должно содержать не более 20 символов',
            },
        ])
        .addField('#email', [
            {
                rule: 'required',
                errorMessage: 'Введите Ваш Email',
            },
            {
                rule: 'email',
                errorMessage: 'Введите корректный Email',
            },
        ])
        .addField('#agree', [
            {
                rule: 'required',
                errorMessage: 'Согласие обязательно',
            },
        ])
        .onSuccess((event) => {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        successModal.classList.remove('hidden');
                        form.reset();
                    } else {
                        errorModal.classList.remove('hidden');
                    }
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    errorModal.classList.remove('hidden');
                });
        });

    closeSuccessModal.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    closeErrorModal.addEventListener('click', () => {
        errorModal.classList.add('hidden');
    });


}