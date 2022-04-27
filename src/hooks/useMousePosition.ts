import { ref, onMounted, onUnmounted } from 'vue'

const useMousePosition = () => {
    const x = ref(0)
    const y = ref(0)
    const updatedMouse = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }

    onMounted(() => {
        document.addEventListener('mousemove', updatedMouse)
    })

    onUnmounted(() => {
        document.removeEventListener('mousemove', updatedMouse)
    })

    return { x, y }
}

export default useMousePosition