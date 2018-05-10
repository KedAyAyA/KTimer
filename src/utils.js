export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPrimitive (data) {
  return typeof data === 'number' 
          || typeof data === 'string' 
          || typeof data === 'boolean'
}

export function cloneOptionsData (data) {
  if (isObject(data)) {
    return JSON.parse(JSON.stringify(data))
  }

  if (isPrimitive(data)) {
    return data
  }

  return 0
}