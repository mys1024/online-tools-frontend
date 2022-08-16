<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <TitledLayout
    :title="t('title.not_found')"
    w="md:7/10 lg:3/5"
  >
    <div text-2xl>
      🥲
    </div>
  </TitledLayout>
</template>
