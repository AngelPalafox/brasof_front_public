<script setup>
import Tables from '@/components/tables.vue'
import Locales_services from '@/services/locales'
import loader from '@/components/loader.vue'
import { icons } from '@/utils/icons'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'
const datos = ref([])
const headers = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Giro Empresarial', key: 'giro_empresarial' },
    { label: 'Correo Contacto', key: 'correo_contacto' },
    { label: 'Acciones', key: 'acciones' }
]
const showLoader = ref(true)
onMounted(async () => {
    const locales = await Locales_services.get()
    showLoader.value = false
    const data = locales.message.data
    if (locales.tipo === 'error') {
        router.push('/')
    }
    const new_data = data.map(local => {
        return {
            acciones: [{
                accion: 'eliminar',
                icon: icons('eliminar', 20, 20, '#00e676'),
            },
            {
                accion: 'editar',
                icon: icons('editar', 20, 20, '#00e676')
            }],
            id: btoa(local.id_local),
            ...local
        }
    })
    datos.value = new_data
})
const eliminar = async (id) => {
    const CONFIRMAR = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        allowEscapeKey: false,
        allowOutsideClick: false,
    })
    if (!CONFIRMAR.isConfirmed) {
        return Swal.fire({
            title: 'Acción cancelada',
            icon: 'info',
            confirmButtonText: 'Aceptar',
        })
    }
    showLoader.value = true
    const local = await Locales_services.delete(atob(id))
    showLoader.value = false
    const message = local.message.message ? local.message.message : local.message
    Swal.fire({
        title: '',
        text: message,
        icon: local.tipo
    })
    if (local.tipo === 'success') {
        datos.value = datos.value.filter(local => local.id !== id)
    }
}
const editar = (id) => {
    showLoader.value = true
    router.push(`/locales/editar_local/${id}`).finally(() => {
        showLoader.value = false
    })
}
</script>
<template>
    <loader :visible="showLoader" />
    <Tables :datos="datos" :headers="headers" :tipo="'Local'" :ruta="'/locales/nuevo_local'"
        :acciones="{ eliminar, editar }" />
</template>
