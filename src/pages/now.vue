<script setup lang="ts">
const { t } = useI18n()

const date = ref(new Date())
const localString = computed(() => date.value.toLocaleString())
const timestampString = computed(() => Math.floor(date.value.getTime() / 1000).toString())
const isoString = computed(() => date.value.toISOString())
setInterval(() => date.value = new Date(), 17)

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    alert(`${t('intro.copied')}: ${text}`)
  }
  catch (err) {
    console.error(err)
    alert(err)
  }
}
</script>

<template>
  <TitledLayout
    :title="t('title.now')"
    w="md:7/10 lg:3/5"
  >
    <div space-y-10>
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.local') }}
        </h2>
        <div
          btn-text font-mono block
          @click="copy(localString)"
        >
          {{ localString }}
        </div>
      </div>
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.unix_timestamp') }}
        </h2>
        <div
          btn-text font-mono block
          @click="copy(timestampString)"
        >
          {{ timestampString }}
        </div>
      </div>
      <div space-y-2>
        <h2 text-xl>
          ISO 8601
        </h2>
        <div
          btn-text font-mono block
          @click="copy(isoString)"
        >
          {{ isoString }}
        </div>
      </div>
    </div>
  </TitledLayout>
</template>
