<script setup>
import Tables from '@/components/tables.vue'
import Categorias_service from '@/services/categorias'
import loader from '@/components/loader.vue'
import { icons } from '@/utils/icons'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'
const datos = ref([])
const headers = [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
    { label: 'Acciones', key: 'acciones' }
]
const showLoader = ref(true)
onMounted(async () => {
    const categorias = await Categorias_service.get()
    showLoader.value = false
    const data = categorias.message.data
    if (categorias.tipo === 'error') {
        router.push('/')
    }
    const new_data = data.map(categoria => {
        return {
            acciones: [{
                accion: 'eliminar',
                icon: icons('eliminar', 20, 20, '#00e676'),
            },
            {
                accion: 'editar',
                icon: icons('editar', 20, 20, '#00e676')
            }],
            id: btoa(categoria.id_categoria),
            ...categoria
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
    const categoria = await Categorias_service.delete(atob(id))
    showLoader.value = false
    const message = categoria.message.message ? categoria.message.message : categoria.message
    Swal.fire({
        title: '',
        text: message,
        icon: categoria.tipo
    })
    if (categoria.tipo === 'success') {
        datos.value = datos.value.filter(categoria => categoria.id !== id)
    }
}
const editar = (id) => {
    showLoader.value = true
    router.push(`/categorias/editar_categoria/${id}`).finally(() => {
        showLoader.value = false
    })
}
</script>
<template>
    <loader :visible="showLoader" />
    <Tables :datos="datos" :headers="headers" :tipo="'Categorías'" :ruta="'/categorias/nueva_categoria'"
        :acciones="{ eliminar, editar }" />
</template>
