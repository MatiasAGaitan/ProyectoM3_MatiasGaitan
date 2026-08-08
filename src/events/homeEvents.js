import { chatState } from "../utils/chatMessages.js"

export function setupHomeEvents() {
    const infoButtons = document.querySelectorAll('.character-info-button');
    const chatButtons = document.querySelectorAll('.character-button')
    
    infoButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const card = button.closest('.character-card');
            card.classList.toggle('show-info');
        });
    });
    
    chatButtons.forEach((button) => {
        button.addEventListener('click', () => {
            chatState.activeCharacterId = button.dataset.character
        })
    })
}
