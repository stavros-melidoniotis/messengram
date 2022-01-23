const { app, BrowserWindow } = require('electron')

const WINDOW_WIDTH = 1100
const WINDOW_HEIGHT = 700

const window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    title: app.getName(),
    center: true
})

// Resize views when window gets maximized
window.on('resize', () => {
    if (!window.isMaximized()) return

    const attachedViews = window.getBrowserViews()
    const totalViews = attachedViews.length
    const windowBounds = window.getBounds()

    for (let view of attachedViews) {
        const currentX = view.getBounds().x
        const currentY = view.getBounds().y

        setTimeout(() => {
            view.setBounds({ x: currentX, y: currentY, width: Math.floor(windowBounds.width / totalViews), height: windowBounds.height })
        }, 50)
    }
})

module.exports = { 
    window: window,
    WINDOW_WIDTH: WINDOW_WIDTH,
    WINDOW_HEIGHT: WINDOW_HEIGHT
}