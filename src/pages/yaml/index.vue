<script setup lang="ts">
import jsYaml from 'js-yaml'
import { ref } from 'vue'
const { t } = useI18n()

const yaml = ref('')
const json = ref('')
watch(yaml, () => {
  if (!yaml.value)
    json.value = ''
  try {
    const obj = jsYaml.load(yaml.value)
    if (obj instanceof Object)
      json.value = JSON.stringify(obj, undefined, 2)
  }
  catch (err) {
    if (err instanceof Error)
      json.value = `${err.name}: ${err.message}`
    else
      throw err
  }
})

const tab = (event: KeyboardEvent) => {
  const textarea: HTMLTextAreaElement = event.target as HTMLTextAreaElement
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const before = textarea.value.slice(0, start)
  const after = textarea.value.slice(end)
  textarea.value = `${before}  ${after}`
  textarea.selectionStart = start + 2
  textarea.selectionEnd = start + 2
}
</script>

<template>
  <Box :title="t('tools.yamlToJson.title')">
    <div class="space-y-16">
      <Box title="YAML" :title-level="3" :disabled-padding="true">
        <textarea
          v-model="yaml"
          class="whitespace-pre"
          :placeholder="t('tools.yamlToJson.hint')"
          type="text"
          font="mono"
          autocomplete="off"
          p="x-4 y-2"
          h="64"
          w="full"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          @keydown.prevent.tab="tab"
        />
      </Box>
      <Box title="JSON" :title-level="3" :disabled-padding="true">
        <textarea
          :value="json"
          class="whitespace-pre"
          type="text"
          font="mono"
          autocomplete="off"
          p="x-4 y-2"
          h="64"
          w="full"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
          disabled="true"
          cursor="text"
        />
      </Box>
    </div>
  </Box>
</template>
