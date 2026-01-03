const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio,2)
}

const canvas = document.getElementById("app")

function applyViewportState() {
  canvas.width  = viewport.width  * viewport.pixelRatio
  canvas.height = viewport.height * viewport.pixelRatio

  canvas.style.width  = `${viewport.width}px`
  canvas.style.height = `${viewport.height}px`
}

window.addEventListener('resize', () => {
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
  viewport.pixelRatio = Math.min(window.devicePixelRatio, 2)

  applyViewportState()
})
applyViewportState()