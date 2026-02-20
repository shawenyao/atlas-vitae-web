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
            page.classList.add('flipped');
            page.style.transform = `rotateY(-180deg) translateX(0px)`;
            page.style.zIndex = 10 + index;
        } else {
            page.classList.remove('flipped');
            // Stacked offset on the right
            const offset = (index - currentIdx) * 3;
            page.style.transform = `rotateY(0deg) translateX(${offset}px)`;
            page.style.zIndex = pages.length - index;
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