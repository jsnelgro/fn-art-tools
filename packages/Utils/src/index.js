import * as Vector from './vector.js'

export const PI2 = 2.0 * Math.PI
export const HALF_PI = Math.PI * 0.5
export const DEG2RAD = Math.PI / 180.0
export const RAD2DEG = 180.0 / Math.PI
export const EPS = 10e-6

export const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
}

/*
 * Lineary interpolates between a->b, using n as a weight
 */
export const mix = (n, a, b) => a * (1 - n) + b * n

/*
 * Linearly maps n from a->b to x->y
 * note: should probably handle divide by 0 error when it gets 0/0
 */
export const line = (n, a, b, x, y) => x + (n - a) * (y - x) / ((b - a) + Number.MIN_VALUE)

/*
 * Linearly maps n from a->b to 0-1
 */
export const normalize = (n, a, b) => line(n, a, b, 0, 1)

/*
 * Clamp n within range a->b
 */
export const clamp = (n, a, b) => ((n < a) ? a : ((n > b) ? b : n))

/*
 * Returns a pseudo-random floating point number within the range a->b, if b is not supplied it
 * returns within the range 0-a
*/
export const random = (a, b) => ((b === undefined) ? Math.random() * a : Math.random() * (b - a) + a)

export const randomRange = (n) => range(n).map(Math.random)

// export default {
//     mix, map, normalize, clamp, random,
//     PI2, HALF_PI, DEG2RAD, RAD2DEG, EPS }

// b/c js modulo is dumb with negative numbers
export function mod(n, m) {
  return ((n % m) + m) % m
}

// returns a tuple of the form (n // m, n % m)
export function divmod(n, m) {
  return [~~(n / m), mod(n, m)]
}

export function throttle (every) {
  let count = 0
  return (fn) => {
    if (count === 0) { fn() }
    count = mod(count + 1, every)
  }
}

export const isNumber = (n) => n === +n

export const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const randChoice = (...args) => {
  return args[~~(Math.random() * args.length)]
}

export const randHex = (...args) => {
  return '#' + [...Array(3).keys()]
    .map(i => args[i] ||
      ((~~(Math.random() * 16)).toString(16) + (~~(Math.random() * 16)).toString(16))).join('')
}

export const randHsla = (...args) => {
  let h = isNumber(args[0]) ? args[0] : random(360)
  let s = isNumber(args[1]) ? args[1] : random(100)
  let l = isNumber(args[2]) ? args[2] : random(100)
  let a = isNumber(args[3]) ? args[3] : 1
  return `hsla(${h}, ${s}%, ${l}%, ${a})`
}

export const randHsl = randHsla
export const randHSL = randHsla
export const randHSLA = randHsla

export const addV = (v1, v2) => {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}

export const clampVec = (vec, lovec, hivec) => {
  lovec = lovec === +lovec ? [lovec, lovec]: lovec
  hivec = hivec === +hivec ? [hivec, hivec]: hivec
  return [clamp(vec[0], lovec[0], hivec[0]), clamp(vec[1], lovec[1], hivec[1])]
}

export const multV = (v1, v2) => {
  v2 = v2 == +v2 ? [v2, v2] : v2
  v1 = v1 == +v1 ? [v1, v1] : v1
  return [v1[0] * v2[0], v1[1] * v2[1]]
}

export const wrap = (minW, maxW, minH, maxH, vec) => {
  if (Array.isArray(minH)) {
    // minW == maxW, maxW == maxH, minH == vec
    return [mod(minH[0] + minW, minW), mod(minH[1] + maxW, maxW)]
  }
  else {
    return [
      vec[0] < minW ? maxW : vec[0] > maxW ? minW : vec[0],
      vec[1] < minH ? maxH : vec[1] > maxH ? minH : vec[1]
    ]
  }
}

export const range = (n) => {
  return [...Array(n).keys()]
}

export const oscillate = (val, min, max, cycleLength = 2) => {
  const range = (max - min) / 2
  return ((Math.sin(val / cycleLength) * range) + range) + min
}

// fixed ratio
export const fixedRatio = (ratio, fn) => {
  let i = 0
  return (...args) => {
    i += 1
    if (i === ratio) {
      i = 0
      return fn(...args)
    }
  }
}

// variable ratio
export const variableRatio = (chance, fn) => {
  return (...args) => Math.random() <= chance ? fn(...args) : undefined
}

// fixed interval (in ms)
export const fixedInterval = (interval, fn) => {
  let completed = true
  return (...args) => {
    if (completed) {
      completed = false
      timer = setTimeout(_ => { completed = true }, interval)
      return fn(...args) 
    }
  }
}

// variable interval and variance in ms
export const variableInterval = (interval, variance, fn) => {
  let completed = true
  return (...args) => {
    if (completed) {
      completed = false
      let newInterval = interval + random(-variance, variance)
      let timer = setTimeout(_ => { completed = true }, newInterval)
      return fn(...args)
    }
  }
}

export default { Vector }