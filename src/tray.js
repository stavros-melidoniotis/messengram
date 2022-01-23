const { app, Tray } = require('electron')
const { tray_menu } = require('./menu/menu-templates')
const { isMac } = require('./helpers/platform')

const path = require('path')

const trayIconPath = path.join(__dirname, '..', 'build', 'icons', '512x512.png')
const tray = new Tray(trayIconPath)

tray.setToolTip(app.getName())

if (isMac()) {
    tray.setTitle(app.getName())
}

const setTrayMenu = () => {
    tray.setContextMenu(tray_menu)
}

setTrayMenu()

tray.on('click', () => {
    setTrayMenu()
})

module.exports = { tray }