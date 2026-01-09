import { defineStore } from 'pinia';
import type { Animal } from '~/types/animal';
import { getAnimals } from '~/repositories/animals';

const STORAGE_KEY = 'schron_animals';

export const useAnimalsStore = defineStore('animals', {
  state: () => ({
    animals: [] as Animal[],
    initialized: false
  }),
  getters: {
    urgentAnimals(state) {
      return state.animals.filter((animal) => animal.urgent);
    },
    featuredAnimals(state) {
      return state.animals.filter((animal) => animal.featured);
    }
  },
  actions: {
    async init() {
      if (this.initialized) return;

      const fallback = await getAnimals();

      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY);
        this.animals = stored ? (JSON.parse(stored) as Animal[]) : fallback;
      } else {
        this.animals = fallback;
      }

      this.initialized = true;
    },
    persist() {
      if (!process.client) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.animals));
    },
    addAnimal(payload: Animal) {
      this.animals = [...this.animals, payload];
      this.persist();
    },
    updateAnimal(id: string, payload: Animal) {
      this.animals = this.animals.map((animal) => (animal.id === id ? payload : animal));
      this.persist();
    },
    removeAnimal(id: string) {
      this.animals = this.animals.filter((animal) => animal.id !== id);
      this.persist();
    },
    toggleUrgent(id: string) {
      this.animals = this.animals.map((animal) =>
        animal.id === id ? { ...animal, urgent: !animal.urgent } : animal
      );
      this.persist();
    }
  }
});
