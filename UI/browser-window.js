const { BrowserWindow } = require('electron')

const WINDOW_WIDTH = 1100
const WINDOW_HEIGHT = 700

const window = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    title: 'Messengram',
    center: true
})

module.exports = { 
    window: window,
    WINDOW_WIDTH: WINDOW_WIDTH,
    WINDOW_HEIGHT: WINDOW_HEIGHT
}