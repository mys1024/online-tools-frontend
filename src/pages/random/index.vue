<script setup lang="ts">
import { hex } from '~/utils/plain'

const { t } = useI18n()

const minFloat = ref(0)
const maxFloat = ref(1)
const randomFloat = ref(generateRandomFloat(0, 1))

const minInteger = ref(0)
const maxInteger = ref(10)
const randomInteger = ref(generateRandomInteger(0, 10))

const length = ref(8)
const randomUint8Array = ref(generateRandomUint8Array(8))
const format = ref<'array' | 'hex'>('array')
const randomUint8ArrayStr = computed(() => {
  switch (format.value) {
    case 'array':
      return `[${randomUint8Array.value}]`
    case 'hex':
      return hex(randomUint8Array.value)
  }
})

function generateRandomInteger(min: number, max: number): number {
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
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_float') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="minFloat"
            type="number"
            :placeholder="t('intro.min')"
            :aria-label="t('intro.min')"
            autocomplete="false"
            p="x-2 y-1"
            w="150px"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <input
            v-model.number="maxFloat"
            type="number"
            :placeholder="t('intro.max')"
            :aria-label="t('intro.max')"
            autocomplete="false"
            p="x-2 y-1"
            w="150px"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <button
            class="m-3 text-sm btn"
            @click="onGenerateRandomFloatBtnClick"
          >
            {{ t('button.generate') }}
          </button>
        </div>
        <div font-mono break-all>
          {{ randomFloat }}
        </div>
      </div>
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_integer') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="minInteger"
            type="number"
            :placeholder="t('intro.min')"
            :aria-label="t('intro.min')"
            autocomplete="false"
            p="x-2 y-1"
            w="150px"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <input
            v-model.number="maxInteger"
            type="number"
            :placeholder="t('intro.max')"
            :aria-label="t('intro.max')"
            autocomplete="false"
            p="x-2 y-1"
            w="150px"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <button
            class="m-3 text-sm btn"
            @click="onGenerateRandomIntegerBtnClick"
          >
            {{ t('button.generate') }}
          </button>
        </div>
        <div font-mono break-all>
          {{ randomInteger }}
        </div>
      </div>
      <div space-y-2>
        <h2 text-xl>
          {{ t('intro.random_uint8array') }}
        </h2>
        <div space-x-2>
          <input
            v-model.number="length"
            type="number"
            :placeholder="t('intro.length')"
            :aria-label="t('intro.length')"
            autocomplete="false"
            w="150px"
            p="x-2 y-1"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
          <select
            v-model="format"
            p="x-2 y-1"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            outline="none active:none"
          >
            <option value="array">
              Array
            </option>
            <option value="hex">
              Hex
            </option>
          </select>
          <button
            class="m-3 text-sm btn"
            @click="onGenerateRandomUint8ArrayBtnClick"
          >
            {{ t('button.generate') }}
          </button>
        </div>
        <div font-mono break-all>
          {{ randomUint8ArrayStr }}
        </div>
      </div>
    </div>
  </TitledLayout>
</template>
