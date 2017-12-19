export const Vector = (x, y, z = 0) => {
  return { x, y, z }
}

export const create = Vector

export const add = (...vecs) => {
  return vecs.reduce((acc, v) => {
    if (typeof v === 'number') {
      return Vector(acc.x + v, acc.y + v, acc.z + v)
    }
    return Vector(acc.x + v.x, acc.y + v.y, acc.z + v.z)
  }, Vector(0, 0, 0))
}

export const sub = (...vecs) => {
  return vecs.reduceRight((acc, v) => {
    if (typeof v === 'number') {
      return Vector(v - acc.x, v - acc.y, v - acc.z)
    }
    return Vector(v.x - acc.x, v.y - acc.y, v.z - acc.z)
  }, Vector(0, 0, 0))
}

export const mult = (...vecs) => {
  return vecs.reduce((acc, v) => {
    if (typeof v === 'number') {
      return Vector(acc.x * v, acc.y * v, acc.z * v)
    }
    return Vector(acc.x * v.x, acc.y * v.y, acc.z * v.z)
  }, Vector(1, 1, 1))
}

export const div = (...vecs) => {
  return vecs.reduceRight((acc, v) => {
    if (typeof v === 'number') {
      return Vector(v / acc.x, v / acc.y, v / acc.z || 0)
    }
    return Vector(v.x / acc.x, v.y / acc.y, v.z / acc.z || 0)
  }, Vector(1, 1, 1))
}

export const mag = vec => {
  return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z + vec.z)
}

export const norm = vec => {
  return mag(vec) > 0 ? div(vec, mag(vec)) : vec
}

export const centroid = (...vecs) => {
  return div(add(...vecs), vecs.length)
}

export const vec2Array = vec => {
  let res = [vec.x, vec.y]
  if (vec.z > 0) res.push(vec.z)
  return res
}
