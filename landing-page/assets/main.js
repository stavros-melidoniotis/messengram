window.addEventListener('DOMContentLoaded', () => {
    const userPlatform = window.navigator.userAgentData.platform || window.navigator.platform

    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']

    if (macosPlatforms.indexOf(userPlatform) !== -1) {
        recommendDownloadFor('MacOS')
        return
    }

    if (windowsPlatforms.indexOf(userPlatform) !== -1) {
        recommendDownloadFor('Windows')
        return
    }

    if (/Linux/.test(userPlatform)) {
        recommendDownloadFor('Linux')
        return
    }

    recommendDownloadFor('unknown')
})

function recommendDownloadFor(platform) {
    const platformsWrapper = document.getElementById('platforms-wrapper')

    if (platform === 'unknown') {
        platformsWrapper.style.justifyContent = 'center'
        return
    }

    const recommendationDiv = document.getElementById('recommendation')
    const recommendationText = document.createElement('h2')

    recommendationText.innerText = `Seems like you're using ${platform}. Here's the download link 👇`
    recommendationDiv.appendChild(recommendationText)

    const correspondingPlatform = document.getElementById(platform.toLowerCase())

    if (!correspondingPlatform) return

    const downloadLinks = document.getElementById('dl-links')

    correspondingPlatform.remove()
    recommendationDiv.appendChild(correspondingPlatform)

    const otherPlatformsText = document.createElement('h2')

    otherPlatformsText.innerText = 'Other Platforms:'
    downloadLinks.prepend(otherPlatformsText)

}