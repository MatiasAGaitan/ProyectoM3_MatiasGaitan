import { characters } from '../personalities/index.js';

const MAX_MESSAGES_PER_CHARACTER = 12

export const chatState = {
    activeCharacterId: characters[0].id,
    messagesByCharacter: {}
};

characters.forEach((character) => {
    chatState.messagesByCharacter[character.id] = [
        {
            role: 'assistant',
            text: character.greeting,
            time: getCurrentTime()
        }
    ];
});


export function getCurrentTime() {
    const now = new Date()
    
    return now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export function addMessageToActiveCharacter(message) {
    const activeMessages = chatState.messagesByCharacter[chatState.activeCharacterId]
    
    activeMessages.push(message)
    
    if (activeMessages.length > MAX_MESSAGES_PER_CHARACTER) {
        activeMessages.splice(0, activeMessages.length - MAX_MESSAGES_PER_CHARACTER)
    }
}

export function getActiveMessages() {
    return chatState.messagesByCharacter[chatState.activeCharacterId]
}