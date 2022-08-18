import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type DigestAlg =
  'MD5' | 'SHA1' | 'SHA256' | 'SHA512' | 'BLAKE3' | 'SM3'
