<script setup lang="ts">
import { base64, base64url, hex } from '~/utils/enc'

const { t } = useI18n()

const minFloat = ref(0)
const maxFloat = ref(1)
const randomFloat = ref(generateRandomFloat(0, 1))

const minInteger = ref(0)
const maxInteger = ref(10)
const randomInteger = ref(generateRandomInteger(0, 10))

const length = ref(2)
const randomUint8Array = ref(generateRandomUint8Array(2))
const representation = ref<'Hex' | 'Base64' | 'Base64URL' | 'Uint8Array'>('Hex')
const randomUint8ArrayStr = computed(() => {
  switch (representation.value) {
    case 'Hex':
      return hex(randomUint8Array.value)
    case 'Base64':
      return base64(randomUint8Array.value)
    case 'Base64URL':
      return base64url(randomUint8Array.value)
    case 'Uint8Array':
      return `[${randomUint8Array.value}]`
  }
})

function generateRandomInteger(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(min + Math.random() * (max - min + 1))
}

function generateRandomFloat(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function generateRandomUint8Array(length: number): Uint8Array {
  const arr: number[] = []
  for (let i = 0; i < length; i++)
    arr.push(generateRandomInteger(0, 255))
  return new Uint8Array(arr)
}

function onGenerateRandomIntegerBtnClick() {
  if (maxInteger.value < minInteger.value) {
    alert(t('intro.min_not_gt_max'))
    return
  }
  randomInteger.value = generateRandomInteger(minInteger.value, maxInteger.value)
}

function onGenerateRandomFloatBtnClick() {
  if (maxFloat.value < minFloat.value) {
    alert(t('intro.min_not_gt_max'))
    return
  }
  randomFloat.value = generateRandomFloat(minFloat.value, maxFloat.value)
}

function onGenerateRandomUint8ArrayBtnClick() {
  if (length.value < 1) {
    alert(t('intro.len_not_lt_1'))
    return
  }
  randomUint8Array.value = generateRandomUint8Array(length.value)
}
</script>

<template>
  <TitledLayout
    :title="t('title.random')"
    w="md:7/10 lg:3/5"
  >
    <div space-y-10>
      <!-- random float -->
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_float') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="minFloat"
            type="number"
            :placeholder="t('intro.min')"
            autocomplete="false"
            w-40
            input-edit
          >
          <input
            v-model.number="maxFloat"
            type="number"
            :placeholder="t('intro.max')"
            autocomplete="false"
            w-40
            input-edit
          >
        </div>
        <button
          class="m-3 text-sm btn"
          @click="onGenerateRandomFloatBtnClick"
        >
          {{ t('button.generate') }}
        </button>
        <div font-mono break-all>
          {{ randomFloat }}
        </div>
      </div>
      <!-- random integer -->
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_integer') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="minInteger"
            type="number"
            :placeholder="t('intro.min')"
            autocomplete="false"
            w-40
            input-edit
          >
          <input
            v-model.number="maxInteger"
            type="number"
            :placeholder="t('intro.max')"
            autocomplete="false"
            w-40
            input-edit
          >
        </div>
        <button
          class="m-3 text-sm btn"
          @click="onGenerateRandomIntegerBtnClick"
        >
          {{ t('button.generate') }}
        </button>
        <div font-mono break-all>
          {{ randomInteger }}
        </div>
      </div>
      <!-- random binary sequence -->
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_binary_sequence') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="length"
            type="number"
            :placeholder="t('intro.length')"
            autocomplete="false"
            w-40
            input-edit
          >
          <select
            v-model="representation"
            w-40
            input-select
          >
            <option value="Hex">
              Hex
            </option>
            <option value="Base64">
              Base64
            </option>
            <option value="Base64URL">
              Base64URL
            </option>
            <option value="Uint8Array">
              Uint8Array
            </option>
          </select>
        </div>
        <button
          class="m-3 text-sm btn"
          @click="onGenerateRandomUint8ArrayBtnClick"
        >
          {{ t('button.generate') }}
        </button>
        <div font-mono break-all>
          {{ randomUint8ArrayStr }}
        </div>
      </div>
    </div>
  </TitledLayout>
</template>
