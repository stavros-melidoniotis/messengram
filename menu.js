const { messengerView, instagramView } = require('./UI/browser-views')
const { window, WINDOW_WIDTH, WINDOW_HEIGHT } = require('./UI/browser-window')
const { isMac } = require('./helpers/platform')

exports.menuTemplate = () => {
    return template = [
        // { role: 'appMenu' }
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
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                (isMac()) ? { role: 'close' } : { role: 'quit' }
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
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
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                {
                    label: 'Dark Mode',
                    accelerator: 'CmdOrCtrl+D',
                    type: 'checkbox',
                    click: (e) => {
                        toggleDarkMode(e, messengerView, instagramView)
                    }
                },
                {
                    label: 'Show',
                    type: 'submenu',
                    submenu: [
                        {
                            label: 'Messenger && Instagram',
                            type: 'radio',
                            accelerator: 'CmdOrCtrl+Shift+1',
                            click: () => {
                                showViews('both')
                            }
                        },
                        {
                            label: 'Messenger only',
                            type: 'radio',
                            accelerator: 'CmdOrCtrl+Shift+2',
                            click: () => {
                                showViews('messenger')
                            }
                        },
                        {
                            label: 'Instagram only',
                            type: 'radio',
                            accelerator: 'CmdOrCtrl+Shift+3',
                            click: () => {
                                showViews('instagram')
                            }
                        },
                    ]
                },
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
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
        {
            role: 'help',
            submenu: [
                {
                    label: 'View Code',
                    click: async () => {
                        const { shell } = require('electron')
                        await shell.openExternal('https://github.com/stavros-melidoniotis/messengram')
                    }
                }
            ]
        }
    ]
}

function toggleDarkMode(event, messengerView, instagramView) {
    const darkThemeCSS = `
        html {
            -webkit-filter: invert(100%);
            -moz-filter: invert(100%);
            -o-filter: invert(100%);
            -ms-filter: invert(100%); 
        }
        
        img, image {
            -webkit-filter: invert(1);
            -moz-filter: invert(1);
            -o-filter: invert(1);
            -ms-filter: invert(1);
        }`

    const lightThemeCSS = `
        html {
            -webkit-filter: invert(0);
            -moz-filter: invert(0);
            -o-filter: invert(0);
            -ms-filter: invert(0); 
        }

        img, image {
            -webkit-filter: invert(0);
            -moz-filter: invert(0);
            -o-filter: invert(0);
            -ms-filter: invert(0);
        }`

    const cssToInsert = (event.checked) ? darkThemeCSS : lightThemeCSS

    messengerView.webContents.insertCSS(cssToInsert)
    instagramView.webContents.insertCSS(cssToInsert)
}

function showViews(viewToShow) {
    switch (viewToShow) {
        case 'both':
            window.addBrowserView(messengerView)
            messengerView.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH / 2, height: WINDOW_HEIGHT })

            window.addBrowserView(instagramView)
            instagramView.setBounds({ x: WINDOW_WIDTH / 2, y: 0, width: WINDOW_WIDTH / 2, height: WINDOW_HEIGHT })
            break
        case 'instagram':
            window.removeBrowserView(messengerView)
            window.addBrowserView(instagramView)
            instagramView.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH, height: WINDOW_HEIGHT })
            break
        case 'messenger':
            window.removeBrowserView(instagramView)
            window.addBrowserView(messengerView)
            messengerView.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH, height: WINDOW_HEIGHT })
            break
    }
}