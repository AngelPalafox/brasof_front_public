<script setup>
import MenuButton from '@/components/layouts/menuButtons.vue'
import { icons } from '@/utils/icons';
import { onMounted, ref } from 'vue';
const Menu = ref([
  {
    url: '/publicidad',
    label: 'Publicidad',
    icon: icons('report', 20, 20, '#212121')
  },
  {
    url: '/locales',
    label: 'Locales',
    icon: icons('store', 20, 20, '#212121')
  },
  {
    url: '/eventos',
    label: 'Eventos',
    icon: icons('ticket', 20, 20, '#212121')
  },
  {
    url: '/categorias',
    label: 'Categorías',
    icon: icons('tag', 20, 20, '#212121')
  }
])
</script>
<template>
  <div class="row">
    <div class="col-lg-6 col-12 menu-grid" v-for="item in Menu" :key="item.url"> 
      <MenuButton :key="item.url" :url="item.url" :label="item.label" :icon="item.icon" />
    </div>
  </div>
</template>

<style scoped>
.menu-grid {
  margin-bottom: 100px;
  justify-items: center;
}
</style>
