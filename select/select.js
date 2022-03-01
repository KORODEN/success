const getTemplate = (data = [], placeholder) => {
    let text = placeholder ?? 'Placeholder по умолчанию'
  
    const items = data.map(item => {
      return `
        <li class="select__item" data-type="item" data-id="${item.id}">${item.value}</li>
      `
    })
  
    return `
      <div class="select__backdrop" data-type="backdrop"></div>
      <div class="select__input" data-type="input">
        <span data-type="value">${text}</span>
        <img src="assets/images/arrow.png" data-type="arrow">
      </div>
      <div class="select__dropdown">
        <ul class="select__list">
          ${items.join('')}
        </ul>
      </div>
    `
  }

class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId
    
        this.#render()
        this.#setup()
    }
    
    #render() {
        const {placeholder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder)
    }
    
    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$value = this.$el.querySelector('[data-type="value"]')
        this.$input = this.$el.querySelector('[data-type="input"]')
        this.$dropdown = this.$el.querySelector('.select__dropdown')
        this.$backdrop = this.$el.querySelector('[data-type="backdrop"]')
    }
    
    clickHandler(event) {
        const {type} = event.target.dataset
    
        if (type === 'input' || type === 'value' || type === 'arrow') {
            this.toggle()
        } else if (type === 'item') {
            const id = event.target.dataset.id
            this.select(id)
            
            const nameField = document.querySelector('#name')
            const secondRow = document.querySelector('.second-row')
            if(nameField.classList.contains('well-done')) {
                secondRow.style.display = 'flex'
            }

        } else if (type === 'backdrop' && !this.selectedId) {
            const errorText = this.$input.querySelector('.error-text')
            if(!errorText) {
                this.$input.insertAdjacentHTML('beforeend', '<p class="error-text">Error text</p>')
            }
            this.$input.classList.toggle('error2')
            this.close()
        } else if (type === 'backdrop') {
            this.close()
        }
    }
    
    get isOpen() {
        return this.$dropdown.classList.contains('open-dropdown')
    }
    
    get current() {
        return this.options.data.find(item => item.id === this.selectedId)
    }

    isSelect() {
        if(this.selectedId) {
            return true
        } else {
            return false
        }
    }
    
    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
    
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
    
        this.options.onSelect ? this.options.onSelect(this.current) : null
        this.$input.classList.add('well-done')
        this.close()
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open()
    }
    
    open() {
        this.$dropdown.classList.add('open-dropdown')
        this.$backdrop.classList.add('open-backdrop')
        this.$input.classList.remove('error2')

        const errorText = this.$input.querySelector('.error-text')
        if(errorText) {
            errorText.remove()
        }
    }
    
    close() {
        this.$dropdown.classList.remove('open-dropdown')
        this.$backdrop.classList.remove('open-backdrop')
    }
    
    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }
}