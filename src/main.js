import { navigateTo, router } from "./router/router.js";
import { updateThemeButtonText, saveTheme, applySavedTheme } from "./utils/theme.js";

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

applySavedTheme()

updateThemeButtonText(themeButton)

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('light-theme')
    
    if (document.body.classList.contains('light-theme')) {
        saveTheme('light')
    } else {
        saveTheme('dark')
    }
    
    updateThemeButtonText(themeButton)
})
