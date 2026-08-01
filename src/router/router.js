import { renderAbout } from "../views/about.js";
import { renderChat } from "../views/chat.js";
import { renderHome } from "../views/home.js";
import { renderNotFound } from "../views/notFound.js";

const routes = {
    '/': renderHome,
    '/chat': renderChat,
    '/about': renderAbout,
}

export function router() {
    const path = window.location.pathname
    const renderView = routes[path] || renderNotFound

    renderView()
}

export function navigateTo(path) {
    history.pushState({}, '', path)
    router()
}