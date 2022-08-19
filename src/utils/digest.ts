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
  MD5: createMD5(),
  SHA1: createSHA1(),
  SHA256: createSHA256(),
  SHA512: createSHA512(),
  BLAKE3: createBLAKE3(),
  SM3: createSM3(),
}

export async function digest(alg: DigestAlg, data: string | ArrayBuffer) {
  const buffer = typeof data === 'string' ? encoder.encode(data) : new Uint8Array(data)
  const hasher = await hasherMap[alg]
  return hasher.init().update(buffer).digest('binary')
}
