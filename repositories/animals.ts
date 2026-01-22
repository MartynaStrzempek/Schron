import type { Animal } from '~/types/animal';

export const getAnimals = async (): Promise<Animal[]> => {
  const data = await import('~/data/mock_data.json');
  return data.default.animals as Animal[];
};

export const getAnimalById = async (id: string): Promise<Animal | undefined> => {
  // TODO: change for request to get animal by id from backend
  const animals = await getAnimals();
  return animals.find((animal) => animal.id === id);
};
