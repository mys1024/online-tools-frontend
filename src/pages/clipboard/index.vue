<script lang="ts" setup>
import { deleteClipboardItem, getClipboardItem, postClipboardItem } from '~/api/clipboard'

const { t } = useI18n()

const accessKey = ref('')
const text = ref('')

function failureHandler(message: string, reason: unknown) {
  alert(message)
  console.error(`${message}:`, reason)
}

async function onSaveBtnClick() {
  let res
  try {
    res = await postClipboardItem(text.value)
  }
  catch (err) {
    failureHandler('Failed to save 😢', err)
    return
  }
  if (!res?.ok) {
    failureHandler('Failed to save 😢', res)
    return
  }
  accessKey.value = (await res.json()).key
  text.value = ''
}

async function onAccessBtnClick() {
  let res
  try {
    res = await getClipboardItem(text.value)
  }
  catch (err) {
    failureHandler('Failed to access 😢', err)
    return
  }
  if (!res?.ok) {
    failureHandler('Failed to access 😢', res)
    return
  }
  text.value = (await res.json()).text
  accessKey.value = ''
}

async function onDeleteBtnClick() {
  let res
  try {
    res = await deleteClipboardItem(text.value)
  }
  catch (err) {
    failureHandler('Failed to delete 😢', err)
    return
  }
  if (!res?.ok) {
    failureHandler('Failed to delete 😢', res)
    return
  }
  accessKey.value = ''
  text.value = ''
}
</script>

<template>
  <TitledLayout
    :title="t('title.clipboard')"
    w="md:7/10 lg:3/5"
  >
    <div>
      <div>
        <!-- input for `access key` -->
        <input
          v-model="accessKey"
          :placeholder="t('intro.access_key')"
          :aria-label="t('intro.access_key')"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="150px"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        >
        <label class="hidden" for="input">{{ t('intro.access_key') }}</label>
      </div>
      <!-- textarea for `text` -->
      <div class="mt-4">
        <textarea
          v-model="text"
          :placeholder="`${t('intro.text')} ${t('intro.expire')}`"
          :aria-label="t('intro.text')"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="full"
          h="50vh"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        />
        <label class="hidden" for="input">{{ t('intro.text') }}</label>
      </div>
      <!-- buttons -->
      <div class="mt-4">
        <button
          :disabled="text === ''"
          class="m-3 text-sm btn"
          @click="onSaveBtnClick"
        >
          {{ t('button.save') }}
        </button>
        <button
          :disabled="accessKey === ''"
          class="m-3 text-sm btn"
          @click="onAccessBtnClick"
        >
          {{ t('button.access') }}
        </button>
        <button
          :disabled="accessKey === ''"
          class="m-3 text-sm btn"
          @click="onDeleteBtnClick"
        >
          {{ t('button.delete') }}
        </button>
      </div>
    </div>
  </TitledLayout>
</template>
