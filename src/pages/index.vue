<script setup lang="ts">
const { t } = useI18n()

type ToolInfo = {
  title: () => string
  path: string
}

const tools: ToolInfo[] = [
  { title: () => t('tools.hello.title'), path: '/hello' },
  { title: () => t('tools.clipboard.title'), path: '/clipboard' },
  { title: () => t('tools.yamlToJson.title'), path: '/yaml' },
]
</script>

<template>
  <div>
    <Box :title="t('siteTitle')">
      <div class="space-y-3 text-xl">
        <div
          v-for="toolInfo of tools"
          :key="toolInfo.title()"
        >
          <router-link
            :to="toolInfo.path"
            class="text-btn underline"
          >
            {{ toolInfo.title() }}
          </router-link>
        </div>
      </div>
    </Box>
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
