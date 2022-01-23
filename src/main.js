const { app, Menu } = require('electron')
const { isMac } = require('./helpers/platform')

const settingsHelper = require('./helpers/settings')

const createWindow = () => {
    const { window } = require('./browser/browser-window')

    return window
}

app.whenReady()
    .then(() => {
        if (!settingsHelper.settingsFileExists()) {
            settingsHelper.createSettingsFile()
        }
    })
    .then(() => {
        const { messengerView, instagramView } = require('./browser/browser-views')
        const { app_menu } = require('./menu/menu-templates')
        const { toggleDarkMode, showViews } = require('./menu/menu-functions')
        const { tray } = require('./tray')

        const window = createWindow()
        window.addBrowserView(messengerView)
        window.addBrowserView(instagramView)

        Menu.setApplicationMenu(app_menu)

        window.on('ready-to-show', () => {
            // Set the initial views based on user preferences
            showViews(settingsHelper.getViewsToShowSetting())

            // Set dark theme on/off based on user preferences
            toggleDarkMode(settingsHelper.getDarkModeSetting())
        })
    })

app.on('window-all-closed', () => {
    if (!isMac()) app.quit()
})