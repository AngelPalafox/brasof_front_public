<script setup>
import Tables from '@/components/tables.vue'
import Eventos_services from '@/services/eventos'
import loader from '@/components/loader.vue'
import { onMounted, ref } from 'vue'
import router from '@/router'
import { fecha_format } from '@/utils/fecha_format'
const datos = ref([])
const headers = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Fecha Inicio', key: 'fecha_inicio' },
    { label: 'Fecha Fin', key: 'fecha_fin' },
    { label: 'Ubicación', key: 'ubicacion' },
    { label: 'Empresa Organizadora', key: 'empresa_organiza' },
    { label: 'Status', key: 'status' },
]

const showLoader = ref(true)
onMounted(async () => {
    const eventos = await Eventos_services.get()
    showLoader.value = false
    if (eventos.tipo === 'error') {
        router.push('/')
    }

    datos.value = eventos.message.data.map(eventos => {
        return {
            ...eventos,
            fecha_inicio: fecha_format(eventos.fecha_inicio),
            fecha_fin: fecha_format(eventos.fecha_fin),
        }
    })
})
</script>
<template>
    <loader :visible="showLoader" />
    <Tables :datos="datos" :headers="headers" :tipo="'Producto'" :ruta="'/eventos/nuevo_producto'" :showAlta="false" />
</template>
