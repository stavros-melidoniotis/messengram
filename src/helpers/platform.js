exports.isMac = () => {
    return process.platform === 'darwin'
}

exports.isWin = () => {
    return process.platform === 'win32'
}

exports.isLinux = () => {
    return process.platform === 'linux'
}