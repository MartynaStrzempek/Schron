import type { Ref } from 'vue'

export const useDelayedLoading = (pending: Ref<boolean>, delay = 800) => {
  const showDelayed = ref(false)

  const startTimer = () => {
    showDelayed.value = false
    if (!pending.value) return
    setTimeout(() => {
      if (pending.value) {
        showDelayed.value = true
      }
    }, delay)
  }

  watch(pending, () => startTimer(), { immediate: true })

  return { showDelayed }
}
