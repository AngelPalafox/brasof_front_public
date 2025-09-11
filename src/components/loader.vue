<template>
  <div class="loader-overlay" v-if="visible">
    <div class="loader"></div>
    <p class="text">Cargando...</p>
  </div>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(33, 33, 33, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #00e676;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.text {
  margin-top: 12px;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
