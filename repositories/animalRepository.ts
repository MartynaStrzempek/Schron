import mockData from '~/data/mock_data.json'
import type { Animal, MockData } from '~/types/animal'

const data = mockData as MockData

export const getAnimals = (): Animal[] => data.animals

export const getFeaturedAnimals = (): Animal[] =>
  data.animals.filter((animal) => data.featuredAnimalIds.includes(animal.id))

export const getAnimalById = (id: string): Animal | undefined =>
  data.animals.find((animal) => animal.id === id)

export const getShelterInfo = () => data.shelter

export const getDashboardStats = () => ({
  totalAnimals: data.animals.length,
  urgentCount: data.dashboard.urgentCount,
  latestAnimals: [...data.animals]
    .sort((a, b) => b.intakeDate.localeCompare(a.intakeDate))
    .slice(0, 3)
})
