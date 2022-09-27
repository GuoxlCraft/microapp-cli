import { ref, watch } from 'vue'
import { isString } from '_u/validate'
import { appStore } from '@/store/modules/app'

export function useTitle(newTitle?: string) {
  const title = ref(newTitle ? `${appStore.title} - ${newTitle}` : appStore.title)

  watch(
    title,
    (t, o) => {
      if (isString(t) && t !== o && document) {
        document.title = t
      }
    },
    { immediate: true }
  )

  return title
}
