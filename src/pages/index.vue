<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <TitledLayout
    :title="t('title.online_tools')"
    w="md:7/10 lg:3/5"
  >
    <div space-y-5 text-2xl>
      <!-- <router-link
        to="/clipboard"
        btn-text block
      >
        {{ t('title.clipboard') }}
      </router-link> -->
      <router-link
        to="/yaml-to-json"
        btn-text block
      >
        {{ t('title.yaml_to_json') }}
      </router-link>
      <router-link
        to="/toml-to-json"
        btn-text block
      >
        {{ t('title.toml_to_json') }}
      </router-link>
      <router-link
        to="/now"
        btn-text block
      >
        {{ t('title.now') }}
      </router-link>
      <router-link
        to="/random"
        btn-text block
      >
        {{ t('title.random') }}
      </router-link>
      <router-link
        to="/digest"
        btn-text block
      >
        {{ t('title.digest') }}
      </router-link>
      <router-link
        to="/base64"
        btn-text block
      >
        {{ t('title.base64') }}
      </router-link>
    </div>
  </TitledLayout>
</template>
