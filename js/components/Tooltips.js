export function initializeTooltips() {
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
}