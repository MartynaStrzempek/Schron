import { defineStore } from 'pinia'
import type { Animal } from '~/types/animal'
import { getAnimals } from '~/repositories/animalRepository'

const STORAGE_KEY = 'schron_admin_animals'

export const useAdminAnimalsStore = defineStore('adminAnimals', {
  state: () => ({
    animals: getAnimals() as Animal[],
    hydrated: false
  }),
  getters: {
    urgentAnimals: (state) => state.animals.filter((animal) => animal.urgent)
  },
  actions: {
    initialize() {
      if (!process.client) return
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          this.animals = JSON.parse(stored) as Animal[]
        } catch {
          this.animals = getAnimals()
        }
      }
      this.hydrated = true
    },
    persist() {
      if (!process.client) return
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.animals))
    },
    addAnimal(animal: Animal) {
      this.animals = [animal, ...this.animals]
      this.persist()
    },
    updateAnimal(updated: Animal) {
      this.animals = this.animals.map((animal) =>
        animal.id === updated.id ? updated : animal
      )
      this.persist()
    },
    removeAnimal(id: string) {
      this.animals = this.animals.filter((animal) => animal.id !== id)
      this.persist()
    },
    toggleUrgent(id: string) {
      this.animals = this.animals.map((animal) =>
        animal.id === id ? { ...animal, urgent: !animal.urgent } : animal
      )
      this.persist()
    }
  }
})
