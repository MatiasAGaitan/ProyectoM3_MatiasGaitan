import { chatState, addMessageToCharacter, getMessagesByCharacter } from "../utils/chatMessages.js"
import { getCurrentTime } from "../utils/date.js"
import { sendMessageToCharacter } from "../services/chatApi.js"
import { renderMessages } from "../utils/renderMessages.js"
import { updateChatStatus } from "../utils/updateChatStatus.js"

export async function sendChatMessage({
    text,
    characters,
    messagesContainer,
    statusContainer,
    input,
    submitButton
}) {
    const activeCharacterId = chatState.activeCharacterId
    
    input.disabled = true
    submitButton.disabled = true
    
    const activeCharacter = characters.find((character) => {
        return character.id === activeCharacterId
    })
    
    updateChatStatus(statusContainer, 'loading', activeCharacter.name)
    
    addMessageToCharacter(activeCharacterId, {
        role: 'user',
        text,
        time: getCurrentTime()
    })
    
    const activeMessages = getMessagesByCharacter(activeCharacterId)
    
    renderMessages(messagesContainer, activeMessages)
    
    input.value = ''
    
    try {
        const data = await sendMessageToCharacter(activeCharacterId, activeMessages)
        
        updateChatStatus(statusContainer, 'success')
        
        addMessageToCharacter(activeCharacterId, {
            role: 'assistant',
            text: data.reply,
            time: getCurrentTime()
        })
        
        const updatedMessages = getMessagesByCharacter(activeCharacterId)
        
        if (chatState.activeCharacterId === activeCharacterId) {
            renderMessages(messagesContainer, updatedMessages)
        }
    } catch (error) {
        console.error(error)
        updateChatStatus(statusContainer, 'error')
    } finally {
        input.disabled = false
        submitButton.disabled = false
        input.focus()
    }
}