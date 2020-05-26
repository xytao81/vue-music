const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// 随机数组item替换
export const shuffle = (arr) => {
    let _arr = arr.slice() //数组副本
    for(let i = 0; i < _arr.length; i++){
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

// 截流
export const debounce = (func, delay) => {
    let timer
    return function(...args) {
        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout( ()=> {
            func.apply(this, args)
        },delay)
    }
}