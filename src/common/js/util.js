function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice(0)
  for (let i = 0; i < _arr.length; i++) {
    let j = randomNum(0, i)
    let k = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = k
  }
  return _arr
}

export function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
