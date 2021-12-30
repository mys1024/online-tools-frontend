<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <div>
    <nav class="text-xl mt-6">
      <router-link class="icon-btn mx-2" to="/" :title="t('button.home')">
        <carbon-home />
      </router-link>

      <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </button>

      <router-link class="icon-btn mx-2" to="/about" :title="t('button.about')">
        <carbon-dicom-overlay />
      </router-link>

      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/mys1024/online-tools-frontend" target="_blank" title="GitHub">
        <carbon-logo-github />
      </a>

      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
        <carbon-language />
      </a>
    </nav>
    <div class="mt-5 mx-auto text-center text-sm">
      <span class="opacity-40">© 2021 </span>
      <span class="opacity-40 transition-opacity duration-300 hover:opacity-70">
        <a href="https://github.com/mys1024">
          mys1024
        </a>
      </span>
    </div>
  </div>
</template>
