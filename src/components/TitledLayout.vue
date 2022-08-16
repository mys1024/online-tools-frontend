<script lang="ts" setup>
const props = defineProps<{
  title?: string
}>()
</script>

<template>
  <div
    p="x-4 b-12 t-12 md:t-16"
    mx-auto
    text-color-plain
    text-center
  >
    <!-- title -->
    <h1 v-if="title" mb-12 text-4xl font-bold>
      {{ props.title }}
    </h1>
    <template v-else>
      <div mb-12>
        <slot name="title" />
      </div>
    </template>
    <!-- content -->
    <main>
      <slot name="default" />
    </main>
    <!-- footer -->
    <Footer mt-24 />
  </div>
</template>
