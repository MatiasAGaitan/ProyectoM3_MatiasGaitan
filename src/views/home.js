import { setupHomeEvents } from "../logic/homeEvents.js"
import { characters } from "../personalities/index.js"

export function renderHome() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <section class="home-view">
      <div class="home-hero">
        <h2 class="home-title">Habla con tu personaje favorito.</h2>
    
        <p class="home-description">
          Elegí un personaje y empezá una conversación impulsada por inteligencia artificial.
        </p>
      </div>
    
      <div class="characters-section">
        <div class="characters-grid">
          ${characters.map((character) => `
            <article class="character-card character-${character.id}">
              <button class="character-info-button" type="button" aria-label="Ver información de ${character.name}">
                i
              </button>
    
              <div class="character-card-content">
                <div class="character-main-row">
                  <div>
                    <h4>${character.name}</h4>
                    <p class="character-role">${character.role}</p>
                  </div>
    
                  <a class="character-button" href="/chat" data-link data-character="${character.id}">
                    Hablar ↗
                  </a>
                </div>
    
                <div class="character-extra-info">
                  <p class="character-description">
                    ${character.description}
                  </p>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `
  
  setupHomeEvents()
}
