<script setup lang="ts">
const { t } = useI18n()

const name = ref('')
const go = () => {
  if (name.value)
    alert(t('tools.hello.hello', { name: name.value }))
}
</script>

<template>
  <div>
    <Box :title="t('tools.hello.title')">
      <input
        v-model="name"
        :placeholder="t('tools.hello.whats-your-name')"
        :aria-label="t('tools.hello.whats-your-name')"
        type="text"
        autocomplete="false"
        p="x-4 y-2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.enter="go"
      >
      <label class="hidden" for="input">{{ t('tools.hello.whats-your-name') }}</label>

      <div>
        <button
          class="m-3 text-sm btn"
          :disabled="!name"
          @click="go"
        >
          {{ t('button.go') }}
        </button>
      </div>
    </Box>
  </div>
</template>
