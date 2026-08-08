import { chatState, getCurrentTime, addMessageToCharacter, getMessagesByCharacter, clearMessagesByCharacter  } from "./chatState.js"
import { renderMessages} from "./renderMessages.js"
import { sendMessageToCharacter } from "../services/chatApi.js"
import { renderChatStatus } from "./renderChatStatus.js"


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
        
        const activeCharacterId = chatState.activeCharacterId
        
        input.disabled = true
        submitButton.disabled = true
        renderChatStatus(statusContainer,'loading',activeCharacterId)
        
        addMessageToCharacter(activeCharacterId, {
            role: 'user',
            text,
            time: getCurrentTime()
        })
        
        const activeMessages = getMessagesByCharacter(activeCharacterId)
        
        renderMessages(messages, activeMessages)
        
        const activeCharacter = characters.find((character) => {
            return character.id === activeCharacterId
        })
        
        input.value = ''
        
        try {
            const data = await sendMessageToCharacter(activeCharacterId, activeMessages)
            renderChatStatus(statusContainer,'success')
            
            addMessageToCharacter(activeCharacterId, {
                role: 'assistant',
                text: data.reply,
                time: getCurrentTime()
            })
            
            const updatedMessages = getMessagesByCharacter(activeCharacterId)
            if (chatState.activeCharacterId === activeCharacterId) {
                renderMessages(messages, updatedMessages)
            }           
            
        } catch (error) {
            console.error(error)
            renderChatStatus(statusContainer,'error')
            
        } finally{
            
            input.disabled = false
            submitButton.disabled = false
            input.focus()
        }
    })
}

