import type { Merge } from '../types/global'

function isObject<TValue>(value: TValue): value is Record<PropertyKey, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function merge<TObjects extends Array<Record<PropertyKey, any> | undefined>>(
  ...objects: TObjects
): Merge<TObjects> {
  const merged = {} as Merge<TObjects>

  let index = 0
  let object: TObjects[number]
  for (index; index < objects.length; index++) {
    object = objects[index]

    if (object === undefined) continue

    for (const key in object) {
      const value = object[key]
      if (value !== undefined) {
        if (isObject(value) && isObject(merged[key])) {
          merged[key] = merge(merged[key] as object, value)
        } else if (Array.isArray(value) && Array.isArray(merged[key]) && value.length > 0) {
          merged[key] = (merged[key] as Array<unknown>).concat(value) as Merge<TObjects>[Extract<
            keyof TObjects[number],
            string
          >]
        } else {
          merged[key] = value
        }
      }
    }
  }

  return merged
}
