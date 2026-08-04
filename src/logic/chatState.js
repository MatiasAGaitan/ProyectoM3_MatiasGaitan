import { characters } from '../personalities/index.js';

const MAX_MESSAGES_PER_CHARACTER = 12
const CHAT_STORAGE_KEY = 'chatweb_messages'

export const chatState = {
    activeCharacterId: characters[0].id,
    messagesByCharacter: {}
};

function saveMessagesToStorage() {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatState.messagesByCharacter))
}

function getInitialMessages() {
    const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY)
    
    if (!storedMessages) {
        return null
    }
    
    return JSON.parse(storedMessages)
}

const storedMessages = getInitialMessages()

characters.forEach((character) => {
    chatState.messagesByCharacter[character.id] = storedMessages?.[character.id] || [
        {
            role: 'assistant',
            text: character.greeting,
            time: getCurrentTime()
        }
    ]
})

export function getCurrentTime() {
    const now = new Date()
    
    return now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function addMessageToCharacter(characterId, message) {
    const characterMessages = chatState.messagesByCharacter[characterId]
    
    characterMessages.push(message)
    
    if (characterMessages.length > MAX_MESSAGES_PER_CHARACTER) {
        characterMessages.splice(0, characterMessages.length - MAX_MESSAGES_PER_CHARACTER)
    }
    
    saveMessagesToStorage()
}

export function getMessagesByCharacter(characterId) {
    return chatState.messagesByCharacter[characterId]
}

export function clearMessagesByCharacter(characterId) {
    const character = characters.find((item) => item.id === characterId)
    
    chatState.messagesByCharacter[characterId] = [
        {
            role: 'assistant',
            text: character.greeting,
            time: getCurrentTime()
        }
    ]
    
    saveMessagesToStorage()
}

