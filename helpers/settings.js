const { app } = require('electron')
const fs = require('fs')

const appConfigDir = app.getPath('userData')
const filename = 'messengram_settings.json'
const path = `${appConfigDir}/${filename}`

exports.getDarkModeSetting = () => {
    const settings = this.readSettingsFile()

    return settings.dark_mode_enabled
}

exports.getViewsToShowSetting = () => {
    const settings = this.readSettingsFile()

    return settings.views_to_show
}

exports.settingsFileExists = () => {
    return fs.existsSync(path)
}

exports.createSettingsFile = () => {
    const content = {
        dark_mode_enabled: false,
        views_to_show: 'both'
    }

    this.writeSettingsFile(content)
}

exports.readSettingsFile = () => {
    const data = fs.readFileSync(path, 'utf-8')

    return JSON.parse(data)
}

exports.writeSettingsFile = (content) => {
    fs.writeFileSync(path, JSON.stringify(content))
}