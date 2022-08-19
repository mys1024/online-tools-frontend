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

export function base64(data: Uint8Array): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let s = ''
  let tmp = 0
  for (let i = 0; i < data.length; i++) {
    switch (i % 3) {
      case 0:
        s += chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        s += chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        s += chars[tmp | ((data[i] & 0b11000000) >> 6)]
        s += chars[(data[i] & 0b00111111)]
        tmp = 0
    }
  }
  switch (data.length % 3) {
    case 1:
      s += chars[tmp]
      s += '=='
      break
    case 2:
      s += chars[tmp]
      s += '='
  }
  return s
}

export function base64url(data: Uint8Array, padding = false): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let s = ''
  let tmp = 0
  for (let i = 0; i < data.length; i++) {
    switch (i % 3) {
      case 0:
        s += chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        s += chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        s += chars[tmp | ((data[i] & 0b11000000) >> 6)]
        s += chars[(data[i] & 0b00111111)]
        tmp = 0
    }
  }
  switch (data.length % 3) {
    case 1:
      s += chars[tmp]
      if (padding)
        s += '=='
      break
    case 2:
      s += chars[tmp]
      if (padding)
        s += '='
  }
  return s
}
