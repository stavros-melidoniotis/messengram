const { Menu } = require('electron')
const { toggleDarkMode, showViews, reloadView } = require('./menu-functions')
const { messengerView, instagramView } = require('../UI/browser-views')
const { isMac } = require('../helpers/platform')

const template = [
    ...(isMac() ? [{
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
        ]
    }] : []),
    // File
    {
        label: '&File',
        submenu: [
            {
                label: 'Preferences',
                submenu: [
                    {
                        label: 'Toggle Dark Mode',
                        id: 'menu_item_toggle_dark_mode',
                        accelerator: 'CmdOrCtrl+D',
                        type: 'checkbox',
                        click: (e) => {
                            toggleDarkMode(e.checked, true)
                        }
                    },
                    { role: 'separator' },
                    {
                        label: 'Messenger && Instagram',
                        id: 'menu_item_show_both',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+1',
                        click: (e) => {
                            showViews('both', true)
                        }
                    },
                    {
                        label: 'Messenger only',
                        id: 'menu_item_show_messenger',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+2',
                        click: (e) => {
                            showViews('messenger', true)
                        }
                    },
                    {
                        label: 'Instagram only',
                        id: 'menu_item_show_instagram',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+3',
                        click: (e) => {
                            showViews('instagram', true)
                        }
                    }
                ]
            },
            (isMac()) ? { role: 'close' } : { role: 'quit' }
        ]
    },
    // Edit
    {
        label: '&Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac() ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startSpeaking' },
                        { role: 'stopSpeaking' }
                    ]
                }
            ] : [
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ])
        ]
    },
    // View
    {
        label: '&View',
        role: 'viewMenu',
        submenu: [
            {
                label: 'Reload Messenger',
                click: () => {
                    reloadView(messengerView)
                }
            },
            {
                label: 'Reload Instagram',
                click: () => {
                    reloadView(instagramView)
                }
            },
            { role: 'separator' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { role: 'resetZoom' },
        ]
    },
    // Window
    {
        label: '&Window',
        submenu: [
            { role: 'minimize' },
            { role: 'togglefullscreen' },
            ...(isMac() ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' },
                { role: 'window' }
            ] : [
                { role: 'close' }
            ])
        ]
    },
    // Help
    {
        role: 'about',
        label: '&About',
        submenu: [
            {
                label: 'View Code',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://github.com/stavros-melidoniotis/messengram')
                }
            },
            {
                label: 'Creator',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://www.linkedin.com/in/stavros-melidoniotis/')
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)

module.exports = { menu }