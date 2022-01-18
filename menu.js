const { messengerView, instagramView } = require('./UI/browser-views')
const { window, WINDOW_WIDTH, WINDOW_HEIGHT } = require('./UI/browser-window')
const { isMac } = require('./helpers/platform')

exports.menuTemplate = () => {
    return template = [
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
                            accelerator: 'CmdOrCtrl+D',
                            type: 'checkbox',
                            click: (e) => {
                                toggleDarkMode(e, messengerView, instagramView)
                            }
                        },
                        { role: 'separator' },
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
}

function toggleDarkMode(event, messengerView, instagramView) {
    const darkThemeCSS = `
        html {
            -webkit-filter: invert(100%);
            -moz-filter: invert(100%);
            -o-filter: invert(100%);
            -ms-filter: invert(100%); 
        }
        
        img, 
        svg,
        .jllm4f4h,
        .qbubdy2e {
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

        img, 
        svg,
        .jllm4f4h,
        .qbubdy2e {
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

function reloadView(view) {
    const browserViews = window.getBrowserViews()
    const viewIsVisible = browserViews.find(browserView => {
        return browserView === view
    })

    if (!viewIsVisible) return

    window.removeBrowserView(view)
    window.addBrowserView(view)
}