import { chatState, getMessagesByCharacter, clearMessagesByCharacter } from "../utils/chatMessages.js"
import { renderMessages } from "../utils/renderMessages.js"
import { sendChatMessage } from "../engine/chatEngine.js"


export function setupChatEvents(characters){
    const characterButtons = document.querySelectorAll('.chat-character')
    const headerImage = document.querySelector('.chat-header-image')
    const headerTitle = document.querySelector('.chat-header h2')
    const headerRole = document.querySelector('.chat-header p')
    const messages = document.getElementById('messages')
    const statusContainer = document.getElementById('chat-status')
    const form = document.getElementById('chat-form')
    const input = document.getElementById('message-input')
    const submitButton = form.querySelector('button[type="submit"]')
    const menuButton = document.querySelector('.chat-menu-button')
    const sidebar = document.querySelector('.chat-sidebar')
    const clearButton = document.querySelector('.chat-clear-button')
    
    
    // limpiar historial de chat
    clearButton.addEventListener('click', () => {
        clearMessagesByCharacter(chatState.activeCharacterId)
        const activeMessages = getMessagesByCharacter(chatState.activeCharacterId)
        renderMessages(messages, activeMessages)
    })
    
    //hacer aparecer la barra de personajes 
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('open')
    })
    
    //detecta el boton personaje que fue seleccionado, lo toma y abre su ventada de chat con sus datos 
    characterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const character = characters.find((item) => item.id === button.dataset.character)
            
            chatState.activeCharacterId = character.id
            
            characterButtons.forEach((item) => item.classList.remove('active'))
            button.classList.add('active')
            
            headerImage.src = character.image
            headerImage.alt = character.name
            headerTitle.textContent = character.name
            headerRole.textContent = character.role
            sidebar.classList.remove('open')
            
            const characterMessages = chatState.messagesByCharacter[character.id]
            
            renderMessages(messages, characterMessages)
            
        })
    })
    
    // maneja el evento cuando se envia el input
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        
        const text = input.value.trim()
        
        if (text === '') {
            return
        }
        
        await sendChatMessage({
            text,
            characters,
            messagesContainer: messages,
            statusContainer,
            input,
            submitButton
        })
    })
}

