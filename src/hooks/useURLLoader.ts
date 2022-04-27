import { ref } from 'vue'
import axios from 'axios'

const useURLLoader = <T>(url: string) => {
    const result = ref<T | null>(null)
    const loading = ref(true)
    const loaded = ref(false)
    const error = ref(null)

    axios.get(url).then(response => {
        loading.value = false
        loaded.value = true
        result.value = response.data
    }).catch(e => {
        error.value = e
        loading.value = false
    })

    return {
        result, loading, error, loaded
    }
}

export default useURLLoader
