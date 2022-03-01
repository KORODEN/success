const slider = document.querySelector('.slider')
slider.innerHTML = `
<div class="images">
    <div class="image active">
        <img src="assets/images/slider/Rectangle 10.png" alt="Slider image">
    </div>

    <div class="image">
        <img src="assets/images/slider/Rectangle 11.png" alt="Slider image">
    </div>

    <div class="image">
        <img src="assets/images/slider/Rectangle 12.png" alt="Slider image">
    </div>

    <div class="arrow-left">
        <img src="assets/images/slider/Vector 3.png" alt="">
    </div>
    <div class="arrow-right">
        <img src="assets/images/slider/Vector 4.png" alt="">
    </div>

    <div class="slider-text">
        <h1>Slide this photo</h1>
        <br>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
    </div>

    <div class="dots">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
</div>`


const leftBtn = document.querySelector('.arrow-left')
const rightBtn = document.querySelector('.arrow-right')
const images = document.querySelectorAll('.image')
const dots = document.querySelectorAll('.dot')
let index = 0

images[index].classList.add('active')
dots[index].classList.add('active')

leftBtn.addEventListener('click', () => {
    changeSlide(-1)
})

rightBtn.addEventListener('click', () => {
    changeSlide(1)
})

for(let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
        for(const image of images) {
            image.classList.remove('active')
        }
    
        for(const dot of dots) {
            dot.classList.remove('active')
        }

        images[i].classList.add('active')
        dots[i].classList.add('active')
        index = i
    })
}

function changeSlide(direction) {
    for(const image of images) {
        image.classList.remove('active')
    }

    for(const dot of dots) {
        dot.classList.remove('active')
    }

    if (direction === -1) {
        index--
        if(index < 0) {
            index = images.length - 1
        }
    } else {
        index++
        if(index === images.length){
            index = 0
        }
    }
    images[index].classList.add('active')
    dots[index].classList.add('active')
}