<script setup lang="ts">
import YAML from 'js-yaml'

const { t } = useI18n()

const yamlStr = ref('')
const jsonStr = ref('')
const activeTextarea = ref<'yaml' | 'json'>('yaml')

function onYamlStrUpdate() {
  if (yamlStr.value === '') {
    jsonStr.value = ''
    return
  }
  try {
    const obj = YAML.load(yamlStr.value)
    if (typeof obj !== 'object')
      throw new Error('YAML.load() did not return an object')
    jsonStr.value = JSON.stringify(obj, undefined, 2)
  }
  catch (err) {
    if (!(err instanceof Error))
      throw err
    jsonStr.value = `${err.name}: ${err.message}`
  }
}

function onJsonStrUpdate() {
  if (jsonStr.value === '') {
    yamlStr.value = ''
    return
  }
  try {
    const obj = JSON.parse(jsonStr.value)
    if (typeof obj !== 'object')
      throw new Error('JSON.parse() did not return an object')
    yamlStr.value = YAML.dump(obj)
  }
  catch (err) {
    if (!(err instanceof Error))
      throw err
    yamlStr.value = `${err.name}: ${err.message}`
  }
}

watchEffect(() => {
  switch (activeTextarea.value) {
    case 'yaml':
      onYamlStrUpdate()
      break
    case 'json':
      onJsonStrUpdate()
      break
    default:
      throw new Error(`unexpected active textarea: ${activeTextarea.value}`)
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
        w="full md:1/2" h="1/2 md:full"
        resize-none
        font-mono
        textarea
        @keydown.prevent.tab="tab"
        @focus="activeTextarea = 'yaml'"
      />
      <textarea
        v-model="jsonStr"
        type="text"
        autocomplete="off"
        placeholder="JSON"
        w="full md:1/2" h="1/2 md:full"
        resize-none
        font-mono
        textarea
        @keydown.prevent.tab="tab"
        @focus="activeTextarea = 'json'"
      />
    </div>
  </TitledLayout>
</template>
