<template>
  <div class="admin-new-animal-page">
    <h2 class="section__title">Dodaj zwierzę</h2>
    <div v-if="loading">
      <n-skeleton height="320px" />
    </div>
    <AnimalForm v-else :initial-value="formValue" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NSkeleton } from 'naive-ui';
import AnimalForm from '~/components/forms/AnimalForm.vue';
import type { Animal } from '~/types/animal';
import { useAnimalsStore } from '~/store/animals';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
  title: 'Dodaj zwierzę'
});

const store = useAnimalsStore();
const formValue = ref<Animal>({
  id: crypto.randomUUID(),
  name: '',
  type: 'pies',
  age: 'młody',
  gender: 'samiec',
  size: 'mała',
  description: '',
  intakeDate: '',
  status: 'do adopcji',
  urgent: false,
  featured: false,
  photos: []
});

onMounted(async () => {
});

const handleSave = (animal: Animal) => {
  // TODO: add await and loading state when backend is ready
  store.addAnimal(animal);
  navigateTo('/admin/animals');
};
</script>
