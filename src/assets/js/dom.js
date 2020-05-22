export const addClass = (el, className) => {
    el.classList.add(className)
    // let newClass = el.className.split(' ')
    // newClass.push(className)
    // el.className = newClass.join('')
}

export const getData = (el, name, val) => {
    const prefix = 'data-'
    if (val) {
        return el.setAttribute(prefix + name, val)
    }
    return el.getAttribute(prefix + name)
}