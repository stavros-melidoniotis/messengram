const { app, BrowserWindow, BrowserView, Menu } = require('electron')

const WINDOW_WIDTH = 1200
const WINDOW_HEIGHT = 700

const createWindow = () => {
    const window = new BrowserWindow({
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        title: 'Messengram'
    })

    const messengerView = new BrowserView()
    const instagramView = new BrowserView()

    window.addBrowserView(messengerView)
    messengerView.setBounds({ x: 0, y: 0, width: WINDOW_WIDTH/2, height: WINDOW_HEIGHT })
    messengerView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
    messengerView.webContents.loadURL('https://messenger.com')

    window.addBrowserView(instagramView)
    instagramView.setBounds({ x: WINDOW_WIDTH/2, y: 0, width: WINDOW_WIDTH/2, height: WINDOW_HEIGHT })
    instagramView.setAutoResize({ width: true, height: true, horizontal: true, vertical: true })
    instagramView.webContents.loadURL('https://instagram.com')

    const darkThemeJS = `
        (function () { 
            // the css we are going to inject
            var css = 'html {-webkit-filter: invert(100%);' +
                '-moz-filter: invert(100%);' + 
                '-o-filter: invert(100%);' + 
                '-ms-filter: invert(100%); }' +
                
                'img, image {' +
                    '-webkit-filter: invert(1);' +
                    '-moz-filter: invert(1);' +
                    '-o-filter: invert(1);' +
                    '-ms-filter: invert(1);' + 
                '}',
            
            head = document.getElementsByTagName('head')[0],
            style = document.createElement('style');
            
            style.type = 'text/css';

            if (style.styleSheet){
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            
            //injecting the css to the head
            head.appendChild(style);
            }());
    `

    messengerView.webContents.executeJavaScript(darkThemeJS)
    instagramView.webContents.executeJavaScript(darkThemeJS)
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})