<script setup lang="ts">
import TOML from '@ltd/j-toml'

const { t } = useI18n()

const tomlStr = ref('')
const jsonStr = ref('')
const activeTextarea = ref<'toml' | 'json'>('toml')

function onTomlStrUpdate() {
  if (tomlStr.value === '') {
    jsonStr.value = ''
    return
  }
  try {
    const obj = TOML.parse(tomlStr.value, { bigint: false })
    if (typeof obj !== 'object')
      throw new Error('TOML.parse() did not return an object')
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
    tomlStr.value = ''
    return
  }
  try {
    const obj = JSON.parse(jsonStr.value)
    if (typeof obj !== 'object')
      throw new Error('JSON.parse() did not return an object')
    // @ts-expect-error Wrong return type of TOML.stringify(). This may be a bug.
    tomlStr.value = TOML.stringify(obj, { indent: 2 }).join('\n')
  }
  catch (err) {
    if (!(err instanceof Error))
      throw err
    tomlStr.value = `${err.name}: ${err.message}`
  }
}

watchEffect(() => {
  switch (activeTextarea.value) {
    case 'toml':
      onTomlStrUpdate()
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
    :title="t('title.toml_to_json')"
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
        v-model="tomlStr"
        type="text"
        autocomplete="off"
        placeholder="TOML"
        w="full md:1/2" h="1/2 md:full"
        resize-none
        font-mono
        textarea
        @keydown.prevent.tab="tab"
        @focus="activeTextarea = 'toml'"
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
