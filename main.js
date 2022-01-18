const { app, Menu } = require('electron')
const { isMac } = require('./helpers/platform')

const settingsHelper = require('./helpers/settings')

const createWindow = () => {
    const { window } = require('./UI/browser-window')

    return window
}

app.whenReady()
    .then(() => {
        if (!settingsHelper.settingsFileExists()) {
            settingsHelper.createSettingsFile()
        }
    })
    .then(() => {
        const { messengerView, instagramView } = require('./UI/browser-views')
        const { menu } = require('./menu/menu-template')
        const { toggleDarkMode, showViews } = require('./menu/menu-functions')

        const window = createWindow()
        window.addBrowserView(messengerView)
        window.addBrowserView(instagramView)

        Menu.setApplicationMenu(menu)

        setTimeout(() => {
            toggleDarkMode(settingsHelper.getDarkModeSetting())
            showViews(settingsHelper.getViewsToShowSetting())
        }, 2000)
    }
)

app.on('window-all-closed', () => {
    if (!isMac()) app.quit()
})