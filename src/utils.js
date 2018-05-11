// @flow

export function isObject (obj: mixed): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isPrimitive (data: mixed): boolean {
  return typeof data === 'number' 
          || typeof data === 'string' 
          || typeof data === 'boolean'
}

export function cloneOptionsData (data: any): any {
  if (isObject(data)) {
    return JSON.parse(JSON.stringify(data))
  }

  if (isPrimitive(data)) {
    return data
  }

  return 0
}