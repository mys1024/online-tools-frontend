<script setup lang="ts">
import { getText, postText, deleteText } from './api'
const { t } = useI18n()

const accessCode = ref('')
const textContent = ref('')

const saveBtnHandler = async() => {
  const { res, jsonPromise } = await postText(textContent.value)
  const payload = await jsonPromise
  if (!res.ok) {
    alert('Failed to save 😢')
    console.error('Failed to save 😢', res)
    return
  }
  accessCode.value = payload.accessCode
  textContent.value = ''
}

const accessBtnHandler = async() => {
  const { res, jsonPromise } = await getText(accessCode.value)
  const payload = await jsonPromise
  if (!res.ok) {
    alert('Failed to access 😢')
    console.error('Failed to access 😢', res)
    return
  }
  textContent.value = payload.text
  accessCode.value = ''
}

const deleteBtnHandler = async() => {
  const { res } = await deleteText(accessCode.value)
  if (!res.ok) {
    alert('Failed to delete 😢')
    console.error('Failed to delete 😢', res)
    return
  }
  accessCode.value = ''
  textContent.value = ''
}
</script>

<template>
  <div>
    <Box :title="t('tools.clipboard.title')">
      <div>
        <input
          v-model="accessCode"
          :placeholder="t('tools.clipboard.accessCode')"
          :aria-label="t('tools.clipboard.accessCode')"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="150px"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        />
        <label class="hidden" for="input">{{ t('tools.clipboard.accessCode') }}</label>
      </div>
      <div class="mt-4">
        <textarea
          v-model="textContent"
          :placeholder="t('tools.clipboard.textContent')"
          :aria-label="t('tools.clipboard.textContent')"
          type="text"
          autocomplete="false"
          p="x-4 y-2"
          w="full"
          h="250px"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        />
        <label class="hidden" for="input">{{ t('tools.clipboard.textContent') }}</label>
      </div>
      <div class="mt-4">
        <button
          :disabled="textContent === ''"
          class="m-3 text-sm btn"
          @click="saveBtnHandler"
        >
          {{ t('tools.clipboard.save') }}
        </button>
        <button
          :disabled="accessCode === ''"
          class="m-3 text-sm btn"
          @click="accessBtnHandler"
        >
          {{ t('tools.clipboard.access') }}
        </button>
        <button
          :disabled="accessCode === ''"
          class="m-3 text-sm btn"
          @click="deleteBtnHandler"
        >
          {{ t('tools.clipboard.delete') }}
        </button>
      </div>
      <div class="mt-24 space-y-12">
        <Box
          :title="t('tools.clipboard.save')"
          :title-level="3"
          :disabled-padding="true"
        >
          {{ t('tools.clipboard.saveDesc') }}
        </Box>
        <Box
          :title="t('tools.clipboard.access')"
          :title-level="3"
          :disabled-padding="true"
        >
          {{ t('tools.clipboard.accessDesc') }}
        </Box>
        <Box
          :title="t('tools.clipboard.delete')"
          :title-level="3"
          :disabled-padding="true"
        >
          {{ t('tools.clipboard.deleteDesc') }}
        </Box>
        <Box
          :title="t('tools.clipboard.limit')"
          :title-level="3"
          :disabled-padding="true"
        >
          {{ t('tools.clipboard.limitDesc') }}
        </Box>
      </div>
    </Box>
  </div>
</template>
