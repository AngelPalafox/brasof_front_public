<script setup>
import router from '@/router'
import { defineEmits } from 'vue'
const emit = defineEmits(['toggle-sidebar'])
function closeSesion() {
    localStorage.removeItem('token')
    emit('toggle-sidebar')
    router.push('/login')
}
</script>

<template>
    <header class="navbar">
        <div class="navbar-content">
            <a class="hamburger" @click="emit('toggle-sidebar')">
                ☰
            </a>

            <div class="nav-actions">
                <button @click="closeSesion" class="button">Cerrar sesión</button>
            </div>
        </div>
    </header>
</template>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 65px;
    background-color: #212121;
    border-bottom: 3px solid #00e676;
    display: flex;
    align-items: center;
    z-index: 100;
}

.navbar-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: #212121;
}

.hamburger {
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    margin-left: 200px;
    color: #00e676;
    text-decoration: none;

}

.nav-actions {
    width: 250px;
    text-align: right;
}

button {
    background-color: #d9d9d9;
    color: #212121;
    width: 50%;
}
</style>
