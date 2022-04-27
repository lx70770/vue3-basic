<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- 异步请求 -->
    <Suspense>
        <template #default>
            <div>
                <AsyncShow />
                <DogShow />
            </div>
        </template>
        <template #fallback>
            <h3>async loading</h3>
        </template>
    </Suspense>
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <ul>
        <li v-for="number in numbers" :key="number">{{ number }}</li>
    </ul>
    <div>{{ person.name }}</div>
    <div>{{ greetings }}</div>
    <div>x: {{ x }}</div>
    <div>y: {{ y }}</div>
    <div>{{ greetings }}</div>
    <img v-if="loaded" :src="result.message" alt="dog" />
    <h2 v-if="loading">loading!...</h2>

    <button @click="increase">+increase</button>
    <button @click="updateGreetings">+updateGreetings</button>
    <button @click="openModal">openModal</button>
    <HelloWorld />
    <CommonModal :isOpen="modalIsOpen" @close-modal="onModalClose">My Modal</CommonModal>
</template>

<script lang="ts">
import { toRefs, computed, reactive, watch, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import CommonModal from './components/CommonModal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'

import useMousePosition from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'

interface DataProps {
    count: number
    double: number
    increase: () => void
    numbers: number[]
    person: { name?: string }
}

interface DogResult {
    result: string
    message: string
}

export default {
    name: 'App',
    components: { HelloWorld, CommonModal, AsyncShow, DogShow },
    setup() {
        // const count = ref(0)
        // const double = computed(() => count.value * 2)
        // const increase = () => count.value++

        const data: DataProps = reactive({
            count: 0,
            increase: () => data.count++,
            double: computed(() => data.count * 2),
            numbers: [0, 1, 2],
            person: {}
        })
        // 以下表示Vue3支持监听数组和对象的变化
        data.numbers[0] = 5
        data.person.name = 'aaa'

        // hooks使用
        const { x, y } = useMousePosition()
        const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')

        // watch使用
        const greetings = ref('')
        const updateGreetings = () => (greetings.value += 'Hello!')

        const modalIsOpen = ref(false)
        const openModal = () => {
            modalIsOpen.value = true
        }

        const onModalClose = () => {
            modalIsOpen.value = false
        }

        watch([greetings, () => data.count], (newValue, oldValue) => {
            console.log('new', newValue)
            console.log('old', oldValue)

            document.title = 'updated' + greetings.value
        })
        watch(result, () => {
            console.log(result.value?.message)
        })

        // 将普通对象变为可监听对象
        const refData = toRefs(data)

        return {
            ...refData,
            greetings,
            updateGreetings,
            x,
            y,
            result,
            loading,
            loaded,
            modalIsOpen,
            openModal,
            onModalClose
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
