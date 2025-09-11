<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const seconds = ref(5)

onMounted(() => {
      const interval = setInterval(() => {
        seconds.value--
        if (seconds.value === 0) {
          clearInterval(interval)
          router.push('/')
        }
      }, 1000)
})
</script>

<template>
    <div class="form">
        <div class="logo"><img src="../assets/logo.png" alt="logo"></div>
        <div class="">
            <div class="text-center">
                <h1>Pagina no encontrada</h1>
                <h2 class="">Redirigiendo...</h2>
                <p class="">Serás redirigido en {{ seconds }} segundos.</p>
            </div>
        </div>
    </div>
</template>
<style>
img{
    width: 200px;
}
body
{
    /* display: flex;
    align-items: center;
    justify-content: /center; */
    background-color: #212121;
}
.footer p {
    color: #f5f5f5;
}

</style>