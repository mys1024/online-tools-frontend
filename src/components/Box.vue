<script setup lang="ts">
const props = defineProps<{
  title?: string
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6
  disabledPadding?: boolean
}>()
</script>

<template>
  <div
    :class="{
      'p-4': [undefined, false].includes(props.disabledPadding),
      'space-y-10': [undefined, 1].includes(props.titleLevel),
      'space-y-7': props.titleLevel === 2,
      'space-y-5': props.titleLevel === 3,
      'space-y-3': props.titleLevel === 4,
      'space-y-2': props.titleLevel === 5,
      'space-y-1': props.titleLevel === 6,
    }"
  >
    <h1
      v-if="props.title"
      :class="{
        'text-5xl': [undefined, 1].includes(props.titleLevel),
        'text-4xl': props.titleLevel === 2,
        'text-3xl': props.titleLevel === 3,
        'text-2xl': props.titleLevel === 4,
        'text-xl': props.titleLevel === 5,
        'text-lg': props.titleLevel === 6,
      }"
    >
      {{ props.title }}
    </h1>
    <div>
      <slot />
    </div>
  </div>
</template>
