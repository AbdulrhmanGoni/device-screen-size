const deviceWidthElement = document.getElementById("width-elem")
const deviceHeightElement = document.getElementById("height-elem")

function template(dir, value) {
    return `Your device's screen <strong class="primary-color">${dir}</strong> is: ${value}`
}

function updateDeviceScreenSize() {
    if (document.fullscreenElement) {
        deviceWidthElement.innerHTML = template("width", "loading...")
        deviceHeightElement.innerHTML = template("height", "loading...")

        timeoutId = setTimeout(() => {
            if (document.fullscreenElement) {
                deviceWidthElement.innerHTML = template("width", `${globalThis.innerWidth}px`)
                deviceHeightElement.innerHTML = template("height", `${globalThis.innerHeight}px`)
            }
        }, 1000)
    } else {
        deviceWidthElement.innerHTML = ""
        deviceHeightElement.innerHTML = ""
    }
}

globalThis.addEventListener('fullscreenchange', updateDeviceScreenSize);

const page = document.documentElement

const openFullScreenButton = document.getElementById("full-screen-mode-button")

if (page && openFullScreenButton) {
    openFullScreenButton.onclick = () => {
        const guideParagraph = document.querySelector(".guideness")
        if (document.fullscreenElement) {
            guideParagraph.classList.add("visable")
            openFullScreenButton.textContent = "Open Full Screen Mode"
            document.exitFullscreen();
        } else {
            if (page.requestFullscreen) {
                page.requestFullscreen();
            } else if (page.webkitRequestFullscreen) {
                page.webkitRequestFullscreen();
            } else if (page.msRequestFullscreen) {
                page.msRequestFullscreen();
            }
            guideParagraph.classList.remove("visable")
            openFullScreenButton.textContent = "Exit Full Screen Mode"
        }
    }
}
