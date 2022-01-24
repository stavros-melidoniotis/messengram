const { app, Tray, nativeImage } = require('electron')
const { tray_menu } = require('./menu/menu-templates')
const { isMac } = require('./helpers/platform')

const path = require('path')

const trayIcon = nativeImage.createFromPath(path.join(__dirname, '..', 'resources', 'icons', '16x16.png'))
const tray = new Tray(trayIcon)

tray.setToolTip(app.getName())

if (isMac()) {
    tray.setTitle(app.getName())
}

const setTrayMenu = () => {
    tray.setContextMenu(tray_menu)
}

setTrayMenu()

tray.on('click', () => {
    tray.setContextMenu(tray_menu)
})

module.exports = { tray }