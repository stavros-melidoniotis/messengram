const { app, Menu } = require('electron')
const { isMac } = require('./helpers/platform')

const createWindow = () => {
    const { window } = require('./UI/browser-window')

    return window
}

app.whenReady().then(() => {
    window = createWindow()

    const { messengerView, instagramView } = require('./UI/browser-views')

    window.addBrowserView(messengerView)
    window.addBrowserView(instagramView)

    const { menuTemplate } = require('./menu')

    const template = menuTemplate()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (!isMac()) app.quit()
})