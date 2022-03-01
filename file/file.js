function bytesToSize(bytes) {
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb']
    if (!bytes) {
        return '0 byte'
    } 
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

function upload(selector, options = {}) {
    let files = []
    const input = document.querySelector(selector)
    const preview = document.createElement('div')

    preview.classList.add('preview')

    const open = document.querySelector(options.triggerBtn)

    if(options.multi) {
        input.setAttribute('multiple', true)
    }

    if(options.accept && Array.isArray(options.accept)) {
        input.setAttribute('accept', options.accept.join(','))
    }

    input.insertAdjacentElement('afterend', preview)

    const triggerInput = (e) => {
        e.preventDefault()
        input.click()
    }

    const changeHandler = event => {
        if(!event.target.files.length || event.target.files.length > 2) {
            return
        }

        files = Array.from(event.target.files)

        files.forEach(file => {
            // if(!file.type.match('image')) {
            //     return
            // }

            const reader = new FileReader()

            reader.onload = ev => {
                const src = ev.target.result
                preview.insertAdjacentHTML('afterbegin', `
                <div class="preview-image">
                    <div class="preview-info">
                        ${(!file.type.match('pdf')) ? `<div class="file-image" style="background-image: url(${src});"></div>`:''}
                        <div class="file-info">
                            <span class="file-name">${(file.name.split('.')[0].length < 16) ? file.name.split('.')[0] : file.name.split('.')[0].substr(0, 15) + '...'}</span>
                            <div class="file-data">${file.name.split('.')[1].toUpperCase()} ${bytesToSize(file.size)}</div>
                        </div> 
                    </div>
                    <div class="preview-remove" data-name="${file.name}"></div>
                </div>
                `)

                const submit = document.querySelector('.submit')
                submit.disabled = false
            }

            reader.readAsDataURL(file)
        })
    }

    const removeHandler = (event) => {
        if(!event.target.dataset.name) {
            return
        }

        const {name} = event.target.dataset
        files = files.filter(file => file.name !== name)

        const block = preview.querySelector(`[data-name="${name}"]`).closest('.preview-image')

        block.classList.add('removing')
        setTimeout(() => {
            block.remove()
        }, 150)
    }

    open.addEventListener('click', triggerInput)
    input.addEventListener('change', changeHandler)
    preview.addEventListener('click', removeHandler)
}