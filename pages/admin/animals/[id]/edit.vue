<template>
  <div class="admin-edit-animal-page">
    <h2 class="section__title">Edytuj zwierzę</h2>
    <div v-if="loading">
      <n-skeleton height="320px" />
    </div>
    <div v-else-if="!animal" class="no-found-message">
      <n-empty description="Nie znaleziono zwierzęcia" />
    </div>
    <AnimalForm v-else :initial-value="animal" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { NEmpty, NSkeleton } from 'naive-ui';
import AnimalForm from '~/components/forms/AnimalForm.vue';
import { useAnimalsStore } from '~/store/animals';
import type { Animal } from '~/types/animal';

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
  title: 'Edytuj zwierzę'
});

const store = useAnimalsStore();
const loading = ref(true);
const route = useRoute();

onMounted(async () => {
  await store.init();
  loading.value = false;
});

const animalId = computed(() => route.params.id);
const animal = computed(() => store.animals.find((item) => item.id === animalId.value) || null);

const handleSave = (payload: Animal) => {
  if (!animal.value) return;
  // TODO: add await and loading state when backend is ready
  store.updateAnimal(animal.value.id, payload);
  navigateTo('/admin/animals');
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.no-found-message {
  margin-top: $spacing-16;
}
</style>
