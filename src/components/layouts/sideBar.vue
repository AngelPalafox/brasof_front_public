<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { icons } from '@/utils/icons.js'

const route = useRoute()

// Lista de módulos con icono y ruta
const MODULES = [
    { label: 'Publicidad', icon: icons('report', 20, 20), path: '/publicidad' },
    { label: 'Locales', icon: icons('store', 20, 20), path: '/locales' },
    { label: 'Productos', icon: icons('shopping-basket', 20, 20), path: '/productos' },
    { label: 'Categorías', icon: icons('tag', 20, 20), path: '/categorias' },
    { label: 'Eventos', icon: icons('ticket', 20, 20), path: '/eventos' },
    { label: 'Subir Imágenes', icon: icons('upload', 20, 20), path: '/subir_imagenes' }, 
]

// Activo el módulo actual
const activeModules = computed(() => {
    return MODULES.map(module => ({
        ...module,
        active: route.path.startsWith(module.path)
    }));
})
</script>

<template>
    <aside class="sidebar" aria-label="Sidebar">
        <div class="image-SideBar">
            <router-link to="/">
                <img src="../../assets/logo.png" />
            </router-link>
        </div>
        <div>
            <div v-for="module in activeModules" :key="module.label"
                :class="{ active: module.active, 'sideBarButton': true }">
                <router-link :to="module.path">
                    <span v-html="module.icon"></span>
                    <span>{{ module.label }}</span>
                </router-link>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.active {
    background-color: #00e676 !important;
}

.sidebar {
    width: 200px;
    height: 100vh;
    background-color: #212121;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    padding-top: 20px;
    z-index: 100;
    border-right: #00e676 3px solid;
}

.image-SideBar {
    display: flex;
    align-items: center;
    justify-content: center;
}

.sideBarButton {
    margin-top: 10px;
    background: #d9d9d9;
    border-radius: 20px;
    width: 75%;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    transition: background-color 0.2s ease;
}

.sideBarButton:hover {
    background-color: #00e676;
}

a {
    text-decoration: none;
    color: #212121;
    display: flex;
    align-items: center;
    gap: 10px;
}

img {
    width: 100px;
}
</style>
