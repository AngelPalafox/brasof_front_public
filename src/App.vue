<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/layouts/navBar.vue'
import SideBar from '@/components/layouts/sideBar.vue'
import Footer from '@/components/layouts/footer.vue'
import Breadcumbs from './components/layouts/breadcumbs.vue'
const route = useRoute()
const getToken = ref(false)
const isSidebarVisible = ref(true)

onMounted(() => {
  getToken.value = !!localStorage.getItem('token')
})

const showLayout = computed(() => {
  return route.meta.requiresAuth && getToken.value
})
</script>

<template>
  <NavBar @toggle-sidebar="isSidebarVisible = !isSidebarVisible" v-if="showLayout" />
  <SideBar v-if="isSidebarVisible && showLayout" />
  <main :class="[
    'main-content',
    isSidebarVisible && showLayout ? 'with-sidebar' : 'full-width'
  ]">
  <Breadcumbs v-if="showLayout" />
    <router-view />
    <Footer />
  </main>
</template>

<style>
.main-content {
  margin-top: 60px;
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.with-sidebar {
  margin-left: 200px;
}

.full-width {
  margin-left: 0;
}
</style>
