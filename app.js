let genderResult

const select = new Select('#select', {
    placeholder: 'Choose your gender',
    data: [
        {id: '1', value: 'Male'},
        {id: '2', value: 'Female'}
    ],
    onSelect(item) {
        genderResult = item
    }
})

const date = document.querySelector('#date')

const currentDate = new Date().getFullYear()
document.onselectstart = () => false
document.ondragstart = () => false

date.addEventListener('input', () => {
    if(date.value.length == 1) {
        if(date.value[0] != ' ' && date.value[0] >= 0 && date.value[0] <= 3) {

        }else {
            date.value = ''
        }
    } else if (date.value.length == 2) {
        if(date.value[1] != ' ' && date.value[0] != 3 && date.value[1] >= 0 && date.value[1] <= 9
            || date.value[1] >= 0 && date.value[1] <= 1) {
                date.value = date.value + '.'
        }else {
            date.value = date.value[0]
        }
    } else if (date.value.length == 4) {
        if(date.value[3] != ' ' && date.value[3] >= 0 && date.value[3] <= 1) {
                
        }else {
            date.value = date.value[0] + date.value[1] + '.'
        }
    } else if (date.value.length == 5) {
        if(date.value[4] != ' ' && ((date.value[0] == 2 && date.value[1] <= 8 || date.value[0] == 1) && date.value[3] == 0 && date.value[4] == 2)
        || ((date.value[0] == 3 && date.value[1] == 0 || date.value[0] != 3) && date.value[3] == 0 && (date.value[4] == 4 || date.value[4] == 6 || date.value[4] == 9))
        || ((date.value[0] == 3 && date.value[1] == 0 || date.value[0] != 3) && date.value[3] == 1 && date.value[4] == 1)
        || (date.value[3] == 1 && date.value[4] == 2 || date.value[4] == 0)
        || (date.value[3] == 0 && date.value[4] == 1 || date.value[4] == 3 || date.value[4] == 5 || date.value[4] == 7 || date.value[4] == 8)) {
            date.value = date.value + '.'
        }else {
            date.value = date.value[0] + date.value[1] + '.' + date.value[3]
        }
    } else if (date.value.length == 7) {
        if(date.value[6] != ' ' && date.value[6] == 2 || date.value[6] == 1) {

        }else {
            date.value = date.value[0] + date.value[1] + '.' + date.value[3] + date.value[4] + '.'
        }
    } else if (date.value.length == 8) {
        if(date.value[7] != ' ' && date.value[6] == 1 && date.value[7] == 9 || date.value[6] == 2 && date.value[7] == 0) {

        }else {
            date.value = date.value[0] + date.value[1] + '.' + date.value[3] + date.value[4] + '.' + date.value[6]
        }
    } else if (date.value.length == 9) {
        if(date.value[8] != ' ' && date.value[7] == 9 && date.value[8] >= 2 && date.value[8] <= 9 || date.value[7] == 0 && date.value[8] <= currentDate.toString()[2]) {

        }else {
            date.value = date.value[0] + date.value[1] + '.' + date.value[3] + date.value[4] + '.' + date.value[6] + date.value[7]
        }
    } else if (date.value[9] != ' ' && date.value.length == 10) {
        if(date.value[7] == 9 && date.value[9] <= 9 || date.value[7] == 0 && +(date.value[8].toString() + date.value[9].toString()) <= +((currentDate - 1).toString()[2] + (currentDate - 1).toString()[3])) {
            date.classList.add('well-done')
            if(countryField.classList.contains('well-done') && cityField.classList.contains('well-done') && date.classList.contains('well-done')) {
                thirdRow.style.display = 'flex'
            }
        }else {
            date.value = date.value[0] + date.value[1] + '.' + date.value[3] + date.value[4] + '.' + date.value[6] + date.value[7] + date.value[8]
        }
    } else if (date.value.length == 11) {
        date.value = date.value[0] + date.value[1] + '.' + date.value[3] + date.value[4] + '.' + date.value[6] + date.value[7] + date.value[8] + date.value[9]
    }
})

date.addEventListener('keydown', (event) => {
    if(event.keyCode == 8 && date.value[date.value.length - 1] == '.') {
        date.value = date.value.slice(0, date.value.length - 1)
    }
})


//Smooth scrolling via anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault()
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        })
    })
})

//function for uploading files
upload('#file', {
    triggerBtn: 'button',
    multi: true,
    accept: ['.png', '.jpg', '.jpeg', '.pdf']
})

const selectField = document.querySelector('#select')
const nameField = document.querySelector('#name')

const secondRow = document.querySelector('.second-row')
const thirdRow = document.querySelector('.third-row')

nameField.addEventListener('change', checkField)

const countryField = document.querySelector('#country')
countryField.addEventListener('change', checkEmptyField)

const cityField = document.querySelector('#city')
cityField.addEventListener('change', checkEmptyField)

function checkField(event) {
    const block = event.target.closest('div')
    const errorText = block.querySelector('.error-text')
    if(event.target.value.indexOf(' ') >= 0) {
        if(!errorText) {
            block.insertAdjacentHTML('beforeend', '<p class="error-text">Error text</p>')
        }
        event.target.classList.remove('well-done')
        event.target.classList.add('error')

    } else {
        if(errorText) {
            errorText.remove()
        }
        event.target.classList.add('well-done')
        event.target.classList.remove('error')
        
        if(nameField.classList.contains('well-done') && selectField.querySelector('.select__input').classList.contains('well-done')) {
            secondRow.style.display = 'flex'
        }
    }
}

function checkEmptyField(event) {
    const block = event.target.closest('div')
    const errorText = block.querySelector('.error-text')
    if(event.target.value.trim().length <= 0) {
        if(!errorText) {
            block.insertAdjacentHTML('beforeend', '<p class="error-text">Error text</p>')
        }
        event.target.classList.remove('well-done')
        event.target.classList.add('error')

    } else {
        if(errorText) {
            errorText.remove()
        }
        event.target.classList.add('well-done')
        event.target.classList.remove('error')

        if(countryField.classList.contains('well-done') && cityField.classList.contains('well-done') && date.classList.contains('well-done')) {
            thirdRow.style.display = 'flex'
        }
    }
}

const submit = document.querySelector('.submit')
submit.addEventListener('click', () => {
    const completed = document.querySelector('.completed')
    completed.style.display = 'flex'
    submit.disabled = true
})