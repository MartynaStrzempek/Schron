import { defineStore } from 'pinia';
import type { Animal } from '~/types/animal';
import { getAnimals } from '~/repositories/animals';

const STORAGE_KEY = 'shelter_animals';

export const useAnimalsStore = defineStore('animals', {
  state: () => ({
    animals: [] as Animal[],
    isLoaded: false,
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
    // TODO: implement proper cache
    // HTTP caching (ETag/Last-Modified) - is it needed? animals should change if new added
    // use somthenig better than observer to not rerender data during user time
    setAnimals(animals: Animal[]) {
      this.animals = animals;
      this.isLoaded = true;
    },
    addAnimal(payload: Animal) {
      this.animals = [...this.animals, payload];
    },
    updateAnimal(id: string, payload: Animal) {
      this.animals = this.animals.map((animal) => (animal.id === id ? payload : animal));
    },
    removeAnimal(id: string) {
      this.animals = this.animals.filter((animal) => animal.id !== id);
    },
    toggleUrgent(id: string) {
      this.animals = this.animals.map((animal) =>
        animal.id === id ? { ...animal, urgent: !animal.urgent } : animal
      );
    }
  }
});
