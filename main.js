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

        // Set the initial views based on user preferences
        setTimeout(() => {
            showViews(settingsHelper.getViewsToShowSetting())
        }, 100)

        // Set dark theme on/off based on user preferences
        setTimeout(() => {
            toggleDarkMode(settingsHelper.getDarkModeSetting())
        }, 1000)

        // Resize views when window gets maximized
        window.on('resize', () => {
            if (!window.isMaximized()) return

            const attachedViews = window.getBrowserViews()
            const totalViews = attachedViews.length
            const windowBounds = window.getBounds()

            for (let view of attachedViews) {
                const currentX = view.getBounds().x
                const currentY = view.getBounds().y

                setTimeout(() => {
                    view.setBounds({ x: currentX, y: currentY, width: Math.floor(windowBounds.width / totalViews), height: windowBounds.height })
                }, 50)
            }
        })
    }
)

app.on('window-all-closed', () => {
    if (!isMac()) app.quit()
})