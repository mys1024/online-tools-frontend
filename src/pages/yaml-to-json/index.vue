<script setup lang="ts">
import YAML from 'js-yaml'

const { t } = useI18n()

const yamlStr = ref('')
const jsonStr = ref('')
const activeTextarea = ref<'yaml' | 'json'>('yaml')

watchEffect(() => {
  if (activeTextarea.value === 'yaml') {
    if (yamlStr.value === '') {
      jsonStr.value = ''
      return
    }
    try {
      const obj = YAML.load(yamlStr.value)
      if (obj instanceof Object)
        jsonStr.value = JSON.stringify(obj, undefined, 2)
      else
        throw new Error('YAML.load() did not return an Object')
    }
    catch (err) {
      if (err instanceof Error)
        jsonStr.value = `${err.name}: ${err.message}`
      else
        throw err
    }
  }
  else {
    if (jsonStr.value === '') {
      yamlStr.value = ''
      return
    }
    try {
      const obj = JSON.parse(jsonStr.value)
      if (obj instanceof Object)
        yamlStr.value = YAML.dump(obj)
      else
        throw new Error('JSON.parse() did not return an Object')
    }
    catch (err) {
      if (err instanceof Error)
        yamlStr.value = `${err.name}: ${err.message}`
      else
        throw err
    }
  }
})

function tab(event: KeyboardEvent) {
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
  <TitledLayout
    :title="t('title.yaml_to_json')"
  >
    <div
      h="70vh"
      space-y-4
      md:space-y-0
      md:space-x-4
      flex
      flex-col
      md:flex-row
    >
      <textarea
        v-model="yamlStr"
        type="text"
        autocomplete="off"
        placeholder="YAML"
        w="full md:1/2"
        h="1/2 md:full"
        p="x-4 y-2"
        resize-none
        font-mono
        bg-transparent
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.prevent.tab="tab"
        @focus="activeTextarea = 'yaml'"
      />
      <textarea
        v-model="jsonStr"
        type="text"
        autocomplete="off"
        placeholder="JSON"
        w="full md:1/2"
        h="1/2 md:full"
        p="x-4 y-2"
        resize-none
        font-mono
        bg-transparent
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.prevent.tab="tab"
        @focus="activeTextarea = 'json'"
      />
    </div>
  </TitledLayout>
</template>
