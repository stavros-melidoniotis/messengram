const settingsHelper = require('../helpers/settings')
const path = require('path')

const { app, BrowserWindow } = require('electron')
const { messengerView, instagramView } = require('../browser/browser-views')

app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    version: app.getVersion(),
    authors: ['Stavros Melidoniotis <melidon.stavros@gmail.com>'],
    iconPath: path.join(__dirname, '..', '..', 'resources', 'icons', '64x64.png')
})

exports.toggleDarkMode = (isEnabled, triggeredFromMenu = false) => {
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

    const cssToInsert = (isEnabled) ? darkThemeCSS : lightThemeCSS

    messengerView.webContents.insertCSS(cssToInsert)
    instagramView.webContents.insertCSS(cssToInsert)

    if (triggeredFromMenu) {
        const settings = settingsHelper.readSettingsFile()

        settings.dark_mode = isEnabled
        settingsHelper.writeSettingsFile(settings)

        return
    }

    setMenuItemChecked('menu_item_toggle_dark_mode', isEnabled)
}

exports.showViews = (viewToShow, triggeredFromMenu = false) => {
    const window = BrowserWindow.getAllWindows()[0]
    const windowBounds = window.getBounds()

    switch (viewToShow) {
        case 'both':
            window.addBrowserView(messengerView)
            messengerView.setBounds({ x: 0, y: 0, width: Math.floor(windowBounds.width / 2), height: windowBounds.height })

            window.addBrowserView(instagramView)
            instagramView.setBounds({ x: Math.floor(windowBounds.width / 2), y: 0, width: Math.floor(windowBounds.width / 2), height: windowBounds.height })
            break
        case 'instagram':
            window.removeBrowserView(messengerView)
            window.addBrowserView(instagramView)
            instagramView.setBounds({ x: 0, y: 0, width: windowBounds.width, height: windowBounds.height })
            break
        case 'messenger':
            window.removeBrowserView(instagramView)
            window.addBrowserView(messengerView)
            messengerView.setBounds({ x: 0, y: 0, width: windowBounds.width, height: windowBounds.height })
            break
    }

    if (triggeredFromMenu) {
        const settings = settingsHelper.readSettingsFile()

        settings.views_to_show = viewToShow
        settingsHelper.writeSettingsFile(settings)

        return
    }

    setMenuItemChecked(`menu_item_show_${viewToShow}`)
}

// Sets the menu item checked property to true,
// when a change occured programmatically
function setMenuItemChecked(menuItemId, isEnabled) {
    const { Menu } = require('electron')

    const menu = Menu.getApplicationMenu()
    const correspondingMenuItem = menu.getMenuItemById(menuItemId)

    correspondingMenuItem.checked = isEnabled
}

exports.reloadView = (view) => {
    const window = BrowserWindow.getAllWindows()[0]
    const browserViews = window.getBrowserViews()
    const viewIsVisible = browserViews.find(browserView => {
        return browserView === view
    })

    if (!viewIsVisible) return

    window.removeBrowserView(view)
    window.addBrowserView(view)
}

exports.toggleAppVisibility = () => {
    const window = BrowserWindow.getAllWindows()[0];

    (window.isVisible()) ? window.hide() : window.show()
}

exports.relaunchApp = () => {
    app.relaunch()
    app.quit()
}

exports.openExternalUrl = async (url) => {
    const { shell } = require('electron')
    await shell.openExternal(url)
}