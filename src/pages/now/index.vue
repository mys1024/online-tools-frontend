<script setup lang="ts">
const { t } = useI18n()

const date = ref(new Date())
const localString = computed(() => date.value.toLocaleString())
const isoString = computed(() => date.value.toISOString())
const timestamp = computed(() => (date.value.getTime() / 1000).toFixed(3))
setInterval(() => {
  date.value = new Date()
}, 17)

const copy = async(text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert(`Copied: ${text}`)
  }
  catch (err) {
    console.error(err)
    alert(err)
  }
}
</script>

<template>
  <Box :title="t('tools.now.title')">
    <div class="space-y-4">
      <Box :title-level="4" :title="t('tools.now.local')">
        <div
          class="cursor-pointer hover:text-blue-400 transition"
          @click="copy(localString)"
        >
          {{ localString }}
        </div>
      </Box>
      <Box :title-level="4" title="ISO 8601">
        <div
          class="cursor-pointer hover:text-blue-400 transition"
          @click="copy(isoString)"
        >
          {{ isoString }}
        </div>
      </Box>
      <Box :title-level="4" :title="t('tools.now.unixTimestamp')">
        <div
          class="cursor-pointer hover:text-blue-400 transition"
          @click="copy(timestamp)"
        >
          {{ timestamp }}
        </div>
      </Box>
    </div>
  </Box>
</template>
