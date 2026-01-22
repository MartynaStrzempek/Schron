import { defineStore } from 'pinia';
import type { Animal } from '~/types/animal';
import { getAnimals } from '~/repositories/animals';

const STORAGE_KEY = 'shelter_animals';

export const useAnimalsStore = defineStore('animals', {
  state: () => ({
    animals: [] as Animal[],
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
    // TODO: use init only on layouts
    // TODO: implement proper cache
    // HTTP caching (ETag/Last-Modified) - is it needed? animals should change if new added
    // use somthenig better than observer to not rerender data during user time
    async init() {
      // Move that request to fetchAnimals action (create new one)
      const animalsList = await getAnimals();

      if (process.client) {
        const stored = localStorage.getItem(STORAGE_KEY);
        this.animals = stored ? (JSON.parse(stored) as Animal[]) : animalsList;
      } else {
        this.animals = animalsList;
      }
    },
    // TODO: is persist needed in this app?
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
