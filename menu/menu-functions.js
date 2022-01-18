const settingsHelper = require('../helpers/settings')

const { window, WINDOW_WIDTH, WINDOW_HEIGHT } = require('../UI/browser-window')
const { messengerView, instagramView } = require('../UI/browser-views')

exports.toggleDarkMode = (enable, triggeredFromMenu = false) => {
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

    const cssToInsert = (enable) ? darkThemeCSS : lightThemeCSS

    messengerView.webContents.insertCSS(cssToInsert)
    instagramView.webContents.insertCSS(cssToInsert)

    if (triggeredFromMenu) {
        const settings = settingsHelper.readSettingsFile()

        settings.dark_mode_enabled = enable
        settingsHelper.writeSettingsFile(settings)

        return
    }

    setMenuItemChecked('menu_item_toggle_dark_mode')
}

exports.showViews = (viewToShow, triggeredFromMenu = false) => {
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
function setMenuItemChecked(menuItemId) {
    const { Menu } = require('electron')

    const menu = Menu.getApplicationMenu()
    const correspondingMenuItem = menu.getMenuItemById(menuItemId)

    correspondingMenuItem.checked = true
}

exports.reloadView = (view) => {
    const browserViews = window.getBrowserViews()
    const viewIsVisible = browserViews.find(browserView => {
        return browserView === view
    })

    if (!viewIsVisible) return

    window.removeBrowserView(view)
    window.addBrowserView(view)
}