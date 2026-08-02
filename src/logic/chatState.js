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

export function addMessageToCharacter(characterId, message) {
    const characterMessages = chatState.messagesByCharacter[characterId]
    
    characterMessages.push(message)
    
    if (characterMessages.length > MAX_MESSAGES_PER_CHARACTER) {
        characterMessages.splice(0, characterMessages.length - MAX_MESSAGES_PER_CHARACTER)
    }
}

export function getMessagesByCharacter(characterId) {
    return chatState.messagesByCharacter[characterId]
}