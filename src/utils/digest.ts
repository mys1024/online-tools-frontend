import {
  createBLAKE3,
  createMD5,
  createSHA1,
  createSHA256,
  createSHA512,
  createSM3,
} from 'hash-wasm'
import type { DigestAlg } from '~/types'

const encoder = new TextEncoder()

const hasherMap = {
  MD5: await createMD5(),
  SHA1: await createSHA1(),
  SHA256: await createSHA256(),
  SHA512: await createSHA512(),
  BLAKE3: await createBLAKE3(),
  SM3: await createSM3(),
}

export function digest(alg: DigestAlg, data: string | ArrayBuffer) {
  const buffer = typeof data === 'string' ? encoder.encode(data) : new Uint8Array(data)
  const hasher = hasherMap[alg]
  return hasher.init().update(buffer).digest('binary')
}
