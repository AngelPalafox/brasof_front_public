<script setup>
defineProps({
  url: String,
  label: String,
  icon: String
})
</script>
<template>
  <router-link class="menu-button" :to="url">
    <span class="icon" v-html="icon"></span>
    <span class="label" v-html="label"></span>
  </router-link>
</template>
<style scoped>
.menu-button {
  width: 160px;
  height: 110px;
  background-color: #00e676;
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
  gap: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  text-decoration: none;

}

.menu-button:hover {
  background-color: #00e677a5;
}

.icon {
  font-size: 1.5rem;
}

.label {
  font-size: 0.95rem;
  color: #000;
  font-weight: 500;
}
</style>
