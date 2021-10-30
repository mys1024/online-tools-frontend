<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <div>
    <div>
      <p class="text-4xl">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <div>
      {{ t('not-found') }}
    </div>
    <div>
      <button
        class="btn m-3 text-sm mt-8"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
