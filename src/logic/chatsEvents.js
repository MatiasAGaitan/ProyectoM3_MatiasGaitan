import { chatState, getCurrentTime, addMessageToActiveCharacter, getActiveMessages } from "./chatState.js"
import { renderMessages, showTypingMessage, hideTypingMessage } from "./renderMessages.js"


export function setupChatEvents(characters){
    const characterButtons = document.querySelectorAll('.chat-character')
    const headerImage = document.querySelector('.chat-header-image')
    const headerTitle = document.querySelector('.chat-header h2')
    const headerRole = document.querySelector('.chat-header p')
    const messages = document.getElementById('messages')
    const form = document.getElementById('chat-form')
    const input = document.getElementById('message-input')
    const submitButton = form.querySelector('button[type="submit"]')
    const menuButton = document.querySelector('.chat-menu-button')
    const sidebar = document.querySelector('.chat-sidebar')
    
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('open')
    })
    
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
    
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const text = input.value.trim()
        
        if (text === '') {
            return
        }
        
        input.disabled = true
        submitButton.disabled = true
        
        addMessageToActiveCharacter({
            role: 'user',
            text,
            time: getCurrentTime()
        })
        
        const activeMessages = getActiveMessages()
        
        renderMessages(messages, activeMessages)
        
        input.value = ''
        
        const activeCharacter = characters.find((character) => {
            return character.id === chatState.activeCharacterId
        })
        
        showTypingMessage(messages,activeCharacter.name)
        
        setTimeout(() => {
            
            hideTypingMessage(messages)
            
            addMessageToActiveCharacter({
                role: 'assistant',
                text: 'Respuesta simulada del personaje. Después esto va a venir desde Gemini.',
                time: getCurrentTime()
            })
            
            const updatedMessages = getActiveMessages()
            
            renderMessages(messages, updatedMessages)
            
            input.disabled = false
            submitButton.disabled = false
            input.focus()
            
        }, 800)
    })
}

