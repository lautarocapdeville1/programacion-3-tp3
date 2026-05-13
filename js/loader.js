const loaderStart = Date.now()
const MIN_LOADER_TIME = 800
const FADE_DURATION = 500

window.addEventListener('load', () => {
  const contenedor_loader = document.querySelector('.contenedor_loader')
  const elapsed = Date.now() - loaderStart
  const delay = Math.max(0, MIN_LOADER_TIME - elapsed)

  setTimeout(() => {
    contenedor_loader.style.opacity = 0
    setTimeout(() => {
      contenedor_loader.style.visibility = 'hidden'
    }, FADE_DURATION)
  }, delay)
})
