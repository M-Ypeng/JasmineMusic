const MAX_FONT_SIZE = 420

// // // 定义最大的屏幕宽度
// document.addEventListener('DOMContentLoaded', () => {
//   const html = document.querySelector('html')
//   let fontSize = window.innerWidth / 10
//   fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
//   console.log(fontSize,'fontSize');
//   html.style.fontSize = fontSize + 'px'

// })


function inMobile() {
    // document.getElementsByTagName('html')[0].style.fontSize =
    //     (document.documentElement.clientWidth / 450) * 100 + 'px';

    const html = document.querySelector('html')
      let fontSize = window.innerWidth / 10
      fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
      console.log(fontSize,'fontSize');
      html.style.fontSize = fontSize + 'px'
}
document.addEventListener('DOMContentLoaded', inMobile);
window.onresize = inMobile;