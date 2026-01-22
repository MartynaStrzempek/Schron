<template>
  <n-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-placement="top"
    class="animal-form"
    @submit.prevent="handleSubmit"
  >
    <div v-if="hasSubmitErrors" class="form__summary" role="alert">
      Uzupełnij wszystkie wymagane pola.
    </div>
    <div class="animal-form__grid">
      <n-form-item label="Imię" path="name" required>
        <n-input v-model:value="form.name" placeholder="np. Luna" />
      </n-form-item>
      <n-form-item label="Typ" path="type" required>
        <n-select v-model:value="form.type" :options="typeOptions" />
      </n-form-item>
      <n-form-item label="Wiek" path="age" required>
        <n-select v-model:value="form.age" :options="ageOptions" />
      </n-form-item>
      <n-form-item label="Płeć" path="gender" required>
        <n-select v-model:value="form.gender" :options="genderOptions" />
      </n-form-item>
      <n-form-item label="Wielkość" path="size" required>
        <n-select v-model:value="form.size" :options="sizeOptions" />
      </n-form-item>
      <n-form-item label="Status adopcyjny" path="status" required>
        <n-select v-model:value="form.status" :options="statusOptions" />
      </n-form-item>
      <n-form-item label="Data przyjęcia" path="intakeDate" required>
        <n-input v-model:value="form.intakeDate" type="date" />
      </n-form-item>
    </div>
    <n-form-item label="Opis" path="description" required>
      <n-input v-model:value="form.description" type="textarea" placeholder="Krótki opis zwierzęcia" />
    </n-form-item>
    <n-form-item label="Linki do zdjęć" path="photos" required>
      <n-dynamic-input v-model:value="form.photos" placeholder="https://" />
    </n-form-item>
    <n-checkbox v-model:checked="form.urgent">Pilne</n-checkbox>
    <n-checkbox v-model:checked="form.featured">Wyróżnione</n-checkbox>
    <div class="animal-form__actions">
      <n-button type="primary" attr-type="submit" :loading="saving" :disabled="saving">
        Zapisz
      </n-button>
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import {
  NButton,
  NCheckbox,
  NDynamicInput,
  NForm,
  NFormItem,
  NInput,
  NSelect
} from 'naive-ui';
import type { Animal } from '~/types/animal';

const props = defineProps<{ initialValue: Animal }>();
const emit = defineEmits<{ (event: 'save', value: Animal): void }>();

const formRef = useTemplateRef("formRef");
const saving = ref(false);
const hasSubmitErrors = ref(false);

const form = ref<Animal>({ ...props.initialValue });
// TODO: use constants from one file (single source of truth) for options and in pages/animals/index.vue
const typeOptions = [
  { label: 'Pies', value: 'pies' },
  { label: 'Kot', value: 'kot' }
];
const ageOptions = [
  { label: 'Młody', value: 'młody' },
  { label: 'Dorosły', value: 'dorosły' },
  { label: 'Senior', value: 'senior' }
];
const genderOptions = [
  { label: 'Samiec', value: 'samiec' },
  { label: 'Samica', value: 'samica' }
];
const sizeOptions = [
  { label: 'Mały', value: 'mały' },
  { label: 'Średni', value: 'średni' },
  { label: 'Duży', value: 'duży' }
];

const statusOptions = [
  { label: 'Do adopcji', value: 'do adopcji' },
  { label: 'W trakcie', value: 'w trakcie' },
  { label: 'Adoptowany', value: 'adoptowany' }
];

const rules = {
  name: { required: true, message: 'Imię jest wymagane', trigger: ['blur', 'input'] },
  type: { required: true, message: 'Typ jest wymagany', trigger: ['blur', 'change'] },
  age: { required: true, message: 'Wiek jest wymagany', trigger: ['blur', 'change'] },
  gender: { required: true, message: 'Płeć jest wymagana', trigger: ['blur', 'change'] },
  size: { required: true, message: 'Wielkość jest wymagana', trigger: ['blur', 'change'] },
  status: { required: true, message: 'Status jest wymagany', trigger: ['blur', 'change'] },
  intakeDate: { required: true, message: 'Data przyjęcia jest wymagana', trigger: ['blur', 'input'] },
  description: { required: true, message: 'Opis jest wymagany', trigger: ['blur', 'input'] },
  photos: { required: true, message: 'Dodaj przynajmniej jedno zdjęcie', trigger: ['blur', 'change'] }
};

const handleSubmit = async () => {
  hasSubmitErrors.value = false;
  const valid = await formRef.value?.validate().then(() => true).catch(() => false);
  if (!valid) {
    hasSubmitErrors.value = true;
    return;
  }
  saving.value = true;

  //TODO: Replace setTimeout with actual save logic (API call etc.)
  setTimeout(() => {
    saving.value = false;
    emit('save', { ...form.value, photos: form.value.photos.filter(Boolean) });
  }, 600);
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.animal-form {
  background: $color-white;
  padding: $spacing-24;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;

  &__grid {
    display: grid;
    gap: $spacing-16;

    @media (min-width: $breakpoint-tablet) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  &__actions {
    margin-top: $spacing-16;
  }
}
</style>
