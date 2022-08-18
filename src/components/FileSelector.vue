<script lang="ts" setup>
const props = defineProps<{
  onSelect: (fileList: FileList | null) => unknown
}>()

const { t } = useI18n()
const fileInputEl = ref<HTMLInputElement>()

function onSelectBtnClick() {
  fileInputEl.value?.click()
}

function onFileInputElChange(event: Event) {
  const target = event.target as HTMLInputElement
  props.onSelect(target.files)
}
</script>

<template>
  <div>
    <button
      btn
      @click="onSelectBtnClick"
    >
      {{ t('intro.select_a_file') }}
    </button>
    <input
      ref="fileInputEl"
      type="file"
      name="files"
      w-0
      h-0
      @change="onFileInputElChange"
    >
  </div>
</template>
