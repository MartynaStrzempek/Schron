<template>
  <n-card>
    <h1>{{ title }}</h1>
    <p class="animal-form__hint">Pola oznaczone * są wymagane.</p>
    <n-alert v-if="errorSummary.length" type="error" title="Popraw błędy" class="animal-form__error">
      <ul>
        <li v-for="message in errorSummary" :key="message">{{ message }}</li>
      </ul>
    </n-alert>
    <n-form ref="formRef" :model="form" :rules="rules" label-placement="top">
      <div class="animal-form__grid">
        <n-form-item label="Imię *" path="name">
          <n-input v-model:value="form.name" placeholder="Np. Luna" />
        </n-form-item>
        <n-form-item label="Typ *" path="type">
          <n-select v-model:value="form.type" :options="typeOptions" />
        </n-form-item>
        <n-form-item label="Wiek *" path="age">
          <n-input v-model:value="form.age" placeholder="Np. 2 lata" />
        </n-form-item>
        <n-form-item label="Płeć *" path="gender">
          <n-select v-model:value="form.gender" :options="genderOptions" />
        </n-form-item>
        <n-form-item label="Wielkość *" path="size">
          <n-select v-model:value="form.size" :options="sizeOptions" />
        </n-form-item>
        <n-form-item label="Data przyjęcia *" path="intakeDate">
          <n-input v-model:value="form.intakeDate" placeholder="YYYY-MM-DD" />
        </n-form-item>
        <n-form-item label="Status adopcyjny *" path="status">
          <n-select v-model:value="form.status" :options="statusOptions" />
        </n-form-item>
      </div>
      <n-form-item label="Opis *" path="description">
        <n-textarea v-model:value="form.description" placeholder="Krótki opis" />
      </n-form-item>
      <n-form-item label="Zdjęcia (URL, oddzielone przecinkami)" path="images">
        <n-textarea v-model:value="imagesText" placeholder="/images/animals/dog-1.svg, /images/animals/dog-2.svg" />
      </n-form-item>
      <div class="animal-form__actions">
        <n-button type="primary" :loading="submitting" :disabled="submitting" @click="handleSubmit">
          {{ submitLabel }}
        </n-button>
        <n-button tertiary @click="$emit('cancel')">Anuluj</n-button>
      </div>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import type { Animal } from '~/types/animal'

const props = defineProps<{
  modelValue: Animal
  title: string
  submitLabel: string
}>()

const emit = defineEmits<{
  (e: 'submit', value: Animal): void
  (e: 'cancel'): void
}>()

const formRef = ref<FormInst | null>(null)
const form = reactive({ ...props.modelValue })
const submitting = ref(false)
const errorSummary = ref<string[]>([])

const typeOptions = [
  { label: 'Pies', value: 'pies' },
  { label: 'Kot', value: 'kot' }
]
const genderOptions = [
  { label: 'Samiec', value: 'samiec' },
  { label: 'Samica', value: 'samica' }
]
const sizeOptions = [
  { label: 'Mały', value: 'mały' },
  { label: 'Średni', value: 'średni' },
  { label: 'Duży', value: 'duży' }
]
const statusOptions = [
  { label: 'Do adopcji', value: 'do adopcji' },
  { label: 'W trakcie', value: 'w trakcie' },
  { label: 'Po adopcji', value: 'po adopcji' }
]

const rules: FormRules = {
  name: [{ required: true, message: 'Podaj imię', trigger: ['blur', 'input'] }],
  type: [{ required: true, message: 'Wybierz typ', trigger: ['change', 'blur'] }],
  age: [{ required: true, message: 'Podaj wiek', trigger: ['blur', 'input'] }],
  gender: [{ required: true, message: 'Wybierz płeć', trigger: ['change', 'blur'] }],
  size: [{ required: true, message: 'Wybierz wielkość', trigger: ['change', 'blur'] }],
  intakeDate: [{ required: true, message: 'Podaj datę przyjęcia', trigger: ['blur', 'input'] }],
  status: [{ required: true, message: 'Wybierz status', trigger: ['change', 'blur'] }],
  description: [{ required: true, message: 'Dodaj opis', trigger: ['blur', 'input'] }]
}

const imagesText = ref(form.images.join(', '))

const handleSubmit = async () => {
  errorSummary.value = []
  if (!formRef.value) return

  const isValid = await formRef.value.validate((errors) => {
    if (errors) {
      errorSummary.value = errors.flatMap((group) => group.map((e) => e.message))
    }
  })

  if (!isValid) return

  submitting.value = true
  const images = imagesText.value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  emit('submit', {
    ...form,
    images: images.length ? images : ['/images/animals/dog-1.svg']
  })

  submitting.value = false
}
</script>
