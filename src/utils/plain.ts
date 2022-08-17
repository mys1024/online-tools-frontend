export function hex(buffer: ArrayBuffer) {
  const digits = '0123456789ABCDEF'
  let str = ''
  for (const byte of new Uint8Array(buffer)) {
    const low4 = (byte & 0b11110000) >> 4
    const high4 = byte & 0b1111
    str += digits[low4] + digits[high4]
  }
  return str
}
