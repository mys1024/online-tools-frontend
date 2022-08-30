export function hex(data: Uint8Array, uppercase = true) {
  const digits = uppercase ? '0123456789ABCDEF' : '0123456789abcdef'
  let str = ''
  for (const byte of data) {
    const low4 = (byte & 0b11110000) >> 4
    const high4 = byte & 0b1111
    str += digits[low4] + digits[high4]
  }
  return str
}

export function ignoreError<T>(func: () => T): T | undefined {
  try {
    return func()
  } catch (err) {
    return
  }
}
