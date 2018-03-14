const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.font = "bolder 30px 'Open Sans', sans-serif"
ctx.fillStyle = '#555'
ctx.textBaseline = 'middle'
ctx.textAlign = 'center'
ctx.fillText('mail.la.costi@gmail.com', 175, 30)
ctx.fillText('+40 742 631 085', 175, 60)

document.querySelector('footer').innerHTML = `<p>${new Date().getFullYear()}</p>`
