<script setup lang="ts">
import type { DigestAlg } from '~/types'
import { digest } from '~/utils/digest'
import { hex } from '~/utils/enc'

const { t } = useI18n()

const inputString = ref('')
const inputFileName = ref('')
const inputArrayBuffer = ref<ArrayBuffer>(new Uint8Array())
const inputType = ref<'String' | 'File'>('String')
const digestAlg = ref<DigestAlg>('MD5')
const output = asyncComputed(async () => {
  const data = inputType.value === 'String' ? inputString.value : inputArrayBuffer.value
  return hex(await digest(digestAlg.value, data))
})

async function onFileSelect(fileList: FileList | null) {
  const file = fileList?.item(0)
  if (!file)
    return
  inputFileName.value = file.name
  inputArrayBuffer.value = await file.arrayBuffer()
}
</script>

<template>
  <TitledLayout
    :title="t('title.digest')"
    w="md:7/10 lg:3/5"
  >
    <div space-y-10>
      <!-- input -->
      <div space-y-4>
        <h2 text-xl>
          {{ t('intro.input') }}
        </h2>
        <div space-x-2>
          <select
            v-model="digestAlg"
            :title="t('intro.digest_alg')"
            name="digestAlg"
            w-32
            input-select
          >
            <option value="MD5">
              MD5
            </option>
            <option value="SHA1">
              SHA1
            </option>
            <option value="SHA256">
              SHA256
            </option>
            <option value="SHA512">
              SHA512
            </option>
            <option value="BLAKE3">
              BLAKE3
            </option>
            <option value="SM3">
              SM3
            </option>
          </select>
          <select
            v-model="inputType"
            :title="t('intro.input_type')"
            name="inputType"
            w-32
            input-select
          >
            <option value="String">
              {{ t('intro.string') }}
            </option>
            <option value="File">
              {{ t('intro.file') }}
            </option>
          </select>
        </div>
        <div>
          <textarea
            v-if="inputType === 'String'"
            v-model="inputString"
            type="text"
            name="input"
            autocomplete="false"
            :placeholder="t('intro.string')"
            w-full h-20vh
            textarea
          />
          <div v-if="inputType === 'File'">
            <FileSelector
              :on-select="onFileSelect"
            />
            <div>
              {{ inputFileName }}
            </div>
          </div>
        </div>
      </div>
      <!-- output -->
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.output') }}
        </h2>
        <textarea
          :value="output"
          type="text"
          name="output"
          autocomplete="false"
          :placeholder="t('intro.output')"
          w-full h-32
          textarea font-mono
          disabled cursor-text
        />
      </div>
    </div>
  </TitledLayout>
</template>
