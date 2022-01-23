const { app, Menu } = require('electron')
const menuFunctions = require('./menu-functions')
const { messengerView, instagramView } = require('../browser/browser-views')
const { isMac } = require('../helpers/platform')

const app_menu_template = [
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
                            menuFunctions.toggleDarkMode(e.checked, true)
                        }
                    },
                    { role: 'separator' },
                    {
                        label: 'Messenger && Instagram',
                        id: 'menu_item_show_both',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+1',
                        click: () => {
                            menuFunctions.showViews('both', true)
                        }
                    },
                    {
                        label: 'Messenger only',
                        id: 'menu_item_show_messenger',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+2',
                        click: () => {
                            menuFunctions.showViews('messenger', true)
                        }
                    },
                    {
                        label: 'Instagram only',
                        id: 'menu_item_show_instagram',
                        type: 'radio',
                        accelerator: 'CmdOrCtrl+Shift+3',
                        click: () => {
                            menuFunctions.showViews('instagram', true)
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
                    menuFunctions.reloadView(messengerView)
                }
            },
            {
                label: 'Reload Instagram',
                click: () => {
                    menuFunctions.reloadView(instagramView)
                }
            },
            { type: 'separator' },
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
        // role: 'about',
        label: '&Help',
        type: 'submenu',
        submenu: [
            {
                label: 'Visit Website',
                click: () => {
                    menuFunctions.openExternalUrl('https://stavros-melidoniotis.github.io/messengram')
                }
            },
            {
                label: 'Source Code',
                click: () => {
                    menuFunctions.openExternalUrl('https://github.com/stavros-melidoniotis/messengram')
                }
            },
            {
                label: 'Report an Issue',
                type: 'submenu',
                submenu: [
                    {
                        label: 'via Email',
                        click: () => {
                            menuFunctions.openExternalUrl('mailto:melidon.stavros@gmail.com')
                        }
                    },
                    {
                        label: 'via Github',
                        click: () => {
                            menuFunctions.openExternalUrl('https://github.com/stavros-melidoniotis/messengram/issues')
                        }
                    }
                ]
            },
            { type: 'separator' },
            {
                label: `About ${app.getName()}`,
                click: () => {
                    app.showAboutPanel()
                }
            }
        ]
    }
]

const tray_menu_template = [
    { 
        label: 'Toggle',
        type: 'normal',
        click: () => {
            menuFunctions.toggleAppVisibility()
        } 
    },
    { 
        label: 'Relaunch', 
        click: () => {
            menuFunctions.relaunchApp()
        } 
    },
    { type: 'separator' },
    { 
        label: 'Quit', 
        role: 'quit' 
    }
]

const app_menu = Menu.buildFromTemplate(app_menu_template)
const tray_menu = Menu.buildFromTemplate(tray_menu_template)

module.exports = { 
    app_menu: app_menu,
    tray_menu: tray_menu
}