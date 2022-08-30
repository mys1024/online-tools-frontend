<script setup lang="ts">
import { Base64 } from 'base64-esm'
import { ignoreError } from '~/utils/plain'

const { t } = useI18n()

const normalStrOrUint8arrStr = ref('')
const dataFile = ref<ArrayBuffer>(new ArrayBuffer(0))
const dataFileName = ref('')
const dataType = ref<'String' | 'Uint8Array' | 'File'>('String')
const base64 = computed(() => {
  return dataType.value === 'String'
    ? Base64.encode(normalStrOrUint8arrStr.value)
    : dataType.value === 'Uint8Array'
    ? Base64.encode(new Uint8Array(ignoreError(() => JSON.parse(normalStrOrUint8arrStr.value))))
    : Base64.encode(new Uint8Array(dataFile.value))
})

async function onFileSelect(fileList: FileList | null) {
  const file = fileList?.item(0)
  if (!file)
    return
  dataFileName.value = file.name
  dataFile.value = await file.arrayBuffer()
}
</script>

<template>
  <TitledLayout
    :title="t('title.base64')"
    w="md:7/10 lg:3/5"
  >
    <div space-y-10>
      <!-- data -->
      <div space-y-4>
        <h2 text-xl>
          {{ t('intro.data') }}
        </h2>
        <div space-x-2>
          <select
            v-model="dataType"
            :title="t('intro.data_type')"
            name="dataType"
            w-32
            input-select
          >
            <option value="String">
              {{ t('intro.string') }}
            </option>
            <option value="Uint8Array">
              {{ t('intro.uint8arr') }}
            </option>
            <option value="File">
              {{ t('intro.file') }}
            </option>
          </select>
        </div>
        <div>
          <textarea
            v-if="['String', 'Uint8Array'].includes(dataType)"
            v-model="normalStrOrUint8arrStr"
            type="text"
            name="data"
            autocomplete="false"
            :placeholder="dataType === 'String' ? t('intro.string') : t('intro.uint8arr_with_eg')"
            w-full h-20vh
            textarea
          />
          <div v-if="dataType === 'File'">
            <FileSelector
              :on-select="onFileSelect"
            />
            <div>
              {{ dataFileName }}
            </div>
          </div>
        </div>
      </div>
      <!-- base64 -->
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.base64') }}
        </h2>
        <textarea
          :value="base64"
          type="text"
          name="base64"
          autocomplete="false"
          :placeholder="t('intro.base64')"
          w-full h-32
          textarea font-mono
          disabled cursor-text
        />
      </div>
    </div>
  </TitledLayout>
</template>
  