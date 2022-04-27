<template>
    <img :src="result && result.message" alt="dog" />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    name: 'DogShow',
    async setup() {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random')
        return { result: response.data }
    }
})
</script>

<style scoped>
</style>