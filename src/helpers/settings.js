const fs = require('fs')
const path = require('path')

const { app } = require('electron')

const appConfigDir = app.getPath('userData')
const filename = 'messengram_settings.json'
const filepath = path.join(appConfigDir, filename)

exports.getWindowDimensionsSetting = () => {
    const settings = this.readSettingsFile()

    return {
        windowWidth: settings.window_width,
        windowHeight: settings.window_height
    }
}

exports.getDarkModeSetting = () => {
    const settings = this.readSettingsFile()

    return settings.dark_mode
}

exports.getViewsToShowSetting = () => {
    const settings = this.readSettingsFile()

    return settings.views_to_show
}

exports.settingsFileExists = () => {
    return fs.existsSync(filepath)
}

exports.createSettingsFile = () => {
    const content = {
        window_width: 1100,
        window_height: 700,
        dark_mode: false,
        views_to_show: 'both'
    }

    this.writeSettingsFile(content)
}

exports.readSettingsFile = () => {
    const data = fs.readFileSync(filepath, 'utf-8')

    return JSON.parse(data)
}

exports.writeSettingsFile = (content) => {
    fs.writeFileSync(filepath, JSON.stringify(content))
}