export function setupHomeEvents() {
    const infoButtons = document.querySelectorAll('.character-info-button');
    
    infoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.character-card');
            card.classList.toggle('show-info');
        });
    });
}