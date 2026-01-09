<template>
  <div>
    <h2 class="section__title">Edytuj zwierzę</h2>
    <div v-if="loading">
      <n-skeleton height="320px" />
    </div>
    <div v-else-if="!animal" class="state">
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

const animal = computed(() => store.animals.find((item) => item.id === route.params.id) || null);

const handleSave = (payload: Animal) => {
  if (!animal.value) return;
  store.updateAnimal(animal.value.id, payload);
  navigateTo('/admin/animals');
};
</script>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.state {
  margin-top: $spacing-4;
}
</style>
