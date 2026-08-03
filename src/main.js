import { navigateTo, router } from "./router/router.js";

document.addEventListener("click", (event)=>{
    const link = event.target.closest('a[data-link]')
    if(link){
        event.preventDefault()
        const url = link.getAttribute("href")
        navigateTo(url)
    }
})

window.addEventListener("popstate", ()=>{
    router()
})

document.addEventListener("DOMContentLoaded", ()=>{
    router()
})

const themeButton = document.getElementById('theme-toggle');
const THEME_STORAGE_KEY = 'chatweb_theme'

function updateThemeButtonText() {
    if (document.body.classList.contains('light-theme')) {
        themeButton.textContent = 'Dark mode'
    } else {
        themeButton.textContent = 'Light mode'
    }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)

if (savedTheme === 'light') {
    document.body.classList.add('light-theme')
}

updateThemeButtonText()

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme')
    
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem(THEME_STORAGE_KEY, 'light')
    } else {
        localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    }
    
    updateThemeButtonText()
})
