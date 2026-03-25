import { getAnimals } from "~/repositories/animals";
import {useAnimalsStore} from "~/store/animals";

export async function useAnimals() {
    const animalsStore = useAnimalsStore();
    return useAsyncData(
        'animals',
        async () => {
            if (animalsStore.animals.length === 0) {
                const result = await getAnimals();
                return result;
            }
            return animalsStore.animals;
        }
    );

}