// smooth scrolling to anchor inspiration - https://codepen.io/AnotherLinuxUser/pen/eZxoQp
const requestAnimationFrame = (() => (
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.onRequestAnimationFrame ||
  window.msRequestAnimationFrame || ((callback) => {
    window.setTimeout(callback, 1000 / 60)
  }
)))()

const isDomElement = (obj) => (obj instanceof Element)

const isMouseEvent = (obj) => (obj instanceof MouseEvent)

const findScrollingElement = (el) => {
  do {
    if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
      return el
    }
  } while (el = el.parentNode)
}

const move = (amount) => {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

const position = () => (
  document.documentElement.offsetTop ||
  document.body.parentNode.offsetTop ||
  document.body.offsetTop
)

Math.easeInOutQuad = (currentTime, startValue, changeInValue, duration) => {
  currentTime = (currentTime / duration) * 2
  if (currentTime < 1) {
    return changeInValue / 2 * currentTime * currentTime + startValue
  }
  currentTime--
  return - changeInValue / 2 * (currentTime * (currentTime - 2) - 1) + startValue
}

Math.easeInCubic = (currentTime, startValue, changeInValue, duration) => (
  startValue + changeInValue * (currentTime / duration) ** 3
)

Math.inOutQuintic = (currentTime, startValue, changeInValue, duration) => {
  let ts = (currentTime / duration) ** 2,
      tc = ts * currentTime
  return startValue + changeInValue + (6 * tc * ts - 15 * (ts ** 2) + 10 * tc)
}

const goTo = (to, callback, duration = 1500) => {
  if (isDomElement(to)) {
    to = to.offsetTop
  }

  let start = position(),
      change = to - start,
      currentTime = 0,
      increment = 20

  const animateScroll = () => {
    currentTime += increment
    const val = Math.easeInOutQuad(currentTime, start, change, duration)
    move(val)
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback && typeof(callback) === 'function') {
        callback()
      }
    }
  }

  animateScroll()
}

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    let anchor = e.target.attributes.href.value.split('#')[1]
    goTo(document.getElementById(anchor), e)
  }, false)
})

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.font = "bolder 30px 'Open Sans', sans-serif"
ctx.fillStyle = '#555'
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'
ctx.fillText('mail.la.costi@gmail.com', 175, 30)
ctx.fillText('+40 742 631 085', 175, 60)

document.querySelector('footer').innerHTML = `<p>${new Date().getFullYear()}</p>`
