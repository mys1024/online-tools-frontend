<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

const langHintAvailability = ref(0)
function triggerLangHintAvailability() {
  langHintAvailability.value++
  setTimeout(() => langHintAvailability.value--, 5000)
}

function toggleLocales() {
  const locales = availableLocales
  const index = (locales.indexOf(locale.value) + 1) % locales.length
  locale.value = locales[index] as string
  triggerLangHintAvailability()
}
</script>

<template>
  <footer space-y-2>
    <nav space-x-4 flex justify-center text-xl>
      <!-- buttons -->
      <router-link
        to="/"
        :title="t('button.home')"
        btn-icon i-carbon-campsite
      />
      <button
        :title="t('button.toggle_langs')"
        btn-icon i-carbon-language
        @click="toggleLocales"
      />
      <button
        :title="t('button.toggle_dark')"
        btn-icon i="carbon-sun dark:carbon-moon"
        @click="toggleDark()"
      />
      <a
        title="GitHub"
        btn-icon i-carbon-logo-github
        href="https://github.com/mys1024/online-tools-frontend" rel="noreferrer" target="_blank"
      />
    </nav>
    <!-- language hint -->
    <div
      text-xs text-color-fade
      transition-opacity duration-200
      :class="{
        'opacity-75': langHintAvailability > 0,
        'opacity-0': langHintAvailability === 0,
      }"
    >
      [{{ t(`intro.${locale}`) }}]
    </div>
  </footer>
</template>
