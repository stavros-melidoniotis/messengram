const { app, Menu, BrowserWindow } = require('electron')
const { isMac } = require('./helpers/platform')

const settingsHelper = require('./helpers/settings')

const createWindow = () => {
    const { windowWidth, windowHeight } = settingsHelper.getWindowDimensionsSetting()

    const window = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        title: app.getName(),
        center: true
    })

    return window
}

const initializeApp = (firstTime = true) => {
    const { messengerView, instagramView } = require('./browser/browser-views')
    const { app_menu } = require('./menu/menu-templates')
    const { toggleDarkMode, showViews } = require('./menu/menu-functions')
    const { tray } = require('./tray')

    const window = createWindow();

    (firstTime) ?
        (window.addBrowserView(messengerView), window.addBrowserView(instagramView)) :
        showViews(settingsHelper.getViewsToShowSetting())

    Menu.setApplicationMenu(app_menu)

    window.on('ready-to-show', () => {
        // Set the initial views based on user preferences
        showViews(settingsHelper.getViewsToShowSetting())

        // Set dark theme on/off based on user preferences
        toggleDarkMode(settingsHelper.getDarkModeSetting())
    })

    // Resize views when window resizes
    window.on('resize', () => {
        const attachedViews = window.getBrowserViews()
        const totalViews = attachedViews.length
        const windowBounds = window.getBounds()

        const windowWidth = windowBounds.width
        const windowHeight = isMac() ? windowBounds.height - 20 : windowBounds.height

        for (let view of attachedViews) {
            let currentX = view.getBounds().x
            const currentY = view.getBounds().y

            if (currentX !== 0) {
                currentX = Math.floor(windowWidth / totalViews)
            }

            setTimeout(() => {
                view.setBounds({ x: currentX, y: currentY, width: Math.floor(windowWidth / totalViews), height: windowHeight })
            }, 10)
        }
    })
}

app.whenReady()
    .then(() => {
        if (!settingsHelper.settingsFileExists()) {
            settingsHelper.createSettingsFile()
        }
    })
    .then(initializeApp)

app.on('window-all-closed', () => {
    if (!isMac()) app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        initializeApp(false)
    }
})