<script setup lang="ts">
const { locale } = useI18n()
const localeStorage = useStorage('locale', locale.value)
syncRef(localeStorage, locale)

// https://github.com/vueuse/head
useHead({
  title: 'Online Tools',
  meta: [
    { name: 'description', content: 'Provide some online tools.' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#101618' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: computed(() => preferredDark.value ? '/favicon-dark.ico' : '/favicon.ico'),
    },
  ],
  htmlAttrs: { lang: locale },
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
