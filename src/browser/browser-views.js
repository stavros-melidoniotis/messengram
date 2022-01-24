const { app, BrowserView } = require('electron')
const { window, WINDOW_WIDTH, WINDOW_HEIGHT } = require('./browser-window')
const { isMac } = require('../helpers/platform')

const MESSENGER_URL = 'https://messenger.com'
const INSTAGRAM_URL = 'https://instagram.com'

const messengerView = new BrowserView()
const instagramView = new BrowserView()

if (!isMac()) {
    messengerView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
    instagramView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
}

messengerView.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH / 2, height: WINDOW_HEIGHT - 20 })
messengerView.webContents.loadURL(MESSENGER_URL)

messengerView.webContents.on('page-title-updated', () => {
    const pageTitle = messengerView.webContents.getTitle()
    const pageTitleEdited = pageTitle.replace(/ Messenger|Messenger/, '')
    const messengerTitlePart = (pageTitleEdited == '') ? '' : `${pageTitleEdited} -`

    window.setTitle(`${messengerTitlePart} ${app.getName()}`)
})

instagramView.setBounds({ x: WINDOW_WIDTH / 2, y: 0, width: WINDOW_WIDTH / 2, height: WINDOW_HEIGHT })
instagramView.webContents.loadURL(INSTAGRAM_URL)

module.exports = { 
    messengerView: messengerView,
    instagramView: instagramView 
}