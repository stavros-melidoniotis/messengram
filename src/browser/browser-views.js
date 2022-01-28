const { BrowserView } = require('electron')
const { isMac } = require('../helpers/platform')

const settingsHelper = require('../helpers/settings')

const MESSENGER_URL = 'https://messenger.com'
const INSTAGRAM_URL = 'https://instagram.com'
const messengerView = new BrowserView()
const instagramView = new BrowserView()

const { windowWidth, windowHeight } = settingsHelper.getWindowDimensionsSetting()

if (!isMac()) {
    messengerView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
    instagramView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
}

messengerView.setBounds({ x: 0, y: 0, width: windowWidth / 2, height: windowHeight - 20 })
messengerView.webContents.loadURL(MESSENGER_URL)

instagramView.setBounds({ x: windowWidth / 2, y: 0, width: windowWidth / 2, height: windowHeight })
instagramView.webContents.loadURL(INSTAGRAM_URL)

module.exports = { 
    messengerView: messengerView,
    instagramView: instagramView 
}