function isWeChat() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
}


if (isWeChat()) {
    document.getElementById('splash').innerHTML = `
<div class="slideshow">
  <div class="slides">
    <div class="slide"><img src="images/h1.jpg"></div>
    <div class="slide"><img src="images/h2.jpg"></div>
    <div class="slide"><img src="images/h3.jpg"></div>
    <div class="slide"><img src="images/h4.jpg"></div>
  </div>
</div>
  `;
}

const book = document.getElementById('book');
const pages = document.querySelectorAll('.page');
let currentIdx = 0;

function updateState() {
    pages.forEach((page, index) => {
        if (index < currentIdx) {
            // Page is flipped to the LEFT
            page.classList.add('flipped');
            // Immediate high z-index for flipped pages to stay on top
            page.style.zIndex = 10 + index; 
            page.style.transform = `rotateY(-180deg) translateX(0px)`;
        } else {
            // Page is unflipped on the RIGHT
            page.classList.remove('flipped');
            
            // FIX: Delay the z-index reset when going backward
            // This prevents the "underneath" images from popping in too early
            if (index === currentIdx) {
                setTimeout(() => {
                    if (!page.classList.contains('flipped')) {
                        page.style.zIndex = pages.length - index;
                    }
                }, 150); // Delay roughly 1/4 of your --flip-speed (0.6s)
            } else {
                page.style.zIndex = pages.length - index;
            }
            
            page.style.transform = `rotateY(0deg) translateX(0px)`;
        }
    });
    currentIdx > 0 ? book.classList.add('opened') : book.classList.remove('opened');
}


document.addEventListener('click', (e) => {
    if (e.clientX < window.innerWidth / 2) goPrev();
    else goNext();
});

function goNext() { if (currentIdx < pages.length) { currentIdx++; updateState(); } }
function goPrev() { if (currentIdx > 0) { currentIdx--; updateState(); } }

updateState();