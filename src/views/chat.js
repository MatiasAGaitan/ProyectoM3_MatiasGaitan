import { characters } from "../personalities/index.js"
import { setupChatEvents } from "../logic/chatsEvents.js"
import { chatState } from "../logic/chatState.js"
import { renderMessages } from "../logic/renderMessages.js"


export function renderChat() {
    const app = document.getElementById('app')
    
    const activeCharacter = characters.find((character) => {
        return character.id === chatState.activeCharacterId
    })
    
    const activeMessages = chatState.messagesByCharacter[activeCharacter.id]
    
    app.innerHTML =  `
        <section class="chat">
            <aside class="chat-sidebar">
                <h2 class="chat-sidebar-title">▼ Personajes</h2>
    
                <div class="chat-character-list">
                    ${characters.map((character) => `
                        <button class="chat-character ${character.id === chatState.activeCharacterId ? 'active' : ''}" type="button" data-character="${character.id}">
                            <img src="${character.image}" alt="${character.name}" />
    
                            <span>
                                <strong>${character.name}</strong>
                                <small>${character.role}</small>
                            </span>
                        </button>
                    `).join('')}
                </div>
            </aside>
    
            <div class="chat-panel">
                <div class="chat-header">
                    <img class="chat-header-image" src="${activeCharacter.image}" alt="${activeCharacter.name}" />
    
                    <div>
                        <h2>${activeCharacter.name}</h2>
                        <p>${activeCharacter.role}</p>
                    </div>

                    <button class="chat-clear-button" type="button" aria-label="Borrar historial">🗑️</button>
                    <button class="chat-menu-button" type="button">▼ Personajes</button>
                    
                </div>
    
                <div class="chat-messages" id="messages"></div>
                <div class="chat-status" id="chat-status"></div>
    
                <form class="chat-form" id="chat-form">
                    <input id="message-input" type="text" placeholder="Escribí tu mensaje..." autocomplete="off"/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        </section>
    `
    
    const messages = document.getElementById('messages')
    renderMessages(messages,activeMessages)
    
    setupChatEvents(characters)
}
